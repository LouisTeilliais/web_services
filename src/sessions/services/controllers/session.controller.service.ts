import {Injectable} from '@nestjs/common';
import SessionRepositoryService from '../repositories/session.repository';
import SessionEntity from 'src/utils/entities/session.entity';
import {SessionDto} from 'src/sessions/models/session.dto';
import MailService from '../../../mailer/mail.service';

@Injectable()
export default class SessionControllerService {
  constructor(
    private readonly sessionRepositoryService: SessionRepositoryService,
    private readonly mailService: MailService,
  ) {}


  /**
   * Get all session
   * @param title title
   * @param longitude longitude
   * @param latitude latitude 
   * @param distance distance
   * @returns 
   */
  async getAllSession(
    title?: SessionEntity['title'],
    longitude?: number,
    latitude?: number,
    distance?: string,
  ) {
    const distanceNumber = distance ? parseInt(distance, 10) : undefined;
    return await this.sessionRepositoryService.findMany(
      title,
      longitude,
      latitude,
      distanceNumber,
    );
  }


  /**
   * Get session by id
   * @param sessionId sessionId
   * @returns 
   */
  async getSessionById(
    sessionId: SessionEntity['sessionId'],
  ): Promise<SessionEntity> {
    return await this.sessionRepositoryService.findById(sessionId);
  }

  /** 
    * Create a session
    * @param sessionDto sessionDto
    * @param userId userId
    * @returns
  */
  async createSession(
    sessionDto: SessionDto,
    userId: number,
  ): Promise<SessionEntity> {
    return this.sessionRepositoryService.createSession({
      title: sessionDto.title,
      description: sessionDto.description,
      sessionDate: sessionDto.sessionDate,
      placesRemaining: sessionDto.placesRemaining,
      placesAvailable: sessionDto.placesAvailable,
      sportId: sessionDto.sportId,
      userId: userId,
      latitude: sessionDto.latitude,
      longitude: sessionDto.longitude,
    });
  }


  /**
   * @param sessionId sessionId
   * @param sessionDto sessionDto
   * @returns 
   */
  async updateSession(
    sessionId: SessionEntity['sessionId'],
    sessionDto: SessionDto,
  ): Promise<SessionEntity> {
    return this.sessionRepositoryService.updateSession(sessionId, {
      title: sessionDto.title,
      description: sessionDto.description,
      sessionDate: sessionDto.sessionDate,
      placesRemaining: sessionDto.placesRemaining,
      placesAvailable: sessionDto.placesAvailable,
      sportId: sessionDto.sportId,
    });
  }


  /**
   * Delete a session
   * @param sessionId sessionId
   * @returns 
   */
  async deleteSession(sessionId: SessionEntity['sessionId']) {
    return this.sessionRepositoryService.deleteSession(sessionId);
  }

  /**
   * Add user to session
   * @param sessionId sessionId
   * @param userId userId
   * @returns 
   */
  async addUserToSession(
    sessionId: SessionEntity['sessionId'],
    userId: SessionEntity['userId'],
  ) {
    await this.sessionRepositoryService.addUserToSession(sessionId, userId);

    const session = await this.sessionRepositoryService.findById(sessionId);
    const user = session.users.find((user) => user.userId === userId);

    if (!user) {
      throw new Error('User not found');
    }

    const formattedDate = `${session.sessionDate.getDate()}:${session.sessionDate.getMonth() + 1}:${session.sessionDate.getFullYear()}:${session.sessionDate.getHours()}:${session.sessionDate.getMinutes()}`;

    await this.mailService.sendMail(
      'no-reply@gmail.com',
      user.email,
      "Confimation d'inscription à une session",
      `Votre session ${session.title.toUpperCase()} à été confirmée <br> 
            Date : ${formattedDate} <br>
            Description : ${session.description} <br>
            Sport : ${session.sport.name} <br>
            `,
    );
  }

  /**
   * Leave a session
   * @param sessionId sessionId
   * @param userId userId
  */
  async leaveSession(
    sessionId: SessionEntity['sessionId'],
    userId: SessionEntity['userId'],
  ) {
    return this.sessionRepositoryService.leaveSession(sessionId, userId);
  }
}
