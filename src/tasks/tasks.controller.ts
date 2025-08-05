import { Controller, Get, Patch, Post, Delete, Param, Body, Query, ParseBoolPipe, ParseIntPipe, HttpCode } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entities/task.entity';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }

  // TODO: Implement GET /tasks
  @Get()
  findAll(@Query('isDone') isDone?: string) {
    const parsedIsDone = isDone === 'true' ? true : isDone === 'false' ? false : undefined;
    const result = this.tasksService.findAll(parsedIsDone);
    return {
      success: true,
      ...result,
    };
  }

  // TODO: Implement GET /tasks/:id
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number) {
    const result = this.tasksService.findOne(id);
    return {
      success: true,
      ...result,
    };
  }

  // TODO: Implement POST /tasks
  @Post()
  create(@Body() createTaskDto: CreateTaskDto) {
    const result = this.tasksService.create(createTaskDto);
    return {
      success: true,
      ...result,
    };
  }

  // TODO: Implement UPDATE /tasks
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: UpdateTaskDto,
  ) {
    const result = this.tasksService.update(id, updateTaskDto);
    return {
      success: true,
      ...result,
    };
  }

  // TODO: Implement DELETE /tasks/:id
  @Delete(':id')
  @HttpCode(200)
  delete(@Param('id', ParseIntPipe) id: number) {
    const result = this.tasksService.delete(id);
    return {
      success: true,
      ...result,
    };
  }
}
