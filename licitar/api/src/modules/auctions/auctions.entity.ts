import { Column, Entity, ManyToOne, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { User } from '../users/users.entity';
import { Product } from '../products/products.entity';
import { AuctionStatus } from './enums/AuctionsStatus';
import { Bid } from '../bids/bids.entity';

@Entity({ name: 'auctions' })
export class Auction {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  minimumValue: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  lastBidValue: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  startDate: Date;

  @Column({ type: 'datetime', default: null })
  endDate: Date;

  @Column({
    type: 'enum',
    enum: AuctionStatus,
    default: AuctionStatus.NOT_STARTED,
  })
  status: AuctionStatus;

  @Column({ unique: true })
  roomKey: string;

  @ManyToOne(() => Product, (product: Product) => product.auctions)
  product: Product;

  @OneToMany(() => Bid, bid => bid.auction)
  bids: Bid[];

  @ManyToMany(() => User, user => user.auctions)
  @JoinTable({ name: 'auction_participants' })
  participants: User[];
}
