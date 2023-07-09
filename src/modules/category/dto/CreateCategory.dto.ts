import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 30, {
    message:
      'The category name must be at least 6 but not longer than 30 characters',
  })
  readonly name: string;
}
