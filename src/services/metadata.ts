import { Service, Inject } from "typedi";
import urlMetadata from "url-metadata";
import { EventDispatcher, EventDispatcherInterface } from "../decorators/eventDispatcher";
import { IMetadata } from "../interfaces/IMetadata";
import { global } from "../types/express"
import events from "../subscribers/events";

@Service()
export default class MetadataService {
    constructor(
        @Inject('metadataModel') private metadataModel: global.Models.MetadataModel,
        @Inject('logger') private logger,
        @EventDispatcher() private eventDispatcher: EventDispatcherInterface,
    ) { }

    public async save(url: string): Promise<{ metadata: IMetadata }> {
        try {
            this.logger.silly('parsing url');

            const urlData = await urlMetadata(url);
            const metadataRecord = await this.metadataModel.findOneAndUpdate({ url: url }, {
                title: urlData.title,
                description: urlData.description,
                publisher: urlData["og:site_name"],
                image: urlData.image,
            }, {
                new: true,
                upsert: true
            });

            if (!metadataRecord) {
                throw new Error('metadata cannot be created');
            }

            const metadata = metadataRecord.toObject();

            this.eventDispatcher.dispatch(events.metadata.save, { metadataRecord });

            return { metadata };
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }

    public async load(): Promise<{ metadatas: IMetadata[] }> {
        try {
            this.logger.silly('load metadatas');
            const metadatasRecords = await this.metadataModel.find({});

            const metadatas = metadatasRecords.map(data => data.toObject());

            return { metadatas };
        } catch (e) {
            this.logger.error(e);
            throw e;
        }
    }
}