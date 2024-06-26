import { Controller, Get, Post, Body, Query } from '@nestjs/common';
import { CourseService } from './course.service';

@Controller('courses')
export class CourseController {
  constructor(private readonly courseService: CourseService) {}

  @Get()
  async findAll(@Query('code') code: string) {
    if (code) {
      return this.courseService.findByCode(code);
    }
    return this.courseService.findAll();
  }

  @Post()
  async create(
    @Body()
    createCourseDto: {
      code: string;
      name: string;
      level: string;
      courseInfo: string;
      syllabus?: string;
      externalLink?: string;
      books?: Record<string, any>[];
      lectureVideos?: Record<string, any>[];
      lectureAudios?: Record<string, any>[];
      exams?: Record<string, any>[];
      departmentId: string;
    },
  ) {
    return this.courseService.create(createCourseDto);
  }

  @Post('delete')
  async delete(@Body() deleteCoursesDto: { courseIds: string[] }) {
    return this.courseService.deleteMany(deleteCoursesDto.courseIds);
  }
}
