import { Router, Request, Response } from 'express';
import Container from 'typedi';
import { celebrate, Joi } from 'celebrate';
import { Logger } from 'winston';
import MetadataService from '../../services/metadata';


const route = Router();

export default (app: Router) => {
    app.use('/', route);

    route.post('/metadata', celebrate({
        body: Joi.object({
            url: Joi.string().min(8).required()
        }),
    }), async (req: Request, res: Response) => {
        const logger: Logger = Container.get('logger');

        try {
            const metaDataService = Container.get(MetadataService);
            const { metadata } = await metaDataService.save(req.body.url as string);
            return res.status(200).json(metadata);
        } catch (e) {
            logger.error('🔥 error: %o', e);
        }
    });

    route.get('/metadatas', async (req: Request, res: Response) => {
        const logger: Logger = Container.get('logger');

        try {
            const metaDataService = Container.get(MetadataService);
            const { metadatas } = await metaDataService.load();
            return res.status(200).json(metadatas);
        } catch (e) {
            logger.error('🔥 error: %o', e);
        }
    })
};
