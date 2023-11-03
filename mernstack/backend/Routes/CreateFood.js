const express = require("express");
const router = express.Router();
const Food = require("../models/Food")
const FoodCategory = require("../models/Category")


router.post("/createfood", async (req, res) => {
    const { categoryName, product, img, options, description } = req.body
    
    try {
        const data = await Food.create({
            categoryName: categoryName,
            product: product,
            img: img,
            options: options,
            description:description
        })
        return res.json(data)
        
    } catch (err) {
        console.log(err)
    }
})

router.get("/getallfood", async (req, res) => {
    try {
        const data = await Food.find()
        return res.json(data);
    } catch (err) {
        console.log(err)
    }
})

router.get("/getcategory", async (req, res) => {
    try {
        const data = await FoodCategory.find()
        return res.json(data)
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;