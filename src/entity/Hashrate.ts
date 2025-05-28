import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class Hashrate {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("decimal", { precision: 20, scale: 2 })
    hashrate!: number;

    @CreateDateColumn()
    timestamp!: Date;
} 