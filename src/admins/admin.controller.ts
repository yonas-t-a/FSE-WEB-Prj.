import { Controller, Get, Post, Body } from '@nestjs/common';
import { AdminService } from './admin.service';

@Controller('admins')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get()
  async findAll() {
    return this.adminService.findAll();
  }

  @Post()
  async create(@Body() createAdminDto: any) {
    return this.adminService.create(createAdminDto);
  }

  @Post('signin')
  async signIn(@Body() signInAdminDto: any) {
    return this.adminService.signIn(signInAdminDto);
  }
}
