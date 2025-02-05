import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsNotEmpty, IsNumber, IsString } from "class-validator";


export class SessionDto {

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    title: string

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    description: string

    @ApiProperty()
    @IsDate()
    @IsNotEmpty()
    sessionDate: Date

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    placesRemaining: number

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    placesAvailable: number

    @ApiProperty()
    @IsNotEmpty()
    isFull: boolean

    @ApiProperty()
    @IsNotEmpty()
    sportId: number
}