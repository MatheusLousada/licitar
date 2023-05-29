import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { Category } from './enums/Category';
import { Auction } from '../auctions/auctions.entity';

@Entity({ name: 'products' })
export class Product {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  initialPrice: number;

  @Column()
  category: Category;

  @OneToMany(() => Auction, auction => auction.product)
  auctions: Auction[];
}
