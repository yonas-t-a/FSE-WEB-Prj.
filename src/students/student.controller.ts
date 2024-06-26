import { Controller, Get, Post, Body, Delete } from '@nestjs/common';
import { StudentService } from './student.service';

@Controller('students')
export class StudentController {
  constructor(private readonly studentService: StudentService) {}

  @Get()
  async findAll() {
    return this.studentService.findAll();
  }

  @Post()
  async create(@Body() createStudentDto: any) {
    return this.studentService.create(createStudentDto);
  }
  @Delete()
  async delete(@Body() body: { emails: string[] }) {
    return this.studentService.delete(body.emails);
  }
}
