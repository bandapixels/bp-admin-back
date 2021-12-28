import { IsEmail, IsOptional, IsString } from 'class-validator';

export class ContactUsDto {
  @IsString()
  name: string;

  @IsString()
  company: string;

  @IsString()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  skype: string;

  @IsString()
  task: string;

  @IsString()
  projectType: string;

  @IsString()
  budget: string;

  @IsEmail()
  sendTo: string;
}
