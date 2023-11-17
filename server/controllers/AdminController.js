const db = require('../database/Connection');
const validator = require('validator');
const fs = require('fs');
const sanitizeHtml = require('sanitize-html');
const mime = require('mime-types');
require('dotenv').config();
const { sanitizeAndValidate, sanitizeAndValidateArray } = require('../validator and sanitizer/ValidatorAndSanitizer');

// add category
const addCategory = async (req, res) => {
    const { categoryName, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId.toString(), validationRules);
    const sanitizeCategoryName = sanitizeAndValidate(categoryName.toString(), validationRules);

    if (!sanitizeUserId || !sanitizeCategoryName) {
        return res.status(401).json({ message: "Invalid Input!" });
    }
    else {
        const checkCategory = `SELECT * FROM categories WHERE category_name = ?`;
        db.query(checkCategory, [sanitizeCategoryName], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: `${sanitizeCategoryName} has already exist!` });
                } else {
                    const addCategory = `INSERT INTO categories (category_name) VALUES (?)`;
                    db.query(addCategory, [sanitizeCategoryName], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            res.status(200).json({ message: `${sanitizeCategoryName} has been successfully added!` });
                        }
                    });
                }
            }
        });
    }
};

// fetch categories
const fetchCategory = async (req, res) => {
    const getCategories = `SELECT * FROM categories WHERE isDelete = ?`;
    db.query(getCategories, ["not"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            if (results.length > 0) {
                res.status(200).json({ message: results });
            } else {
                res.status(401).json({ message: "No Category Found!" });
            }
        }
    })
}

// delete category
const deleteCategory = async (req, res) => {
    const { categoryId, categoryName, userId } = req.body;

    if (categoryId && categoryName, userId) {
        // delete category
        const deleteCategory = `UPDATE categories SET isDelete = ? WHERE id = ?`;
        db.query(deleteCategory, ["Deleted", categoryId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                // insert notification
                const insertNot = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?, ?, ?)`;
                db.query(insertNot, [userId, "Category", `You've deleted the ${categoryName} on category list`], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        res.status(200).json({ message: `${categoryName} has been successfully deleted!` });
                    }
                });
            }
        });
    } else {
        res.status(401).json({ message: "Something went wrong!" });
    }
}

// edit category
const editCategory = async (req, res) => {
    const { categoryId, categoryName, userId } = req.body;

    if (categoryId && categoryName && userId) {
        const select = `SELECT * FROM categories WHERE category_name = ? AND id != ? AND isDelete = ?`;
        db.query(select, [categoryName, categoryId, "not"], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: `${categoryName} already exist!` });
                } else {
                    // edit
                    const editCategory = `UPDATE categories SET category_name = ? WHERE id = ?`;
                    db.query(editCategory, [categoryName, categoryId], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            // insert notification
                            const insertNot = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?, ? ,?)`;
                            db.query(insertNot, [userId, "Category", `You've successfully updated ${categoryName}`], (error, results) => {
                                if (error) {
                                    res.status(401).json({ message: "Server side error!" });
                                } else {
                                    res.status(200).json({ message: `${categoryName} has been successfully updated!` });
                                }
                            });
                        }
                    });
                }
            }
        });
    } else {
        res.status(401).json({ message: "Something went wrong!" });
    }
}

// fetch all users
const fetchUsers = async (req, res) => {
    const fetchUser = `SELECT * FROM users WHERE isDelete = ? AND user_type = ?`;
    db.query(fetchUser, ["not", "Customer"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: results });
        }
    });
}

// edit user
const editUser = async (req, res) => {
    const { editUserData, userId } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeUserId = sanitizeAndValidate(userId.toString(), validationRules);
    const sanitizeFirstName = sanitizeAndValidate(editUserData.firstName.toString(), validationRules);
    const sanitizeLastName = sanitizeAndValidate(editUserData.lastName.toString(), validationRules);
    const sanitizeUsername = sanitizeAndValidate(editUserData.username.toString(), validationRules);
    const sanitizeEditId = sanitizeAndValidate(editUserData.editId.toString(), validationRules);

    if (!sanitizeUserId || !sanitizeFirstName || !sanitizeLastName || !sanitizeEditId || !sanitizeUsername) {
        res.status(401).json({ message: "Invalid Input!" });
    } else {
        // check username
        const checkUsername = `SELECT * FROM users WHERE username = ? AND id != ?`;
        db.query(checkUsername, [sanitizeUsername, sanitizeEditId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                if (results.length > 0) {
                    res.status(401).json({ message: "Username already exist!" });
                } else {
                    // update info
                    const updateUser = `UPDATE users SET first_name = ?, middle_name = ?, last_name = ?, username = ? WHERE id = ?`;
                    db.query(updateUser, [sanitizeFirstName, editUserData.middleName, sanitizeLastName, sanitizeUsername, sanitizeEditId], (error, results) => {
                        if (error) {
                            res.status(401).json({ message: "Server side error!" });
                        } else {
                            // insert notification
                            const insertNot = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?, ?, ?)`;
                            db.query(insertNot, [sanitizeUserId, "Users", `You've successfully updated ${sanitizeFirstName} ${editUserData.middleName} ${sanitizeLastName}`], (error, results) => {
                                if (error) {
                                    res.status(401).json({ message: "Server side error!" });
                                } else {
                                    res.status(200).json({ message: `${sanitizeFirstName} ${editUserData.middleName} ${sanitizeLastName} has been successfully updated!` });
                                }
                            })
                        }
                    });
                }
            }
        })
    }
}

// delete user
const deleteUser = async (req, res) => {
    const { deleteData, userId } = req.body;

    if (deleteData && userId) {
        // delete user
        const deleteUser = `UPDATE users SET isDelete = ? WHERE id = ?`;
        db.query(deleteUser, ["Deleted", deleteData.deleteId], (error, results) => {
            if (error) {
                res.status(401).json({ message: "Server side error!" });
            } else {
                // insert notification
                const insertNot = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?, ?, ?)`;
                db.query(insertNot, [userId, "Users", `You have been successfully deleted ${deleteData.firstName} ${deleteData.middleName} ${deleteData.lastName} as Customer account!`], (error, results) => {
                    if (error) {
                        res.status(401).json({ message: "Server side error!" });
                    } else {
                        res.status(200).json({ message: `${deleteData.firstName} ${deleteData.middleName} ${deleteData.lastName} has been successfully deleted!` });
                    }
                });
            }
        });
    } else {
        res.status(401).json({ message: "Something went wrong!" });
    }
}

// add new product
const addProduct = async (req, res) => {
    const { category, productName, stock, description, prize, address, discount } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeCategory = sanitizeAndValidate(category, validationRules);
    const sanitizeProductName = sanitizeAndValidate(productName, validationRules);
    const sanitizeStock = sanitizeAndValidate(stock, validationRules);
    const sanitizePrize = sanitizeAndValidate(prize, validationRules);
    const sanitizeAddress = sanitizeAndValidate(address, validationRules);
    const sanitizeDiscount = sanitizeAndValidate(discount, validationRules);

    if (!sanitizeCategory || !sanitizeProductName || !sanitizeStock || !sanitizePrize || !sanitizeAddress) {
        res.status(401).json({ message: "Invalid Input!" });
    }
    else {
        const originalFileName = req.file.originalname;
        const uniqueFileName = `${Date.now()}_+_${originalFileName}`;
        const uniqueFilePath = `assets/product image/${uniqueFileName}`;

        const typeMime = mime.lookup(originalFileName);

        if ((typeMime === 'image/png') || (typeMime === 'image/jpeg')) {
            fs.rename(req.file.path, uniqueFilePath, (err) => {
                if (err) {
                    res.status(401).json({ message: "Error to upload file" });
                } else {
                    const sanitizedFileName = sanitizeHtml(req.file.originalname); // Sanitize HTML content
                    if (!validator.isLength(sanitizedFileName, { min: 1, max: 255 })) {
                        return res.status(401).send({ message: "Invalid File Name!" });
                    }
                    else {
                        const insert = `INSERT INTO products (category, image, name, description, stock, prize, address, discount) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;
                        db.query(insert, [sanitizeCategory, uniqueFilePath, sanitizeProductName, description, sanitizeStock, sanitizePrize, sanitizeAddress, sanitizeDiscount], (error, results) => {
                            if (error) {
                                res.status(401).json({ message: "Server side error!" });
                            } else {
                                res.status(200).json({ message: `${sanitizeProductName} has been successfully added!` });
                            }
                        });
                    }
                }
            });
        }
        else {
            res.status(401).json({ message: "Invalid Image Type!" });
        }
    }

}

// fetch product
const fetchProduct = async (req, res) => {
    // get the product
    const getProduct = `SELECT * FROM products WHERE isDelete = ?`;
    db.query(getProduct, ["not"], (error, results) => {
        if (error) {
            res.status(401).json({ message: "Server side error!" });
        } else {
            res.status(200).json({ message: results });
        }
    });
}

// edit product
const editProduct = async (req, res) => {
    const { category, productName, stock, description, editId, prize, address, discount } = req.body;

    const validationRules = [
        { validator: validator.isLength, options: { min: 1, max: 255 } },
    ];

    const sanitizeCategory = sanitizeAndValidate(category, validationRules);
    const sanitizeProductName = sanitizeAndValidate(productName, validationRules);
    const sanitizeStock = sanitizeAndValidate(stock, validationRules);
    const sanitizePrize = sanitizeAndValidate(prize, validationRules);
    const sanitizeDiscount = sanitizeAndValidate(discount, validationRules);
    const sanitizeAddress = sanitizeAndValidate(address, validationRules);

    if (!sanitizeCategory || !sanitizeProductName || !sanitizeStock || !sanitizeAddress) {
        res.status(401).json({ message: "Invalid Input!" });
    }
    else {
        const originalFileName = req.file.originalname;
        const uniqueFileName = `${Date.now()}_+_${originalFileName}`;
        const uniqueFilePath = `assets/product image/${uniqueFileName}`;

        const typeMime = mime.lookup(originalFileName);

        if ((typeMime === 'image/png') || (typeMime === 'image/jpeg')) {
            fs.rename(req.file.path, uniqueFilePath, (err) => {
                if (err) {
                    res.status(401).json({ message: "Error to upload file" });
                } else {
                    const sanitizedFileName = sanitizeHtml(req.file.originalname); // Sanitize HTML content
                    if (!validator.isLength(sanitizedFileName, { min: 1, max: 255 })) {
                        return res.status(401).send({ message: "Invalid File Name!" });
                    }
                    else {
                        const updateProduct = `UPDATE products SET category = ?, image = ?, name = ?, description = ?, stock = ?, prize = ?, address = ?, discount = ? WHERE id = ?`;
                        db.query(updateProduct, [sanitizeCategory, uniqueFilePath, sanitizeProductName, description, sanitizeStock, sanitizePrize, sanitizeAddress, sanitizeDiscount, editId], (error, results) => {
                            if (error) {
                                res.status(401).json({ message: "Server side error!" });
                            } else {
                                res.status(200).json({ message: `${sanitizeProductName} has been successfully updated!` });
                            }
                        });
                    }
                }
            });
        }
        else {
            res.status(401).json({ message: "Invalid Image Type!" });
        }
    }
}

// delete product
const deleteProduct = async (req, res) => {
    const {editProductData, userId} = req.body;

    const deleteProduct = `UPDATE products SET isDelete = ? WHERE id = ?`;
    db.query(deleteProduct, ["Deleted", editProductData.editId], (error, results) => {
        if (error) {
            res.status(401).json({message: "Server side error!"});
        }else{
            // insert notification
            const insertNot = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?, ?, ?)`;
            db.query(insertNot, [userId, "Products", `You've successfully deleted ${editProductData.productName}`], (error, results) => {
                if (error) {
                    res.status(401).json({message: "Server side error!"});
                }else{
                    res.status(200).json({message: `${editProductData.productName} has been successfully deleted!`});
                }
            })
        }
    })
}

// get users order
const getUserOrders = async (req, res) => {
    const getOrders = `SELECT * FROM orders WHERE isDelete = ?`;
    db.query(getOrders, ["not"], (error, results) => {
        if (error) {
            res.status(401).json({message: "Server side error!"});
        }else{
            res.status(200).json({message: results});
        }
    })
}

// change order status
const changeOrderStatus = async (req, res) => {
    const {status, userId} = req.body

    if (status && userId){
        // change status
        const changeStatus = `UPDATE orders SET status = ? WHERE id = ?`;
        db.query(changeStatus, [status.status, status.editId], (error, results) => {
            if (error) {
                res.status(401).json({message: "Server side error!"});
            }else{
                // insert notification
                const insertCustomerNotification = `INSERT INTO notifications (user_id, notification_type, content) VALUES (?, ?, ?)`;
                db.query(insertCustomerNotification, [status.customerId, "Order Status", `Your order status was updated to ${status.status}.`], (error, results) => {
                    if (error) {
                        res.status(401).json({message: "Server side error!"});
                    }else{
                        res.status(200).json({message: `Status change to ${status.status}`});
                    }
                })
            }
        })

    }else{
        res.status(401).json({message: "Something went wrong!"});
    }
}

// fetch settings
const fetchSettings = async (req, res) => {
    const getSetngs = `SELECT * FROM settings`;
    db.query(getSetngs, (error, results) => {
        if (error) {
            res.status(401).json({message: "Server side error!"});
        }else{
            res.status(200).json({message: results[0]});
        }
    });
}

// update settings
const updateSettings = async (req, res) => {
    const {title, id} = req.body;
    
    if (title && id) {
        const originalFileName = req.file.originalname;
        const uniqueFileName = `${Date.now()}_+_${originalFileName}`;
        const uniqueFilePath = `assets/settings image/${uniqueFileName}`;

        const typeMime = mime.lookup(originalFileName);

        if ((typeMime === 'image/png') || (typeMime === 'image/jpeg')) {
            fs.rename(req.file.path, uniqueFilePath, (err) => {
                if (err) {
                    res.status(401).json({ message: "Error to upload file" });
                } else {
                    const sanitizedFileName = sanitizeHtml(req.file.originalname); // Sanitize HTML content
                    if (!validator.isLength(sanitizedFileName, { min: 1, max: 255 })) {
                        return res.status(401).send({ message: "Invalid File Name!" });
                    }
                    else {
                        const update = `UPDATE settings SET title = ?, image = ? WHERE id = ?`;
                        db.query(update, [title, uniqueFilePath, id], (error, results) => {
                            if (error) {
                                res.status(401).json({message: "Server side error!"});
                            }else{
                                res.status(200).json({message: "Updated success!"});
                            }
                        });
                    }
                }
            });
        }
        else {
            res.status(401).json({ message: "Invalid Image Type!" });
        }
    }else{
        res.status(401).json({message: "Something went wrong!"});
    }
}


module.exports = { updateSettings, fetchSettings, changeOrderStatus, getUserOrders, addCategory, fetchCategory, deleteCategory, editCategory, fetchUsers, editUser, deleteUser, addProduct, fetchProduct, editProduct, deleteProduct };