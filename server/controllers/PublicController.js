const db = require('../database/Connection');

// get category
const getCategory = async (req, res) => {
    const fetchCategory = `SELECT category_name FROM categories WHERE isDelete = ?`;
    db.query(fetchCategory, ["not"], (error, results) => {
        if (error) {
            res.status(401).json({message: "Server side error!"});
        }else{
            res.status(200).json({message: results});
        }
    });
}

// get products
const getProduct = async (req, res) => {
    const getProduct = `SELECT * FROM products WHERE isDelete = ?`;
    db.query(getProduct, ["not"], (error, results) => {
        if (error) {
            res.status(401).json({message: "Server side error!"});
        }else{
            res.status(200).json({message: results});
        }
    })
}

module.exports = {getCategory, getProduct};