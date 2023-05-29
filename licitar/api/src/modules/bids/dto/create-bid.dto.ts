import { Type } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsDate, IsDecimal } from 'class-validator';

export class CreateBidDto {
  @IsNotEmpty()
  @IsDecimal()
  readonly value: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly date: Date;

  @IsNotEmpty()
  @IsNumber()
  readonly userId: number;

  @IsNotEmpty()
  @IsNumber()
  readonly auctionId: number;
}
