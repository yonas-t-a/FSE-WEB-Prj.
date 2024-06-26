import { Controller, Get, Post, Body } from '@nestjs/common';
import { CollegeService } from './college.service';
import { DepartmentService } from '../departments/department.service';
import { CourseService } from '../courses/course.service';

@Controller('colleges')
export class CollegeController {
  constructor(
    private readonly collegeService: CollegeService,
    private readonly departmentService: DepartmentService,
    private readonly courseService: CourseService,
  ) {}
  @Get()
  async findAll() {
    return this.collegeService.findAll();
  }

  @Post()
  async create(@Body() createCollegeDto: { name: string }) {
    return this.collegeService.create(createCollegeDto);
  }

  @Post('delete')
  async delete(@Body() deleteCollegeDto: { collegeId: string }) {
    const { collegeId } = deleteCollegeDto;

    // Step 1: Delete all courses related to the departments in the college
    const departments = await this.departmentService.findByCollegeId(collegeId);
    for (const department of departments) {
      await this.courseService.deleteByDepartment(department._id.toString());
    }

    // Step 2: Delete all departments in the college
    await this.departmentService.deleteByCollege(collegeId);

    // Step 3: Delete the college
    return this.collegeService.delete(collegeId);
  }
  @Post('update')
  async update(
    @Body() updateCollegeDto: { collegeId: string; newName: string },
  ) {
    return this.collegeService.updateName(
      updateCollegeDto.collegeId,
      updateCollegeDto.newName,
    );
  }
}
