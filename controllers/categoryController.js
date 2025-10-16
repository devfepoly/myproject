import Category from '../models/Category.js'
import mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

async function getCategory(req, res) {
    const { id, parent_id, name, description } = req.query;

    const query = {};
    if (id) query._id = id;
    if (parent_id) query.parent_id = parent_id;
    if (name) query.name = new RegExp(name, 'i');
    if (description) query.description = new RegExp(description, 'i');

    const cats = await Category.find(query);

    const data = cats.map(cat => ({
        id: cat._id,
        parent_id: cat.parent_id,
        name: cat.name,
        description: cat.description
    }))

    return res.json({
        success: true,
        data
    });
}

async function createCategory(req, res) {
    const { name, description } = req.body;

    if (!name || !description) return res.status(400).json({ error: 'Missing required fileds.' });

    const existingCat = await Category.findOne({ name });

    if (existingCat) return res.status(400).json({ error: "Duplicate name." })

    const newCat = new Category({ name, description })

    const cat = await newCat.save();

    const data = {
        id: cat._id,
        parent_id: cat.parent_id,
        name: cat.name,
        description: cat.description
    }

    return res.json({ success: true, data });
}

async function updateCategory(req, res) {
    const { id, description, name } = req.body;

    if (!id || !description || !name) return res.status(400).json({ error: "Missing required fields" })

    const existingCat = await Category.findOne({ name, _id: { $ne: id } });
    if (existingCat) {
        return res.status(400).json({ error: "Duplicate name." });
    }

    await Category.updateOne({ _id: id }, { description, name });

    const updatedCat = await Category.findById(id);

    const data = {
        id: updatedCat._id,
        parent_id: updatedCat.parent_id,
        name: updatedCat.name,
        description: updatedCat.description
    }

    return res.json({ success: true, data })
}

async function deleteCategory(req, res) {
    const { id } = req.body;
    if (!id || !ObjectId.isValid(id)) return res.status(400).json({ error: "Invalid id." });

    const existingCat = await Category.findOne({ _id: id });

    if (!existingCat) return res.status(400).json({ error: "category has not been created yet!" })

    await Category.deleteOne({ _id: id });

    const data = {
        id: existingCat._id,
        parent_id: existingCat.parent_id,
        name: existingCat.name,
        description: existingCat.description
    }

    return res.json({ success: true, data });
}

export {
    getCategory,
    createCategory,
    updateCategory,
    deleteCategory
}
