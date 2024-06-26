import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Course } from '../schemas/course.schema';

@Injectable()
export class CourseService {
  constructor(@InjectModel(Course.name) private courseModel: Model<Course>) {}

  async findAll(): Promise<Course[]> {
    return this.courseModel.find().exec();
  }

  async findByCode(code: string): Promise<Course[]> {
    return this.courseModel.find({ code }).exec();
  }

  async create(createCourseDto: {
    code: string;
    name: string;
    level: string;
    courseInfo: string;
    syllabus?: string;
    externalLink?: string;
    books?: Record<string, any>[];
    lectureVideos?: Record<string, any>[];
    lectureAudios?: Record<string, any>[];
    departmentId: string;
  }): Promise<Course> {
    const createdCourse = new this.courseModel(createCourseDto);
    return createdCourse.save();
  }

  async deleteMany(courseIds: string[]): Promise<any> {
    return this.courseModel.deleteMany({ _id: { $in: courseIds } }).exec();
  }

  async deleteByDepartment(departmentId: string): Promise<any> {
    return this.courseModel.deleteMany({ departmentId }).exec();
  }
}
