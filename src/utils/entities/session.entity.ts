import { ApiProperty } from "@nestjs/swagger";
import BaseEntity from "./_base.entity";
import SportEntity from "./sport.entity";
import UserEntity from "./user.entity";


export default class SessionEntity extends BaseEntity {

    @ApiProperty()
    sessionId : number

    @ApiProperty()
    title: string 

    @ApiProperty()
    description: string

    @ApiProperty()
    sessionDate: Date

    @ApiProperty()
    placesRemaining: number

    @ApiProperty()
    placesAvailable: number

    @ApiProperty()
    isFull: boolean

    @ApiProperty({ type: () => [SportEntity] })
    sport: SportEntity

    @ApiProperty()
    sportId: number

    @ApiProperty({ type: () => [UserEntity], required: false })
    users?: UserEntity[]; 

    @ApiProperty()
    userId?: number

    @ApiProperty()
    latitude?: number

    @ApiProperty()
    longitude?: number
}