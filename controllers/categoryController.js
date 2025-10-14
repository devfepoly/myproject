import Category from '../models/Category.js'
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

function getCategory(req, res) {
    return res.render('category');
}

async function createCategory(req, res) {
    const { name, description } = req.body;

    const existingCat = await Category.findOne({ name });
    
    if (existingCat) return res.json({ error: "duplicate" })

    const newCat = new Category({ name, description })

    const cat = await newCat.save();

    return res.json({ success: true, data: cat });
}

async function updateCategory(req, res) {
    const { id, description, name } = req.body;

    if (!id || !description || !name) return res.status(400).json({ error: "Missing required fields" })

    const existingCat = await Category.findOne({ name });
    if (existingCat) res.status(400).json({ error: 'duplicate name' })
    
    await Category.updateOne({ _id: id }, { description, name });

    const updatedCat = await Category.findById(id);

    return res.json({ success: true, data: updatedCat })
}

async function deleteCategory(req, res) {
    const { id } = req.body;
    if (!id || !ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid" });

    const existingCat = await Category.findOne({ _id: id });

    if (!existingCat) return res.status(400).json({ error: "category has not been created yet!" })

    await Category.deleteOne({ _id: id });

    return res.json({ success: true, data: existingCat });
}

export {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}
