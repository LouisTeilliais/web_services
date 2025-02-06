import { ApiProperty } from '@nestjs/swagger'

/**
 * BaseEntity
 */
export default abstract class BaseEntity {
    /**
     * CreatedAt
     */
    @ApiProperty()
    createdAt!: Date

    /** UpdatedAt */
    @ApiProperty()
    updatedAt!: Date
}
