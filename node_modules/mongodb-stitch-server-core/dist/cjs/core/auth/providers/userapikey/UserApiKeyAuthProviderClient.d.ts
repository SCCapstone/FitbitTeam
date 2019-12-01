import BSON from "bson";
import { UserApiKey } from "mongodb-stitch-core-sdk";
import AuthProviderClientFactory from "../internal/AuthProviderClientFactory";
export interface UserApiKeyAuthProviderClient {
    createApiKey(name: string): Promise<UserApiKey>;
    fetchApiKey(keyId: BSON.ObjectID): Promise<UserApiKey>;
    fetchApiKeys(): Promise<UserApiKey[]>;
    deleteApiKey(keyId: BSON.ObjectID): Promise<void>;
    enableApiKey(keyId: BSON.ObjectID): Promise<void>;
    disableApiKey(keyId: BSON.ObjectID): Promise<void>;
}
export declare namespace UserApiKeyAuthProviderClient {
    const factory: AuthProviderClientFactory<UserApiKeyAuthProviderClient>;
}
