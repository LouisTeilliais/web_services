import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.entity';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOneById(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} user`;
  }

  @Put(':id')
  UpdateOneById(@Param('id') id: string, @Body() user: User): string {
    return `This action updates a #${id} ${user}`;
  }

  @Delete(':id')
  deleteOneById(@Param('id') id: string): string {
    return `This action removes a #${id} user`;
  }
}
