const db = require('../database/Connection');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const validator = require('validator');
const sanitizeHtml = require('sanitize-html');
const fs = require('fs');
const mime = require('mime-types');
require('dotenv').config();
const { sanitizeAndValidate, sanitizeAndValidateArray } = require('../validator and sanitizer/ValidatorAndSanitizer');

const createToken = (id, username, userType) => {
    const secretKey = process.env.SECRET_KEY;

    const token = jwt.sign({ id, username, userType }, secretKey, { expiresIn: '1d' });
    return token;
};

// verify token
const protected = async (req, res) => {
    const { user } = req;

    res.status(200).json({ message: 'Success', user: user });
};

// register user
const registerUser = async (req, res) => {
    const { firstName, middleName, lastName, username, password, confirmPassword } = req.body;

    if (firstName, lastName, username, password, confirmPassword) {
        try {
            const findUsername = `SELECT * FROM users WHERE username = ?`;
            db.query(findUsername, [username], (error, results) => {
                if (error) {
                    res.status(401).json({ message: "Server side error!" });
                } else {
                    if (results.length > 0) {
                        res.status(401).json({ message: "Username already exist!" });
                    } else {
                        if (!firstName || !lastName || !password || !confirmPassword) {
                            res.status(401).json({ message: "All fields is required!" });
                        } else {
                            // if (!validator.isEmail(email)) {
                            //     res.status(401).json({message: "Invalid Email!"});
                            // }else{
                            // check pass and conpass
                            if (password === confirmPassword) {
                                if (password.length > 7) {
                                    // register user
                                    const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');
                                    const registerUser = `INSERT INTO users (first_name, middle_name, last_name, username, password, user_type) VALUES (?, ?, ?, ?, ?, ?)`;
                                    db.query(registerUser, [firstName, middleName, lastName, username, hashedPassword, "Customer"], (error, results) => {
                                        if (error) {
                                            res.status(401).json({ message: "Server side error!" });
                                        } else {
                                            // user register response
                                            // create token
                                            const userId = results.insertId;

                                            const token = createToken(userId, username, "Customer");
                                            res.status(200).json({ message: `${firstName} ${middleName} ${lastName} has been successfully registered!`, token: token, id: userId });
                                        }
                                    });
                                } else {
                                    res.status(401).json({ message: "Password must have at least 7 characters!" });
                                }
                            } else {
                                res.status(401).json({ message: "Password and Confirm password is not equal!" });
                            }
                            // }
                        }
                    }
                }
            });
        } catch (error) {
            console.log(error);
            res.status(401).json({ message: error });
        }
    } else {
        res.status(401).json({ message: "Invalid Input!" });
    }
};

// login users
const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        if (!username || !password) {
            res.status(401).json({ message: "Invalid Input!" });
        } else {
            // select username
            const getUsername = `SELECT * FROM users WHERE username = ?`;
            db.query(getUsername, [username], (error, results) => {
                if (error) {
                    res.status(401).json({ message: "Server side error!" });
                } else {
                    if (results.length > 0) {
                        // get password
                        const dbPassword = results[0].password;
                        // hash user input password
                        const hashedPassword = crypto.createHash('sha256').update(password).digest('hex');

                        // check if password is valid
                        if (dbPassword === hashedPassword) {
                            // success login
                            // create token
                            // get user id
                            const userId = results[0].id;
                            const userType = results[0].user_type;
                            const token = createToken(userId, username, userType);

                            // send to client
                            res.status(200).json({ message: "Login success!", token: token, id: userId });
                        } else {
                            res.status(401).json({ message: "Invalid Password!" });
                        }
                    } else {
                        res.status(401).json({ message: "Invalid Username!" });
                    }
                }
            });
        }
    } catch (error) {
        console.log(error);
        res.status(401).json({ message: error });
    }
};

// fetch user credentials
const fetchUserCredentials = async (req, res) => {
    const { id } = req.body;

    if (id) {
        const selectData = `SELECT * FROM users WHERE id = ?`;
        db.query(selectData, [id], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                res.status(200).json({ message: results });
            }
        });
    } else {
        res.status(401).json({ message: "Something went wrong!" });
    }
}

const profileUpload = async (req, res) => {
    const { userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 50 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId, validationRules);

    if (!sanitizeUserId) {
        return res.status(401).json({ message: "Invalid Input!" });
    }

    // Use imageUpload middleware to handle file upload
    // imageUpload.single('image')(req, res, (err) => {
    //     if (err) {
    //         return res.status(401).json({ message: "Error to upload file" });
    //     }

    const originalFileName = req.file.originalname;
    const uniqueFileName = `${Date.now()}_${originalFileName}`;
    const uniqueFilePath = `assets/image upload/${uniqueFileName}`;

    const typeMime = mime.lookup(originalFileName);

    if (typeMime === 'image/png' || typeMime === 'image/jpeg') {
        fs.rename(req.file.path, uniqueFilePath, (renameErr) => {
            if (renameErr) {
                return res.status(401).json({ message: "Error to upload file" });
            } else {
                const sanitizedFileName = sanitizeHtml(req.file.originalname); // Sanitize HTML content
                if (!validator.isLength(sanitizedFileName, { min: 1, max: 255 })) {
                    return res.status(401).json({ message: "Invalid File Name!" });
                } else {
                    const updateQuery = `UPDATE users SET given_image = ? WHERE id = ?`;
                    db.query(updateQuery, [uniqueFilePath, sanitizeUserId], (updateErr, results) => {
                        if (updateErr) {
                            return res.status(401).json({ message: "Server side errors!" });
                        } else {
                            return res.status(200).json({ message: "Profile image changed!" });
                        }
                    });
                }
            }
        });
    } else {
        return res.status(401).json({ message: "Invalid Image Type!" });
    }
    // });
}

// fetch all customerUsers
const fetchCustomerUsers = async (req, res) => {

};

// fetch all Sellers users
const fetchSellerUsers = async (req, res) => {

};

// change password
const changePassword = async (req, res) => {
    const { changePasswordData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 50 } },
    ];

    const sanitizeUsername = sanitizeAndValidate(changePasswordData.username, validationRules);
    const sanitizeUserId = sanitizeAndValidate(userId.toString(), validationRules);
    const sanitizePassword = sanitizeAndValidate(changePasswordData.password, validationRules);
    const sanitizeNewPassword = sanitizeAndValidate(changePasswordData.newPassword, validationRules);
    const sanitizeConfirmPassword = sanitizeAndValidate(changePasswordData.confirmPassword, validationRules);

    if (!sanitizeUserId || !sanitizePassword || !sanitizeNewPassword || !sanitizeConfirmPassword || !sanitizeUsername) {
        res.status(401).json({ message: "Invalid Input!" });
    }
    else {
        if (sanitizeUsername.length >= 5 && sanitizeUsername.length <= 20) {
            if (sanitizeNewPassword === sanitizeConfirmPassword) {
                if (sanitizeNewPassword.length >= 7 && sanitizeNewPassword.length <= 20) {
                    // select password
                    const select = `SELECT * FROM users WHERE id = ? AND isDelete = ?`;
                    db.query(select, [sanitizeUserId, 'not'], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            if (results.length > 0) {
                                // get db password
                                const dbPassword = results[0].password;
                                // const dbUsername = results[0].username;

                                // hash current password
                                const hashedPassword = crypto.createHash('sha256').update(sanitizePassword).digest('hex');
                                // hash new Password
                                const hashedNewPassword = crypto.createHash('sha256').update(sanitizeNewPassword).digest('hex');

                                // check the current password and new password
                                if (dbPassword === hashedPassword) {
                                    // update database
                                    const checkUsername = `SELECT * FROM users WHERE username = ? AND id != ?`;
                                    db.query(checkUsername, [sanitizeUsername, sanitizeUserId], (error, results) => {
                                        if (error) {
                                            res.status(401).json({ message: "Server side error!" });
                                        } else {
                                            if (results.length > 0) {
                                                res.status(401).json({ message: "Username already exist!" });
                                            } else {
                                                const update = `UPDATE users SET password = ? WHERE id = ?`;
                                                db.query(update, [hashedNewPassword, sanitizeUserId], (error, results) => {
                                                    if (error) {
                                                        res.status(401).json({ message: "Server side error!" });
                                                    } else {
                                                        res.status(200).json({ message: "User credentials updated successfully!" });
                                                    }
                                                });
                                            }
                                        }
                                    });
                                } else {
                                    res.status(401).json({ message: "Invalid Current Password!" });
                                }
                            } else {
                                res.status(401).json({ message: "Something went wrong!" });
                            }
                        }
                    });
                } else {
                    res.status(401).json({ message: "New password must have 7 to 20 characters!" });
                }
            } else {
                res.status(401).json({ message: "New password and confirm password not match!" });
            }
        } else {
            res.status(401).json({ message: "Username must have 5 to 20 characters!" });
        }
    }
};

// change profile info
const changeProfileInfo = async (req, res) => {
    // change profile info
    const { names, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 50 } },
    ];

    const sanitizeFirstName = sanitizeAndValidate(names.firstName, validationRules);
    const sanitizeLastName = sanitizeAndValidate(names.lastName, validationRules);
    const sanitizeUserId = sanitizeAndValidate(userId.toString(), validationRules);

    if (!sanitizeFirstName || !sanitizeLastName || !sanitizeUserId){
        res.status(401).json({message: "Invalid Input!"});
    }else{
        // update info
        const updateInfo = `UPDATE users SET first_name = ?, middle_name = ?, last_name = ? WHERE id = ?`;
        db.query(updateInfo, [sanitizeFirstName, names.middleName, sanitizeLastName, sanitizeUserId], (error, results) => {
            if (error){
                res.status(401).json({message: "Server side error!"});
            }else{
                res.status(200).json({message: "Profile has been successfully updated!"});
            }
        });
    }
};

// add to cart
const addCart = async (req, res) => {
    const { productId, quantity, userId } = req.body;

    if (productId && quantity && userId) {
        // select if product is already on cart
        const selectCart = `SELECT * FROM my_cart WHERE product_id = ? AND isDelete = ? AND user_id = ?`;
        db.query(selectCart, [productId, "not", userId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: "Product already on cart!" });
                } else {
                    // insert to cart
                    const inserttocart = `INSERT INTO my_cart (product_id, quantity, user_id) VALUES (?, ?, ?)`;
                    db.query(inserttocart, [productId, quantity, userId], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            res.status(200).json({ message: `Product added to cart!` });
                        }
                    });
                }
            }
        });
    } else {
        res.status(401).json({ message: "Something went wrong!" });
    }
}

// fetch cart
const fetchCart = async (req, res) => {
    const { userId } = req.body;
    //get the cart
    const getCart = `SELECT * FROM my_cart
    LEFT JOIN products ON my_cart.product_id = products.id
    WHERE my_cart.isDelete = ? AND my_cart.user_id = ?`;
    db.query(getCart, ["not", userId], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: results });
        }
    })
}

// add address
const addAddress = async (req, res) => {
    const { addressData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeStreet = sanitizeAndValidate(addressData.street, validationRules);
    const sanitizeUserId = sanitizeAndValidate(userId.toString(), validationRules);
    const sanitizeBarangay = sanitizeAndValidate(addressData.barangay, validationRules);
    const sanitizeMunicipality = sanitizeAndValidate(addressData.municipality, validationRules);
    const sanitizeProvince = sanitizeAndValidate(addressData.province, validationRules);
    const sanitizeZipcode = sanitizeAndValidate(addressData.zipCode, validationRules);
    const sanitizeCountry = sanitizeAndValidate(addressData.country, validationRules);
    const sanitizeLandMark = sanitizeAndValidate(addressData.landMark, validationRules);

    if (!sanitizeStreet || !sanitizeUserId || !sanitizeBarangay || !sanitizeMunicipality || !sanitizeProvince || !sanitizeZipcode || !sanitizeCountry || !sanitizeLandMark) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        const addAddress = `INSERT INTO user_address (street, barangay, municipality, province, zip_code, country, land_mark, user_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
        db.query(addAddress, [sanitizeStreet, sanitizeBarangay, sanitizeMunicipality, sanitizeProvince, sanitizeZipcode, sanitizeCountry, sanitizeLandMark, sanitizeUserId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                res.status(200).json({ message: "New Address has been successfully added!" });
            }
        });
    }
}

// fetch address
const fetchAddress = async (req, res) => {
    const { userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId.toString(), validationRules);

    const getAddress = `SELECT * FROM user_address WHERE user_id = ?`;
    db.query(getAddress, [sanitizeUserId], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: results });
        }
    });
}

// place order
const placeOrder = async (req, res) => {
    const { placeOrderData, userId, fullname } = req.body;

    if (placeOrder.address === "") {
        res.status(401).json({ message: "Please Select Address!" });
    } else {
        const validationRules = [
            { validator: validator.isLength, options: { min: 1, max: 255 } },
        ];

        const sanitizeAddress = sanitizeAndValidate(placeOrderData.address, validationRules);
        const sanitizePaymentType = sanitizeAndValidate(placeOrderData.paymentType, validationRules);
        const sanitizeFullname = sanitizeAndValidate(fullname, validationRules);
        const sanitizeUserId = sanitizeAndValidate(userId.toString(), validationRules);

        if (!sanitizeAddress || !sanitizePaymentType || !sanitizeUserId || !sanitizeFullname) {
            res.status(401).json({ message: "Invalid Input!" });
        } else {
            const productId = (placeOrderData.productIds).join(',');
            const quantity = (placeOrderData.quantity).join(',');
            const eachAmount = (placeOrderData.eachAmount).join(',');
            const productInfo = (placeOrderData.productInfo).join(',');

            // insert to database
            const insertProduct = `INSERT INTO orders (user_id, fullname, product_id, product_info, quantity, each_amount, address, payment_type, shipping, total_amount) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`;
            db.query(insertProduct, [sanitizeUserId, sanitizeFullname, productId, productInfo, quantity, eachAmount, sanitizeAddress, sanitizePaymentType, 130, placeOrderData.totalAmount], (error, results) => {
                if (error) {
                    res.status(401).json({ message: "Server side error!" });
                } else {
                    // insert notification
                    const insertNotification = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?, ?, ?)`;
                    db.query(insertNotification, [1, "Place Order", `${sanitizeFullname} had new order!`], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            const addRate = placeOrderData.productIds.map((item, index) => {
                                return new Promise((resolve, reject) => {
                                    const updateProductSoldAndStock = 'UPDATE products SET stock = ?, sold = ? WHERE id = ?';
                                    db.query(updateProductSoldAndStock, [parseInt(placeOrderData.allData[index].stock) - parseInt(placeOrderData.quantity[index]), parseInt(placeOrderData.quantity[index]), item], (error, results) => {
                                        if (error) {
                                            reject(error);
                                        } else {
                                            resolve(results);
                                        }
                                    })
                                });
                            });

                            Promise.all(addRate).then(() => {
                                res.status(200).json({ message: 'Ordered Success!' });
                            })
                                .catch(error => {
                                    res.status(401).json({ message: 'Server side error!' });
                                });
                        }
                    })
                }
            });
        }
    }

}

// delete cart
const deleteCart = async (req, res) => {
    const { item } = req.body;

    // delete cart
    const deleteCart = `UPDATE my_cart SET isDelete = ? WHERE product_id = ?`;
    db.query(deleteCart, ["Deleted", item.product_id], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: `${item.name} has been deleted to cart!` });
        }
    })
};

// fetch my order
const fetchMyOrder = async (req, res) => {
    const { userId } = req.body;

    if (userId) {
        const selectMyOrder = `SELECT * FROM orders WHERE user_id = ? AND isDelete = ?`;
        db.query(selectMyOrder, [userId, "not"], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                res.status(200).json({ message: results });
            }
        });
    } else {
        res.status(401).json({ message: "Something went wrong!" });
    }
}

// fetch notifications
const fetchUserNotification = async (req, res) => {
    const { userId } = req.body;

    // select
    const select = `SELECT * FROM notifications WHERE user_id = ? AND isDelete = ?`;
    db.query(select, [userId, "not"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: results.reverse() });
        }
    });
};

// add feedback
const addFeedback = async (req, res) => {
    const { userId, feedbackData } = req.body;

    if (userId) {
        const insertComments = `INSERT INTO feedback (user_id, product_id, ratings, comments) VALUES (?, ?, ?, ?)`;
        db.query(insertComments, [userId, feedbackData.productId, feedbackData.ratings, feedbackData.comments], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                // insert notification
                const insertNotificationToAdmin = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?, ?, ?)`;
                db.query(insertNotificationToAdmin, [1, "feedback", `${feedbackData.fullname} added feedback on ${feedbackData.productName}`], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        res.status(200).json({ message: "Feedback successfully added!" });
                    }
                })
            }
        })
    } else {
        res.status(401).json({ message: "Something went wrong!" });
    }
}

// update feedback
const updateFeedback = async (req, res) => {
    const { userId, feedbackData } = req.body;

    if (userId) {
        const updateComments = `UPDATE feedback SET ratings = ?, comments = ? WHERE id = ?`;
        db.query(updateComments, [feedbackData.ratings, feedbackData.comments, feedbackData.updateCommentId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                res.status(200).json({message: "Updated!"});
            }
        })
    } else {
        res.status(401).json({ message: "Something went wrong!" });
    }
}

// get comments
const getComments = async (req, res) => {
    const fetchComments = `SELECT users.first_name, users.middle_name, users.last_name, users.given_image, feedback.*, products.name FROM feedback 
    LEFT JOIN users ON feedback.user_id = users.id
    LEFT JOIN products ON feedback.product_id = products.id
    WHERE feedback.isDelete = ?`;
    db.query(fetchComments, ["not"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: results });
        }
    })
}

// insert ratings
const insertRatings = async (req, res) => {
    const { averageRatings } = req.body;

    if (averageRatings) {
        const insertTheRate = averageRatings.map(item => {
            return new Promise((resolve, reject) => {
                const updateQuery = "UPDATE products SET ratings = ? WHERE id = ?";
                db.query(updateQuery, [Math.round(item.averageRating), item.product_id], (error, results) => {
                    if (error) {
                        reject(error);
                    } else {
                        resolve(results);
                    }
                })
            });
        });

        Promise.all(insertTheRate).then(() => {
            res.status(200).json({ message: "Rate Updated!" });
        })
            .catch(error => {
                console.error('Error inserting while updating rate: ', error);
                res.status(401).json({ message: "An error occured while updateting rate" });
            });
    } else {
        console.log("test");
        res.status(401).json({ message: "Something went wrong!" });
    }
}

// get each comments
const eachComments = async (req, res) => {
    const {userId, productId} = req.body;

    if (userId && productId){
        const fetchComment = `SELECT * FROM feedback WHERE user_id = ? AND product_id = ?`;
        db.query(fetchComment, [userId, productId], (error, results) => {
            if (error){
                res.status(401).json({message: "Server side error!"});
            }else{
                res.status(200).json({message: results});
            }
        });
    }else{
        res.status(401).json({message: "Something went wrong!"});
    }
};

module.exports = { updateFeedback, eachComments, insertRatings, getComments, addFeedback, fetchUserNotification, fetchMyOrder, deleteCart, registerUser, loginUser, fetchCustomerUsers, fetchSellerUsers, protected, changePassword, changeProfileInfo, fetchUserCredentials, profileUpload, addCart, fetchCart, addAddress, fetchAddress, placeOrder };