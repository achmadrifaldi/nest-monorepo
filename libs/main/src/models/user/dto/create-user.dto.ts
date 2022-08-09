import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  IsEmail,
  Matches,
  IsOptional,
  MaxLength,
  MinLength,
  IsNumberString,
} from 'class-validator';
import { Match } from '../../../common/decorators/validations/match.validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  public name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsEmail()
  public email: string;

  @ApiPropertyOptional()
  @IsNumberString()
  @IsOptional()
  public phoneCode: string;

  @ApiProperty()
  @IsNotEmpty()
  public phoneNumber: string;

  @ApiProperty()
  @MinLength(4)
  @MaxLength(20)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  })
  password: string;

  @ApiProperty()
  @Match('password', {
    message: 'password not match with passwordConfirm',
  })
  passwordConfirm: string;
}
