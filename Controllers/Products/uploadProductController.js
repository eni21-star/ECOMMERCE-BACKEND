const productModel = require("../../models/product")


const uploadProduct = async (req, res) =>{

    const user = req.session.user
    if(user.admin)
    {
        const { name, description, price, category, stock} = req.body
        if(!name || !description || !price || !category || !stock)
        {
            return res.status(400).json({message: "Incomplete credentials"})
        }
        else
        {
            try{
                const product = await productModel.create({name, description, price, category, stock})
                if(product)
                {
                    return res.status(201).json({message: "Product uploaded successfully"})
                }
                else
                {
                    return res.status(500).json({message: "Failed to upload product"})
                }
            }
            catch(err)
            {
                return res.status(500).json(err.message)
            }
        }

    }
    else
    {
        res.status(401).json({message: "only admins can add products"})
    }
}

module.exports = uploadProduct