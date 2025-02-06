import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
  UseGuards,
  Query,
  Req,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import SessionControllerService from '../services/controllers/session.controller.service';
import { SessionDto } from '../models/session.dto';
import { AuthGuard } from '../../auth/guard/auth.guard';
import { Roles } from '../../auth/roles.decorator';
import { RoleGuard } from '../../auth/guard/role.guard';

@ApiTags('Sessions')
@Controller('sessions')
@UseGuards(AuthGuard, RoleGuard)
export default class SessionController {
  constructor(
    private readonly sessionControllerService: SessionControllerService,
  ) {}

  @Get()
  async getAllSessions(
    @Query('title') title?: string,
    @Query('longitude') longitude?: number,
    @Query('latitude') latitude?: number,
    @Query('distance') distance?: string,
  ) {
    return this.sessionControllerService.getAllSession(
      title,
      longitude,
      latitude,
      distance,
    );
  }

  @Get(':sessionId')
  @Roles('coach')
  async getSessionById(@Param('sessionId', ParseIntPipe) sessionId: number) {
    return this.sessionControllerService.getSessionById(sessionId);
  }

  @Post()
  @Roles('coach')
  async createSession(@Body() sessionDto: SessionDto, @Req() req) {
    const userId = req.user.userId;
    return this.sessionControllerService.createSession(sessionDto, userId);
  }

  @Put(':sessionId')
  @Roles('coach')
  async updateSession(
    @Body() sessionDto: SessionDto,
    @Param('sessionId', ParseIntPipe) sessionId: number,
  ) {
    return this.sessionControllerService.updateSession(sessionId, sessionDto);
  }

  @Delete(':sessionId')
  @Roles('coach')
  async deleteSession(@Param('sessionId', ParseIntPipe) sessionId: number) {
    return this.sessionControllerService.deleteSession(sessionId);
  }

  @Post(':sessionId/joinSession')
  @Roles('user')
  async addUserToSession(
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.sessionControllerService.addUserToSession(sessionId, userId);
  }

  @Post(':sessionId/leaveSession')
  @Roles('user')
  async leaveSession(
    @Param('sessionId', ParseIntPipe) sessionId: number,
    @Body('userId', ParseIntPipe) userId: number,
  ) {
    return this.sessionControllerService.leaveSession(sessionId, userId);
  }
}
