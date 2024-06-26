import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { DepartmentService } from './department.service';
import { CourseService } from '../courses/course.service';

@Controller('departments')
export class DepartmentController {
  constructor(
    private readonly departmentService: DepartmentService,
    private readonly courseService: CourseService,
  ) {}

  @Get()
  async findAll(@Query('name') name: string) {
    if (name) {
      return this.departmentService.findByName(name);
    }
    return this.departmentService.findAll();
  }

  @Post()
  async create(
    @Body() createDepartmentDto: { name: string; collegeId: string },
  ) {
    return this.departmentService.create(createDepartmentDto);
  }

  @Post('delete')
  async delete(@Body() deleteDepartmentDto: { departmentId: string }) {
    const { departmentId } = deleteDepartmentDto;
    await this.courseService.deleteByDepartment(departmentId);
    return this.departmentService.delete(departmentId);
  }
  @Post('update')
  async update(
    @Body()
    updateDepartmentDto: {
      departmentId: string;
      newName: string;
      newCollegeId: string;
    },
  ) {
    return this.departmentService.update(
      updateDepartmentDto.departmentId,
      updateDepartmentDto.newName,
      updateDepartmentDto.newCollegeId,
    );
  }
}
