import {Request, Response, Router} from 'express';
import {loginUser} from "../controller/indexController";

const wrapper = (fn: (req: Request, res: Response) => Promise<void>): (res: Request, req: Response)
    => void => {
    return (req: Request, res: Response): void => {
        fn(req, res).catch((err: unknown) => res.status(400).json({message: err}));
    }
};
// User-route
export const rootRouter = Router();
rootRouter.post('/login', wrapper(loginUser));
