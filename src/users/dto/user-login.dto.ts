import { IsEmail, IsString } from 'class-validator';
export class UserLoginDto {
	email: string;
	password: string;
}
