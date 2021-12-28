import {
  IsEmail,
  IsNotEmpty,
  Matches,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UserLoginDto {
  @ApiProperty({
    example: 'test@gmail.com',
    description: 'users email',
    required: true,
  })
  @IsEmail()
  email: string;

  @ApiProperty({
    example: '123qwe!WE',
    description: 'users password',
    required: true,
  })
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(30)
  @Matches(
    /(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&amp;*()_+}{&quot;:;'?/&gt;.&lt;,])(?!.*\s).*$/,
    {
      message:
        'password too weak, password must contain at least 8 characters in length, ' +
        'contain: lower case letters, upper case letters, numbers and special characters',
    },
  )
  password: string;
}
