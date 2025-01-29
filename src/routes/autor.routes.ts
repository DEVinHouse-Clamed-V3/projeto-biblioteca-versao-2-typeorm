import { Router, Request, Response } from 'express';
import { AppDataSource } from '../database/data-source';
import Autor from '../entities/Autor';

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

export default autorRoutes;

/* 3 - Rotas: Crie as rotas abaixo para gerenciar as operações CRUD de autores. Ele deverá ser capaz de:


    Buscar todos os autores: Retornar uma lista de todos os autores cadastrados permitindo pesquisar por nome.

    Buscar um autor específico: Permitir ao usuário buscar um autor por ID.

    Atualizar as informações de um autor: Permitir ao usuário atualizar o nome, biografia, data de nascimento, nacionalidade e se o autor está ativo.

    Deletar um autor: Permitir ao usuário remover um autor da biblioteca.

    Autores do mês: uma rota que liste todos os autores que tem data de nascimento no mês atual. */