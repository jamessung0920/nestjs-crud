import { IsString, IsBoolean, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreatePostDto {
  @ApiProperty()
  @Length(1, 20)
  @IsString()
  readonly title: string;

  @ApiProperty()
  @Length(1, 100)
  @IsString()
  readonly content: string;

  @ApiProperty()
  readonly author?: string;

  @ApiProperty()
  @IsBoolean()
  readonly isViewable: boolean;
}