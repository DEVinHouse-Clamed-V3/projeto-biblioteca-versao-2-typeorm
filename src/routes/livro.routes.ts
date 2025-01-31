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

livroRoutes.put('/AtualizarLivro/:id', async (req: Request, res: Response) => {
    const new_info_id = req.params.id
    const new_info = req.body as Livro;
    const book_to_uptade = await livro_repository.findOneBy({id: Number(new_info_id)})


    if(!book_to_uptade)
        {
            res.status(404).json("O livro especificado nao foi encontrado")
        }

    if(new_info.id)
        {
            res.status(403).json("Não é permitido alterar o id de um livro!")
        }
    
    Object.assign(book_to_uptade as Livro, new_info) 

    const book_updated = await livro_repository.save(book_to_uptade as Livro)
    res.status(202).json({book_updated})
})

livroRoutes.delete('/DeletarLivro/:id', async (req: Request, res: Response) => {
    const body_id = req.params.id
    const book_to_delete = await livro_repository.findOneBy({id: Number(body_id)})

    if(!book_to_delete)
        {
            res.status(404).json("O livro espeficado não foi encontrado!")
        }
    
    
    await livro_repository.delete({id: Number(body_id)})
    res.status(202).json("O livro espeficado foi removido!")
})

livroRoutes.get('/LivrosRank/:language?', async (req:Request, res: Response) => {
        const body_language = req.query.language as string // gets the language parameter
        console.log("language -> " + body_language)
        
         
        const livros = await livro_repository.find({
            where: { language: body_language },
            order: { page_count: "DESC" } // Ordenando pelo título em ordem crescente
        });
            
        
        
         if(livros.length == 0)
                {
                    res.status(202).json("não há livros cadastrados!")
                }
            
            else
            {
                res.status(202).json(livros)  
            }
})
    
})

export default livroRoutes;