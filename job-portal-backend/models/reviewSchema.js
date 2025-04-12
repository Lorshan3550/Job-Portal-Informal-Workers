const reviewSchema = new mongoose.Schema({
    reviewId: { type: mongoose.Schema.Types.ObjectId, auto: true },
    reviewerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User (Reviewer)
    revieweeId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }, // Reference to User (Reviewee)
    rating: { type: Number, min: 1, max: 5, required: true },
    comments: { type: String },
    createdAt: { type: Date, default: Date.now }
  });
  
  export const Review =  mongoose.model('Review', reviewSchema);
  