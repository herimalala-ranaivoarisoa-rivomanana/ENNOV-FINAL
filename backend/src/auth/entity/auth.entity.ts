import { ApiProperty } from '@nestjs/swagger';

export class AuthEntity {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  user: {
    id: number;
    email: string;
    name: string;
  };
}
