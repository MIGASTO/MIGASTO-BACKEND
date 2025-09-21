// perfil_usuario.entity.ts
import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Usuario } from '../../usuario/entity/usuario.entity';

@Entity('perfil_usuario')
export class PerfilUsuario {
  @PrimaryGeneratedColumn()
  id_perfil: number;

  @Column({ length: 150, nullable: true })
  nombre_completo: string;

  @Column({ nullable: true })
  edad: number;

  @Column({ length: 255, nullable: true })
  foto_perfil: string;

  @Column({ length: 20, nullable: true })
  telefono: string;

  @Column({
    type: 'enum',
    enum: ['masculino', 'femenino', 'otro'],
    nullable: true,
  })
  genero: string;

  @OneToOne(() => Usuario, (usuario) => usuario.perfil)
  @JoinColumn({ name: 'id_usuario' })
  usuario: Usuario;
}
