const { json } = require("body-parser");
const {Book, Author}= require("../model/model");

const bookController={
    //ADD A BOOK
    addABook: async(req, res)=>{
        try {
            const newBook= new Book(req.body);
            const savedBook= await newBook.save();
            if(req.body.author){
                const author= Author.findById(req.body.author);
                await author.updateOne({$push: {books:savedBook._id}});
            }
            res.status(200).json(savedBook);
        } catch (err) {
            res.status(500).json(err);
        }
    },
    //GET ALL BOOK
    getAllBooks: async(req, res)=>{
        try {
            const allBook= await Book.find();
            res.status(200).json(allBook);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //GET A BOOK
    getABook: async(req, res)=>{
        try {
            const book= await Book.findById(req.params.id).populate("author");
            res.status(200).json(book);
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //UPDATE A BOOK
    updateBook: async(req, res)=>{
        try {
            const book= await Book.findById(req.params.id);
            await Book.updateOne({$set: req.body});
            res.status(200).json("Update successfully!");
        } catch (err) {
            res.status(500).json(err);
        }
    },

    //DELETE A BOOK
    deleteBook: async(req, res)=>{
        try {
            await Author.updateMany({books: req.params.id}, {$pull:{books: req.params.id}});
            await Book.findByIdAndDelete(req.params.id);
            res.status(200).json("Delete successfully!")
        } catch (err) {
            res.status(500).json(err);
        }
    },
};

module.exports= bookController;