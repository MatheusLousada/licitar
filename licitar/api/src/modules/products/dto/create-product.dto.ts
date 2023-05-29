import { IsNotEmpty, IsString, IsNumber, Validate, IsEnum } from 'class-validator';
import { Category } from '../enums/Category';

export function IsValidCategory() {
  return Validate((value: Category) => {
    const isValid = Object.values(Category).includes(value);

    if (!isValid) 
      return false;

    return true;
  });
}

export class CreateProductDto {
  
  @IsNotEmpty()
  @IsString()
  readonly title: string;

  @IsNotEmpty()
  @IsString()
  readonly description: string;

  @IsNotEmpty()
  @IsNumber()
  readonly initialPrice: number;

  @IsNotEmpty()
  @IsEnum(Category, { message: 'Por favor, insira uma categoria'})
  readonly category: Category;
}
