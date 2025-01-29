import { Request, Response, Router } from 'express';
import Livro from '../entities/Livro';
import { AppDataSource } from '../database/data-source';

const livroRoutes = Router();
const livro_repository = AppDataSource.getRepository(Livro)

livroRoutes.post('/AdicionarLivro', async (req:Request, res:Response) => {
    const body = req.body as Livro

    if(!body.title)
        {
            res.status(400).json("O titulo do livro é uma informação necessaria para o cadastro!")
        }

    else if(!body.isbn)
        {
            res.status(400).json("o código ISBN do livro é uma informação necessaria para o cadastro!") 
        }

    const livro_salvo = await livro_repository.save(body)
    res.status(201).json(livro_salvo)
})

export default livroRoutes;