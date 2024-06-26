import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Department } from '../schemas/department.schema';

@Injectable()
export class DepartmentService {
  constructor(
    @InjectModel(Department.name) private departmentModel: Model<Department>,
  ) {}

  async findAll(): Promise<Department[]> {
    return this.departmentModel.find().exec();
  }

  async findByName(name: string): Promise<Department[]> {
    return this.departmentModel.find({ name }).exec();
  }

  async findByCollegeId(collegeId: string): Promise<Department[]> {
    return this.departmentModel.find({ collegeId }).exec();
  }

  async create(createDepartmentDto: {
    name: string;
    collegeId: string;
  }): Promise<Department> {
    const createdDepartment = new this.departmentModel(createDepartmentDto);
    return createdDepartment.save();
  }

  async delete(departmentId: string): Promise<any> {
    return this.departmentModel.findByIdAndDelete(departmentId).exec();
  }

  async deleteByCollege(collegeId: string): Promise<any> {
    return this.departmentModel.deleteMany({ collegeId }).exec();
  }
  async update(
    departmentId: string,
    newName: string,
    newCollegeId: string,
  ): Promise<Department | null> {
    const updateFields: any = {};
    if (newName) updateFields.name = newName;
    if (newCollegeId) updateFields.collegeId = newCollegeId;
    return this.departmentModel
      .findByIdAndUpdate(departmentId, updateFields, { new: true })
      .exec();
  }
}
