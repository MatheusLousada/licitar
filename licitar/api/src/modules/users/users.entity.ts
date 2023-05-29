import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Bid } from '../bids/bids.entity';
import { Auction } from '../auctions/auctions.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(() => Bid, bid => bid.user)
  bids: Bid[];

  @ManyToMany(() => Auction, auction => auction.participants)
  auctions: Auction[];
}
