import { BookDocument } from "../types/book";
import Book from "../models/Book";
import { Response, Request } from "express";

/**
 * @name BookController
 * @author siemah
 * @version 1.0.0
 * @since 07/28/2018
 * controlle a book api request
 */
export class BookController {
  
  /**
   * retrieve all books
   * @param req request object
   * @param res response object
   * @see express package doc
   */
  static async getAllBooks(req: Request, res: Response): Promise<any> {
    let books: BookDocument[];
    try {
      books = await Book.find({});
    } catch (error) {
      books = [];// or just throw an error an handle it on errorHandler function
    }
    res.status(200).json({
      length: books.length,
      books
    });
  }
  
  /**
   * create a new Book document 
   * @param req request
   * @param res response
   */
  static async createNewBook(req: Request, res: Response): Promise<any> {
    // valide all data sended by user before save theme
    let body: BookDocument = req.body;
    let newBook = new Book(body);
    let _isSaved: BookDocument;
    try {
      _isSaved = await newBook.save();  
      res.status(203).json(_isSaved);
    } catch ({ message, ...error }) {
      console.log("error when saving a new book", error);
      res.status(403).json({
        message,
        error
      })
    }
  }

  /**
   * remove a book using a _id
   * @param req request
   * @param res response
   */
  static async removeBook(req: Request, res: Response): Promise<any> {
    let isRemoved: any;
    try {
      isRemoved = await Book.findOneAndDelete(req.params.id);
    } catch (error) {
      isRemoved = true;
    }
    res.status(200).json(isRemoved);
  }

  /**
   * get a current book details using a id passed from url
   * @param req request
   * @param res response
   */
  static async getBook(req: Request, res: Response): Promise<any> {
    let book: BookDocument | any;
    try {
      book = await Book.findOne({ _id: req.params.id });
      res.status(200).json(book);
    } catch ({ message }) {
      res.status(404).json({
        message,
      })
    }
  }

}