import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { College, CollegeSchema } from '../schemas/college.schema';
import { CollegeService } from './college.service';
import { CollegeController } from './college.controller';
import { DepartmentModule } from '../departments/department.module';
import { CourseModule } from '../courses/course.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: College.name, schema: CollegeSchema }]),
    DepartmentModule,
    CourseModule,
  ],
  providers: [CollegeService],
  controllers: [CollegeController],
  exports: [CollegeService],
})
export class CollegeModule {}
