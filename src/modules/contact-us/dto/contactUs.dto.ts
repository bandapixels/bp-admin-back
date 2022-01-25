import { IsEmail, IsString, Length } from 'class-validator';

export class ContactUsDto {
  @Length(1, 2048)
  @IsString()
  body: string;

  @IsString()
  @IsEmail()
  email: string;
}
