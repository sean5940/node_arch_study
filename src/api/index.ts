import { Router } from 'express';
import metadata from './routes/metadata';

// guaranteed to get dependencies
export default () => {
    const app = Router();
    metadata(app);
    return app
}