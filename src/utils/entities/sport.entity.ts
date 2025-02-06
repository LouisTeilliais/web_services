import { ApiProperty } from "@nestjs/swagger";
import BaseEntity from "./_base.entity";
import SessionEntity from "./session.entity";


export default class SportEntity extends BaseEntity {

    @ApiProperty()
    sportId : number

    @ApiProperty()
    name: string 

    @ApiProperty({ type: () => [SessionEntity] })
    sessions?: SessionEntity[]; 
}