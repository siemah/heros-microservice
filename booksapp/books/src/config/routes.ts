import { Application} from 'express';
import { BookController } from '../controller/book';

/**
 * config a routes of book service
 * @author siemah
 * @version 1.0.0
 * @since 28/07/2019
 * @param app instance of expressjs Application 
 */
export default function setupRoutes(app: Application): void {

  app.get('/books', BookController.getAllBooks);
  app.get('/book/:id', BookController.getBook);
  app.post('/book', BookController.createNewBook);
  app.delete('/book/:id', BookController.removeBook);

}