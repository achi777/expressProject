import { Request, Response, NextFunction, Router } from 'express';
import 'reflect-metadata';

export interface IControllerRoute {
	path: string;
	func: (req: Request, res: Response, next: NextFunction) => void;
	method: keyof Pick<Router, 'get' | 'post' | 'delete' | 'patch' | 'put'>;
}

export type expressReturnType = Response<any, Record<string, any>>;
