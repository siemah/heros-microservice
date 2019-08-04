import { Application} from 'express';
import { BookController } from '../controller/book';
import { isAdmin } from './middleware';

/**
 * config a routes of book service
 * @author siemah
 * @version 1.0.0
 * @since 28/07/2019
 * @param app instance of expressjs Application 
 */
export default function setupRoutes(app: Application): void {

  app.get('/books', isAdmin, BookController.getAllBooks);
  app.get('/book/:id', BookController.getBook);
  app.post('/book', isAdmin, BookController.createNewBook);
  app.delete('/book/:id', isAdmin, BookController.removeBook);

}