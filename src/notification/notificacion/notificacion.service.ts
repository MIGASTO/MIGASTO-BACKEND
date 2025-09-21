import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Notificacion } from './entity/notificacion.entity';
import { CreateNotificacionDto } from './dto/create-notificacion.dto';
import { UpdateNotificacionDto } from './dto/update-notificacion.dto';

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(Notificacion)
    private readonly notificacionRepo: Repository<Notificacion>,
  ) {}

  async create(createNotificacionDto: CreateNotificacionDto) {
    const notificacion = this.notificacionRepo.create({
      ...createNotificacionDto,
      estado: createNotificacionDto.estado ?? 'pendiente',
    });
    return await this.notificacionRepo.save(notificacion);
  }

  async findAll() {
    return await this.notificacionRepo.find({
      relations: ['usuario'],
      order: { fecha_creacion: 'DESC' },
    });
  }

  async findOne(id: number) {
    const notificacion = await this.notificacionRepo.findOne({
      where: { id_notificacion: id },
      relations: ['usuario'],
    });
    if (!notificacion) {
      throw new NotFoundException(`Notificación con id ${id} no encontrada`);
    }
    return notificacion;
  }

  async update(id: number, updateDto: UpdateNotificacionDto) {
    const notificacion = await this.findOne(id);
    Object.assign(notificacion, updateDto);
    return await this.notificacionRepo.save(notificacion);
  }
}
