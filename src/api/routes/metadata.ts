import { Router, Request, Response } from 'express';
const route = Router();

export default (app: Router) => {
    app.use('/', route);

    route.post('/metadata', (req: Request, res: Response) => {
        return res.json({ "status": "ok" }).status(200);
    });

    route.get('/metadatas', (req: Request, res: Response) => {
        return res.json({ "status": "ok" }).status(200);
    })
};
