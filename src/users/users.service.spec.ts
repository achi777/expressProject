import 'reflect-metadata';
import { UserModel } from '@prisma/client';
import { Container } from 'inversify';
import { IConfigService } from '../config/config.service.interface';
import { TYPES } from '../types';
import { User } from './user.entity';
import { IUsersRepository } from './users.repository.interface';
import { UserService } from './users.service';
import { IUserService } from './users.service.interface';

const configServiceMock: IConfigService = {
	get: jest.fn(),
};
const usersRepositoryMoc: IUsersRepository = {
	find: jest.fn(),
	create: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let userService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(configServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(usersRepositoryMoc);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	userService = container.get<IUserService>(TYPES.UserService);
});

describe('User Service', () => {
	it('createUser', async () => {
		configService.get = jest.fn().mockReturnValueOnce(1);
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
			}),
		);

		const createdUser = await userService.createUser({
			email: 'asd@asd.com',
			name: 'archilai',
			password: '123',
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual('1');
	});
});
