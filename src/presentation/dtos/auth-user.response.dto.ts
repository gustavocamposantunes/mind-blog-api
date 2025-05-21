export class AuthUserResponseDto {
  accessToken: string;
  user: {
    id: number;
    name: string;
    email: string;
  };
}
