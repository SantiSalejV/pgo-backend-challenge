import { Injectable, NotFoundException } from '@nestjs/common';
import { Task } from './entities/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];
  private idCounter = 1;
  // TODO: Add in-memory storage
  // TODO: Implement findAll(), findOne(), create(), delete()

  // TODO: Implement findAll()
  findAll(isDone?: boolean) {
    const result = isDone !== undefined
      ? this.tasks.filter(task => task.isDone === isDone)
      : this.tasks;

    return {
      message: 'Listado de tareas obtenido correctamente',
      total: result.length,
      data: result,
    };
  }

  // TODO: Implement findOne()
  findOne(id: number) {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException({
        message: `No se encontró una tarea con ID ${id}`,
        errorCode: 'TASK_NOT_FOUND',
      });
    }

    return {
      message: 'Tarea obtenida correctamente',
      data: task,
    };
  }

  // TODO: Implement create()
  create(createTaskDto: CreateTaskDto) {
    const task: Task = {
      id: this.idCounter++,
      isDone: false,
      ...createTaskDto,
    };
    this.tasks.push(task);

    return {
      message: 'Tarea creada exitosamente',
      data: task,
    };
  }

  // TODO: Implement update()
  update(id: number, updateTaskDto: UpdateTaskDto) {
    const task = this.tasks.find(task => task.id === id);
    if (!task) {
      throw new NotFoundException({
        message: `No se encontró una tarea con ID ${id} para actualizar`,
        errorCode: 'TASK_NOT_FOUND',
      });
    }

    Object.assign(task, updateTaskDto);

    return {
      message: `Tarea con ID ${id} actualizada exitosamente`,
      data: task,
    };
  }

  // TODO: Implement delete()
  delete(id: number) {
    const index = this.tasks.findIndex(task => task.id === id);
    if (index === -1) {
      throw new NotFoundException({
        message: `No se puede eliminar: Tarea con ID ${id} no encontrada`,
        errorCode: 'TASK_DELETE_FAILED',
      });
    }
    const deleted = this.tasks.splice(index, 1)[0];

    return {
      message: `Tarea con ID ${id} eliminada exitosamente`,
      data: deleted,
    };
  }
}
