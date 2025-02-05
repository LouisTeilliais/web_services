import { ApiProperty } from "@nestjs/swagger";
import SessionEntity from "./session.entity";

export default class UserEntity {
  @ApiProperty()
  userId: number;

  @ApiProperty()
  name: string;

  @ApiProperty()
  email: string;

  @ApiProperty({ type: () => [SessionEntity] })
  sessions: SessionEntity[]; 
  
}
