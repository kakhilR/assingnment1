const mongoose = require('mongoose');

const BooksSchema = new mongoose.Schema(
    {
      Title: { type: String, required: true },
      Publication: { type: String, required: true },
      Author: { type: String, required: true,unique: true },
      category: { type: String, required: true },
      cost: { type: Number, required: true },
      publishedAt: { type: Number, required: true },
      isBestSeller: {type: Boolean},
    },
    {
      timestamps: true,
    }
  );
  const Books = mongoose.model('Books', BooksSchema);
  
  module.exports=  Books;