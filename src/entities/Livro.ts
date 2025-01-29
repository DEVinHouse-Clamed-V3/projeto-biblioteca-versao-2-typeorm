import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

class Livro {
    @PrimaryGeneratedColumn()
     id: number
 
     @Column()
     title: string
 
     @Column()
     description: string
 
     @Column()
     publication_date: Date
 
     @Column()
     isbn: string
 
     @Column()
     page_count: number
 
     @Column()
     language: string
 
     @Column()
     created_at: Date
 
     @Column()
     updated_at: Date
 
}

export default Livro;