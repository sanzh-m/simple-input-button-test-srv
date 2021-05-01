import StatusCodes from 'http-status-codes';
import { Request, Response } from 'express';
import {getName} from "../service/indexService";

/**
 * Get all users.
 *
 * @param req
 * @param res
 * @returns
 */
export async function loginUser(req: Request, res: Response): Promise<void> {
    const {name} = req.body;
    const exist = await getName(name);
    res.status(StatusCodes.OK).json({success: exist});
}