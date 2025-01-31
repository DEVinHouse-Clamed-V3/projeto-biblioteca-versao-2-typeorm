import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import Autor from '../entities/Autor';
import { Like } from 'typeorm';

const autorRoutes = Router();

const autorRepository = AppDataSource.getRepository(Autor)

//Criar um autor: Permitir ao usuário adicionar um novo autor na biblioteca.
autorRoutes.post("/", async (req: Request, res: Response) => {
    try {
        const { name, birthdate, biography, nationality, active } = req.body

        if(!name || !birthdate || !biography || !nationality || !active) {
            res.status(400).json({ message: "Os campos são obrigatórios." })
            return
        }

        const autor = autorRepository.create({
            name, 
            birthdate,
            biography,
            nationality,
            active
        })

        await autorRepository.save(autor)

        res.status(201).json(autor)

    } catch (error) {
        console.log(error)

        res.status(500).json({ message: "Erro ao cadastrar autor."})
    }
})

//Buscar todos os autores: Retornar uma lista de todos os autores cadastrados permitindo pesquisar por nome.
autorRoutes.get("/", async (req: Request, res: Response) => {
    try {
        const { name } = req.query;

        let authors;

        if (name) {
            authors = await autorRepository.find({
                where: { 
                    name: Like(`%${name}%`) 
                }
            });
        } else {
            authors = await autorRepository.find();
        }

        res.status(200).json(authors);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao buscar autores." })
    }
})

// Buscar um autor específico: Permitir ao usuário buscar um autor por ID.
autorRoutes.get("/:id", async (req: Request, res: Response) => {
    try {
        const { id } = req.params

        if(!id) {
            res.status(400).json({ message: "O campo ID é obrigatório" })
        }

        const author = autorRepository.find({
            where: {
                id: parseInt(id)
            }
        })

        if(!author) {
            res.status(404).json({ message: "Autor não foi encontrado."})
            return
        }

        res.status(200).json(author)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao buscar autor." })
    }
})

//Atualizar as informações de um autor: Permitir ao usuário atualizar o nome, biografia, data de nascimento, nacionalidade e se o autor está ativo.
autorRoutes.put('/', async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { created_at, updated_at } = req.body;

        if(id || created_at || updated_at) {
            res.status(403).json({ message: "Os campos id, created_at e updated_at não podem ser alterados." })
            return
        }

        //verifica se autor existe
        const author = await autorRepository.findOne({
            where: {
                id: parseInt(id)
            }
        })

        if(!author) {
            res.status(404).json({ message: "Autor informado não existe." })
            return
        }

        const authorUodate = req.body

        Object.assign(author, authorUodate);

        await autorRepository.save(author)

        res.status(200).json(author)

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: "Erro ao atualizar autor."})
    }

})

export default autorRoutes;



/* 3 - Rotas: Crie as rotas abaixo para gerenciar as operações CRUD de autores. Ele deverá ser capaz de:

    Deletar um autor: Permitir ao usuário remover um autor da biblioteca.

    Autores do mês: uma rota que liste todos os autores que tem data de nascimento no mês atual. */