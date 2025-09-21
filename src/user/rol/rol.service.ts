import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Rol } from './entity/rol.entity';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';

@Injectable()
export class RolService {
  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>,
  ) {}

  // Crear rol
  async create(createRolDto: CreateRolDto) {
    const rol = this.rolRepository.create(createRolDto);
    await this.rolRepository.save(rol);
    return { message: 'Rol creado exitosamente', data: rol };
  }

  // Listar todos los roles
  async findAll() {
    return this.rolRepository.find({ relations: ['usuarios'] });
  }

  // Buscar un rol por ID
  async findOne(id: number) {
    const rol = await this.rolRepository.findOne({
      where: { id_rol: id },
      relations: ['usuarios'],
    });
    if (!rol) return { message: 'Rol no encontrado' };
    return rol;
  }

  // Actualizar rol
  async update(id: number, updateRolDto: UpdateRolDto) {
    const rol = await this.rolRepository.findOne({ where: { id_rol: id } });
    if (!rol) return { message: 'Rol no encontrado' };

    Object.assign(rol, updateRolDto);
    await this.rolRepository.save(rol);
    return { message: 'Rol actualizado exitosamente', data: rol };
  }

  // Eliminar rol
  async remove(id: number) {
    const rol = await this.rolRepository.findOne({ where: { id_rol: id } });
    if (!rol) return { message: 'Rol no encontrado' };

    await this.rolRepository.remove(rol);
    return { message: 'Rol eliminado correctamente' };
  }
}
