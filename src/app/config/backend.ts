import SuperTokens from "supertokens-node";
// import ThirdPartyNode from "supertokens-node/recipe/thirdparty"
import EmailPasswordNode from "supertokens-node/recipe/emailpassword"
import SessionNode from 'supertokens-node/recipe/session'
import { appInfo } from './appInfo'
import { TypeInput } from "supertokens-node/types";

export const backendConfig = (): TypeInput => {
    return {
        framework: "custom",
        supertokens: {
            connectionURI: process.env.ST_CONNECTION_URI!,
        },
        appInfo,
        recipeList: [
            EmailPasswordNode.init(),
            /*
            ThirdPartyNode.init({
                signInAndUpFeature: {
                    providers: [
                        {
                        config: {
                            thirdPartyId: "google",
                            clients: [{
                                clientId: process.env.GOOGLE_CLIENT_ID!,
                                clientSecret: process.env.GOOGLE_CLIENT_SECRET!
                            }]
                        }
                       }
                ],
                }
            }),
            */
            SessionNode.init(),
        ],
        isInServerlessEnv: true,
    }
}

let initialized = false;

export function ensureSuperTokensInit() {
    if (!initialized) {
        SuperTokens.init(backendConfig());
        initialized = true;
    }
}
