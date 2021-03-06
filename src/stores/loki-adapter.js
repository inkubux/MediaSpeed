import MongoQS from 'mongo-querystring';
export default class LokiAdapter {
    constructor(logger, db, collectionName) {
        this.logger = logger;
        this.db = db;
        this.collectionName = collectionName;
    }

    async find(query) {
        const qs = new MongoQS({ blacklist: { limit: true, sortBy: true, sortType: true } });
        const actualQuery = qs.parse(query);
        this.logger.debug(`Finding ${this.collectionName} by ${JSON.stringify(actualQuery)}`);
        let result = this.db
            .getCollection(this.collectionName)
            .chain()
            .find(actualQuery);

        if (query.sortBy) {
            const isDescending = query.sortType === 'desc';
            result = result.simplesort(query.sortBy, isDescending);
        }

        if (query.limit) {
            result = result.limit(10);
        }

        return result.data();
    }

    async get(uid) {
        return this.db.getCollection(this.collectionName).by('uid', uid);
    }

    async create(data) {
        this.logger.debug(`Creating new ${this.collectionName} ${data.uid}`);
        return this.db.getCollection(this.collectionName).insert(data);
    }

    async update(uid, data) {
        const doc = await this.get(uid);
        this.logger.debug(`Updated ${this.collectionName} ${uid}`);
        const merged = { ...doc, ...data };

        return this.db.getCollection(this.collectionName).update(merged);
    }

    async remove(uid) {
        const doc = await this.get(uid);
        this.logger.debug(`Removing ${this.collectionName} ${uid}`);
        return this.db.getCollection(this.collectionName).remove(doc);
    }
}
