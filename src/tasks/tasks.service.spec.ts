import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

describe('TasksService', () => {
    let service: TasksService;

    beforeEach(() => {
        service = new TasksService();
    });

    it('should create a task', () => {
        const dto: CreateTaskDto = { title: 'Test', description: 'Test desc' };
        const result = service.create(dto);
        expect(result.message).toBe('Tarea creada con éxito');
        expect(result.data.title).toBe(dto.title);
        expect(result.data.description).toBe(dto.description);
        expect(result.data.isDone).toBe(false);
    });

    it('should return all tasks', () => {
        service.create({ title: 'Task 1', description: 'Desc 1' });
        service.create({ title: 'Task 2', description: 'Desc 2' });
        const result = service.findAll();
        expect(result.message).toBe('Tareas obtenidas con éxito');
        expect(result.data.length).toBe(2);
    });

    it('should filter tasks by isDone', () => {
        service.create({ title: 'Task 1', description: 'Desc 1' });
        const created = service.create({ title: 'Task 2', description: 'Desc 2' });
        service.update(created.data.id, { isDone: true });

        const doneTasks = service.findAll(true);
        expect(doneTasks.data.length).toBe(1);
        expect(doneTasks.data[0].isDone).toBe(true);
    });

    it('should find one task by id', () => {
        const created = service.create({ title: 'Task X', description: 'Desc X' });
        const result = service.findOne(created.data.id);
        expect(result.data.id).toBe(created.data.id);
        expect(result.data.title).toBe('Task X');
    });

    it('should update a task', () => {
        const created = service.create({ title: 'Old Title', description: 'Old Desc' });
        const updateDto: UpdateTaskDto = {
            title: 'New Title',
            isDone: true,
        };
        const updated = service.update(created.data.id, updateDto);
        expect(updated.data.title).toBe('New Title');
        expect(updated.data.isDone).toBe(true);
    });

    it('should delete a task', () => {
        const created = service.create({ title: 'Delete Me', description: 'Desc' });
        const result = service.delete(created.data.id);
        expect(result.message).toBe('Tarea eliminada con éxito');
        expect(result.data.id).toBe(created.data.id);

        expect(() => {
            service.findOne(created.data.id);
        }).toThrow();
    });

    it('should throw if task not found', () => {
        expect(() => service.findOne(999)).toThrow();
        expect(() => service.update(999, { title: 'Test' })).toThrow();
        expect(() => service.delete(999)).toThrow();
    });
});
