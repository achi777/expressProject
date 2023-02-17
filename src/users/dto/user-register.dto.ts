import { IsEmail, IsString } from 'class-validator';

export class UserRegisterDto {
	@IsEmail({}, { message: 'Incorrect Email' })
	email: string;
	@IsString({ message: 'Password is empty' })
	password: string;
	@IsString({ message: 'Name is empty' })
	name: string;
}
