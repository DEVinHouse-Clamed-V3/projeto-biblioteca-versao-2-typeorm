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

livroRoutes.get('/ExibirLivros', async (req:Request, res:Response) => {
    const livros = await livro_repository.find()
    if(Object(livros).keys == 0)
        {
            res.status(202).json("não há livros cadastrados!")
        }
    else
    {
        res.status(202).json(livros)  
    }

livroRoutes.get('/ExibirLivro/:id', async (req:Request, res:Response) => {
    const search_id = req.params.id
    const livro = await livro_repository.findOneBy({id: Number(search_id)})
    if(!livro)
        {
            res.status(202).json("O livro especificado não foi encontrado!")
        }
    else
    {
        res.status(202).json(livro)  
    }
})
    
})

export default livroRoutes;