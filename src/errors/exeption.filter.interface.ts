import { Request, Response, NextFunction } from 'express';
import 'reflect-metadata';

export interface IExeptionFilter {
	catch: (err: Error, req: Request, res: Response, next: NextFunction) => void;
}
