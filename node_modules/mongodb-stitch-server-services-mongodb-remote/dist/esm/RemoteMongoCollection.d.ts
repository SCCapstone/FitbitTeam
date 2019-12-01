import { Codec, Stream } from "mongodb-stitch-core-sdk";
import { ChangeEvent, CompactChangeEvent, RemoteCountOptions, RemoteDeleteResult, RemoteFindOneAndModifyOptions, RemoteFindOptions, RemoteInsertManyResult, RemoteInsertOneResult, RemoteUpdateOptions, RemoteUpdateResult } from "mongodb-stitch-core-services-mongodb-remote";
import RemoteMongoReadOperation from "./RemoteMongoReadOperation";
export default interface RemoteMongoCollection<DocumentT> {
    readonly namespace: string;
    withCollectionType<U>(codec: Codec<U>): RemoteMongoCollection<U>;
    count(query?: object, options?: RemoteCountOptions): Promise<number>;
    find(query?: object, options?: RemoteFindOptions): RemoteMongoReadOperation<DocumentT>;
    findOne(query?: object, options?: RemoteFindOptions): Promise<DocumentT | null>;
    findOneAndUpdate(query: object, update: object, options?: RemoteFindOneAndModifyOptions): Promise<DocumentT | null>;
    findOneAndReplace(query: object, replacement: object, options?: RemoteFindOneAndModifyOptions): Promise<DocumentT | null>;
    findOneAndDelete(query: object, options?: RemoteFindOneAndModifyOptions): Promise<DocumentT | null>;
    aggregate(pipeline: object[]): RemoteMongoReadOperation<DocumentT>;
    insertOne(document: DocumentT): Promise<RemoteInsertOneResult>;
    insertMany(documents: DocumentT[]): Promise<RemoteInsertManyResult>;
    deleteOne(query: object): Promise<RemoteDeleteResult>;
    deleteMany(query: object): Promise<RemoteDeleteResult>;
    updateOne(query: object, update: object, updateOptions?: RemoteUpdateOptions): Promise<RemoteUpdateResult>;
    updateMany(query: object, update: object, updateOptions?: RemoteUpdateOptions): Promise<RemoteUpdateResult>;
    watch(arg?: any[] | object | undefined): Promise<Stream<ChangeEvent<DocumentT>>>;
    watchCompact(ids: any[]): Promise<Stream<CompactChangeEvent<DocumentT>>>;
}
