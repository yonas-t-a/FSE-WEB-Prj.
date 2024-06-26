import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { College } from '../schemas/college.schema';

@Injectable()
export class CollegeService {
  constructor(
    @InjectModel(College.name) private collegeModel: Model<College>,
  ) {}

  async findAll(): Promise<College[]> {
    return this.collegeModel.find().exec();
  }

  async create(createCollegeDto: { name: string }): Promise<College> {
    const createdCollege = new this.collegeModel(createCollegeDto);
    return createdCollege.save();
  }
  async delete(collegeId: string): Promise<any> {
    return this.collegeModel.findByIdAndDelete(collegeId).exec();
  }
  async updateName(
    collegeId: string,
    newName: string,
  ): Promise<College | null> {
    return this.collegeModel
      .findByIdAndUpdate(collegeId, { name: newName }, { new: true })
      .exec();
  }
}
