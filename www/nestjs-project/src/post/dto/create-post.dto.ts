import { IsString, IsBoolean, Length } from 'class-validator';

export class CreatePostDto {
  @IsString()
  readonly title: string;

  @IsString()
  readonly content: string;

  @IsString()
  readonly author: string;

  @IsBoolean()
  readonly isViewable: boolean;
}