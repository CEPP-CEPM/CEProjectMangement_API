import { ApiProperty } from '@nestjs/swagger';

export class JwtToken {
    @ApiProperty()
    accessToken: string;
}