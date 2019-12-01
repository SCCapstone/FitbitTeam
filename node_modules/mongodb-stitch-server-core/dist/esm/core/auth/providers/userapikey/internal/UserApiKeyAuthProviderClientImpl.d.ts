import BSON from "bson";
import { CoreUserApiKeyAuthProviderClient, StitchAuthRequestClient, StitchAuthRoutes, UserApiKey } from "mongodb-stitch-core-sdk";
import { UserApiKeyAuthProviderClient } from "../UserApiKeyAuthProviderClient";
export default class UserApiKeyAuthProviderClientImpl extends CoreUserApiKeyAuthProviderClient implements UserApiKeyAuthProviderClient {
    constructor(requestClient: StitchAuthRequestClient, routes: StitchAuthRoutes);
    createApiKey(name: string): Promise<UserApiKey>;
    fetchApiKey(keyId: BSON.ObjectID): Promise<UserApiKey>;
    fetchApiKeys(): Promise<UserApiKey[]>;
    deleteApiKey(keyId: BSON.ObjectID): Promise<void>;
    enableApiKey(keyId: BSON.ObjectID): Promise<void>;
    disableApiKey(keyId: BSON.ObjectID): Promise<void>;
}
