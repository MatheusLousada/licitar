import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto, IsValidCategory } from './create-product.dto';
import { Category } from '../enums/Category';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @IsValidCategory()
  readonly category: Category;
}
