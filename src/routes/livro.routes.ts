import { Request, Response, Router } from 'express';
import Livro from '../entities/Livro';
import { AppDataSource } from '../database/data-source';
import BookController from '../controllers/book_controller';

const livroRoutes = Router();
const livro_repository = AppDataSource.getRepository(Livro)
const BooksController = new BookController();

livroRoutes.post('/AdicionarLivro', BooksController.AdicionarLivro)

livroRoutes.get('/ExibirLivros', BooksController.ExibirLivros)

livroRoutes.get('/ExibirLivro/:id', BooksController.ExibirLivro)

livroRoutes.put('/AtualizarLivro/:id', BooksController.AtualizarLivro)

livroRoutes.delete('/DeletarLivro/:id', BooksController.DeletarLivro)

livroRoutes.get('/LivrosRank/:language?', BooksController.LivrosRank)
    

export default livroRoutes;