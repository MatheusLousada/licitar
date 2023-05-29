import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../users/users.entity';
import { Auction } from '../auctions/auctions.entity';

@Entity({ name: 'bids' })
export class Bid {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  value: number;

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  date: Date;

  @ManyToOne(() => User, (user: User) => user.bids)
  user: User;

  @ManyToOne(() => Auction, (auction: Auction) => auction.bids)
  auction: Auction;
}
