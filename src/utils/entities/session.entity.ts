import { ApiProperty } from "@nestjs/swagger";
import BaseEntity from "./_base.entity";


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
}