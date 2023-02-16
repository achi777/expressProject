import { Request, Response, NextFunction } from 'express';
import { inject, injectable } from 'inversify';
import { BaseController } from '../common/base.controller';
import { HTTPError } from '../errors/http-error';
import { ILogger } from '../logger/logger.interface';
import { TYPES } from '../types';
import 'reflect-metadata';
import { IUserController } from './users.controller.interface';

@injectable()
export class UserController extends BaseController implements IUserController {
	constructor(@inject(TYPES.ILogger) private loggerService: ILogger) {
		super(loggerService);
		this.bindRoutes([
			{ path: '/register', method: 'post', func: this.register },
			{ path: '/login', method: 'post', func: this.login },
		]);
	}
	register(req: Request, res: Response, next: NextFunction): void {
		this.ok(res, 'Register');
	}
	login(req: Request, res: Response, next: NextFunction): void {
		console.log('mamukia');
		next(new HTTPError(401, 'Unauthorized user', 'Login'));
	}
}
