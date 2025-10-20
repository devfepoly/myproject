import Brand from '../../models/Brand.js';

async function getBrand(req, res) {
    let { page = 1, q = "", is_active } = req.query;

    page = parseInt(page);
    const limit = 10;
    const skip = (page - 1) * limit;

    const query = {};
    
    if (q.trim() !== "") {
        query.name = { $regex: q.trim(), $options: "i" };
        query.description = { $regex: q.trim(), $options: "i" };
    }
    if (is_active !== undefined) {
        query.is_active = is_active === "true";
    }
    
    let brands = [];
    try {
        const totalBrands = await Brand.countDocuments(query);

        brands = await Brand.find(query)
            .skip(skip)
            .limit(limit)
            .sort({ createdAt: -1 });

        const totalPages = Math.ceil(totalBrands / limit);

        brands = brands.map(b => {
            return {
                id: b._id,
                name: b.name,
                description: b.description,
                is_active: b.is_active,
                created_at: b.createdAt,
                updated_at: b.updatedAt
            }
        })

        res.render('brand', { brands, totalPages })
    } catch (error) {
        console.log(error);
        res.render('/admin');
    }
}

export {
    getBrand
}
