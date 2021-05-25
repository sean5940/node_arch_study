import { Router, Request, Response } from 'express';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import Container from 'typedi';


const route = Router();

export default (app: Router) => {
    app.use('/', route);

    route.post('/metadata', celebrate({
        body: Joi.object({
            url: Joi.string().required()
        }),
    }),
    async (req: Request, res: Response) => {
        const logger:Logger = Container.get('logger');
        return res.json({"url" : req.body}).status(200);
    });
    
    route.get('/metadatas', (req: Request, res: Response) => {
        return res.json({ "status": "ok" }).status(200);
    })
};
