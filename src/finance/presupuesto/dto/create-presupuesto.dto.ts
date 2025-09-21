import { IsNotEmpty, IsInt, IsNumber } from 'class-validator';

export class CreatePresupuestoDto {
  @IsNotEmpty()
  @IsInt()
  mes: number;

  @IsNotEmpty()
  @IsInt()
  anio: number;

  @IsNotEmpty()
  @IsNumber()
  monto_maximo: number;

  @IsNotEmpty()
  @IsInt()
  id_usuario: number;
}
