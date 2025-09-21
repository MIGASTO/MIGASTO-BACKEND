import {
  IsNotEmpty,
  IsString,
  IsEmail,
  MinLength,
  IsInt,
} from 'class-validator';

export class CreateUsuarioDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  contrasena: string;

  @IsNotEmpty()
  @IsInt()
  id_rol: number;
}
