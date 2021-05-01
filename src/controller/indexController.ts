import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';

/**
 * Get all users.
 *
 * @param req
 * @param res
 * @returns
 */
export async function loginUser(req: Request, res: Response): Promise<void> {
    res.status(StatusCodes.OK).json({message: 'hi'});
}