import { IsNotEmpty, IsString, IsDecimal, IsEnum, IsDate } from 'class-validator';
import { AuctionStatus } from '../enums/AuctionsStatus';
import { Type } from 'class-transformer';

export class CreateAuctionDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  @IsDecimal()
  minimumValue: number;

  @IsDecimal()
  lastBidValue: number;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  readonly startDate: Date;

  @Type(() => Date)
  @IsDate()
  endDate: Date;

  @IsNotEmpty()
  @IsEnum(AuctionStatus)
  status: AuctionStatus;

  @IsNotEmpty()
  userId: number;

  @IsNotEmpty()
  productId: number;

  @IsNotEmpty()
  @IsString()
  roomKey: string;
}
