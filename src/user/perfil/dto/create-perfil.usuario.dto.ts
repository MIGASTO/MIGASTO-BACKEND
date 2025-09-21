import { IsOptional, IsString, IsInt, IsUrl, IsEnum } from 'class-validator';

export class CreatePerfilUsuarioDto {
  @IsOptional()
  @IsString()
  nombre_completo?: string;

  @IsOptional()
  @IsInt()
  edad?: number;

  @IsOptional()
  @IsUrl()
  foto_perfil?: string;

  @IsOptional()
  @IsString()
  telefono?: string;

  @IsOptional()
  @IsEnum(['masculino', 'femenino', 'otro'])
  genero?: 'masculino' | 'femenino' | 'otro';
}
