import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Student } from '../schemas/student.schema';

@Injectable()
export class StudentService {
  constructor(
    @InjectModel(Student.name) private studentModel: Model<Student>,
  ) {}

  async findAll(): Promise<Student[]> {
    return this.studentModel.find().exec();
  }

  async create(studentData: any): Promise<Student> {
    const createdStudent = new this.studentModel(studentData);
    return createdStudent.save();
  }
  async findByEmail(email: string): Promise<Student | null> {
    return this.studentModel.findOne({ email }).exec();
  }
  async delete(emails: string[]): Promise<{ deleted: boolean }> {
    const result = await this.studentModel
      .deleteMany({ email: { $in: emails } })
      .exec();
    return { deleted: result.deletedCount > 0 };
  }
}
