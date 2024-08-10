const invoiceModel = require("../../models/invoices")

const invoiceController = async (req, res) => {
   try {
    const user = req.session.user
    if(!user)
    {
        return res.status(401).json({message: "unauthorized"})
    }
    const getInvoices = await invoiceModel.find({user:user._id})
    if(getInvoices.length == 0)
    {
        return res.status(404).json({message: "no invoices found"})
    }
    res.status(200).json(getInvoices)
   } catch (error) {
         res.status(500).json({ message: "Internal server error" })
   }
}
module.exports = invoiceController