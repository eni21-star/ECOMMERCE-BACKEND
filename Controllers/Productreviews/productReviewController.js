const reviewModel = require("../../models/reviews")
const productModel = require("../../models/product")
const userModel = require("../../models/users")

// get reviews
const getReview = async ( req, res)=>{
    try {
        const { id } = req.params // product id
        const reviews = await reviewModel.find({product: id})
        if(!reviews)
        {
            return res.status(404).json({message: "no reviews found"})
        }
        //rating
        const ratings = reviews.map(review => review.rating);
        const sum = ratings.reduce((acc, rating) => acc + rating, 0);
        const averageRating = sum / ratings.length;
      
        return res.status(200).json({reviews, averageRating}) 
        
        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

//Post review
const postReview = async (req, res) => {

    const user = req.session.user
    const { id } = req.params // productid
    const { review, rating } = req.body
    try {
       
        
        const product = await productModel.findById(id)
        if (!product) {
            return res.status(404).json({ message: "this product has either been removed or deleted by an admin" })
        }
        const person = await userModel.findById(user._id)
        if (!person) {
            return res.status(404).json({ message: "signup or login to drop a review" })
        }
        const newReview = await reviewModel.create({
            user: user._id,
            product: id,
            name: user.username,
            review: review,
            rating: rating
        })
        if (!newReview) {
            return res.status(404).json({ message: "review not posted" })
        }
        return res.status(200).json({ message: "review posted" })
        
        

        
    } catch (error) {
        return res.status(500).json(error.message)
    }
}

// update review
const updateReview = async (req, res) => {
   try {
    const user = req.session.user
    const person = await userModel.findById(user._id)
   
    if (!person) {
        return res.status(404).json({ message: "signup to drop a review" })
    }
    const { id } = req.params // review id
    const { review, rating } = req.body
    const findReview = await reviewModel.findByIdAndUpdate(id, { review: review, rating: rating}, { new: true})
    if(!findReview)
    {
        return res.status(404).json({message: "review not found"})
    }
    return res.status(200).json({message: "review updated"})
   } catch (error) {
         return res.status(500).json(error.message)
   }

}

// delete review
const deleteReview = async ( req, res) =>{
  try {
    const user = req.session.user 
    const person = await userModel.findById(user._id)

    if(user._id === person._id || user.admin )
    {
        const { id } = req.params //review id
        const findReview = await reviewModel.findByIdAndDelete(id)
        if(!findReview)
        {
            return res.status(404).json({message: "review not found"})
        }
        return res.status(200).json({message: "review deleted"})
    }
  } catch (error) {
    return res.status(500).json(error.message)
  }
}

module.exports = { getReview, postReview, updateReview, deleteReview}