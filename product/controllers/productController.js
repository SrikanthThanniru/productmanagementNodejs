const Product = require("../models/Product");

exports.createProduct = async (req, res) => {
    const { title, description, inventoryCount } = req.body;

    try {
        const product = new Product({ title, description, inventoryCount });
        await product.save();
        res.status(200).json({ message: "Product created successfully" });
    } catch (err) {
        console.error("Error creating product:", err); // Log the error to the console
        res.status(500).json({ message: "Error creating product", error: err.message });
    }
};




exports.getProduct = async (req, res)=>{
    try{
        const products = await Product.find();
        res.status(201).json(products)
    }catch(err){
        res.status(500).json({message:"error fetching product", err})
    }
};


exports.updateProduct = async (req, res)=>{
    try{
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, {new: true});
        if(!product) return res.status(401).json({message:"product not found"});

        res.status(201).json(product);
    }catch(err){
        res.status(500).json({message:"error updating product", err})
    }
};


exports.deleteProduct = async (req, res)=>{
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) return res.status(401).json({message:"product not found"});

        res.status(201).json({message:"product deleted successfully"})

    }catch(err){
        res.status(500).json({message:"error deleting product", err})
    }
}


