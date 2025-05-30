import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Hashrate {
    @PrimaryGeneratedColumn()
    id!: number;

    @Column("bigint")
    hashrate!: number;

    @Column("bigint", { nullable: true })
    difficulty?: number;

    @Column("bigint", { unique: true })
    timestamp!: number;
} 