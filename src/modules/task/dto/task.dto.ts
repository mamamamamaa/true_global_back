import { IsDate, IsNotEmpty, IsString, Length } from 'class-validator';

export class TaskDto {
  @IsString()
  @IsNotEmpty()
  @Length(6, 30, {
    message:
      'The task name must be at least 6 but not longer than 30 characters',
  })
  name: string;

  @IsString()
  @IsNotEmpty()
  @Length(1, 500, {
    message:
      'The task name must be at least 1 but not longer than 500 characters',
  })
  description: string;

  @IsDate()
  @IsNotEmpty()
  dateStart: Date;

  @IsDate()
  @IsNotEmpty()
  dateEnd: Date;
}
