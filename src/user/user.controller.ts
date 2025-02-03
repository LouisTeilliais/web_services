import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from './user.model';

@Controller('users')
export class UserController {
  @Get()
  async findAll(): Promise<any[]> {
    return [];
  }

  @Get(':id')
  findOneById(@Param('id') id: string): string {
    console.log(id);
    return `This action returns a #${id} user`;
  }

  @Post(':id')
  create(@Body() user: User): string {
    return 'One user by id';
  }
  @Put(':id')
  UpdateOneById(@Param('id') id: string, @Body() user: User): string {
    return `This action updates a #${id} user`;
  }

  @Delete(':id')
  deleteOneById(@Param('id') id: string): string {
    return `This action removes a #${id} user`;
  }
}
