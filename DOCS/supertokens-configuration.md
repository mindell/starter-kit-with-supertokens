1\. Configuration
=================

1) Install supertokens package
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

```
yarn add supertokens-node supertokens-auth-react supertokens-web-js nextjs-cors
```

Copy

2) Create configuration files
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Create a `config` folder in the app directory of your project.
-   Create an `appInfo.ts` inside the `config` folder.
-   Create a `backend.ts` inside the `config` folder.
-   Create a `frontend.ts` inside the `config` folder.

3) Create the `appInfo` configuration. 
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

To learn more about what these properties mean read [here].

Your app's name:*

![Information about the question]

This is the name of your application

API Base Path:

![Information about the question](https://supertokens.com/img/form-question.png)

SuperTokens will expose it's APIs scoped by this base API path.

Website Domain:*

![Information about the question]

This is the URL of your website.

Website Base Path:

![Information about the question]

The path where the login UI will be rendered

I am using NextJS' [API route]

Submit form

app/config/appInfo.ts

```
export const appInfo = {  // learn more about this on https://supertokens.com/docs/thirdpartyemailpassword/appinfo  appName: "<YOUR_APP_NAME>",  apiDomain: "<YOUR_API_DOMAIN>",  websiteDomain: "<YOUR_WEBSITE_DOMAIN>",  apiBasePath: "/api/auth",  websiteBasePath: "/auth"}
```

Copy

4) Create a frontend config function [#](https://supertokens.com/docs/thirdpartyemailpassword/nextjs/app-directory/init#4-create-a-frontend-config-function--pre "Direct link to heading")
------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app/config/frontend.tsx

```
import EmailPasswordReact from 'supertokens-auth-react/recipe/emailpassword'import ThirdPartyReact from 'supertokens-auth-react/recipe/thirdparty'import SessionReact from 'supertokens-auth-react/recipe/session'import { appInfo } from './appInfo'import { useRouter } from "next/navigation";import { SuperTokensConfig } from 'supertokens-auth-react/lib/build/types'const routerInfo: { router?: ReturnType<typeof useRouter>; pathName?: string } =  {};export function setRouter(  router: ReturnType<typeof useRouter>,  pathName: string,) {  routerInfo.router = router;  routerInfo.pathName = pathName;}export const frontendConfig = (): SuperTokensConfig => {  return {    appInfo,    recipeList: [      ThirdPartyReact.init({        signInAndUpFeature: {          providers: [            ThirdPartyReact.Google.init(),            ThirdPartyReact.Facebook.init(),            ThirdPartyReact.Github.init(),            ThirdPartyReact.Apple.init(),          ],        },      }),      EmailPasswordReact.init(),      SessionReact.init(),    ],    windowHandler: (original) => ({      ...original,      location: {        ...original.location,        getPathName: () => routerInfo.pathName!,        assign: (url) => routerInfo.router!.push(url.toString()),        setHref: (url) => routerInfo.router!.push(url.toString()),      },    }),  }}
```



5) Create a backend config function[#](https://supertokens.com/docs/thirdpartyemailpassword/nextjs/app-directory/init#5-create-a-backend-config-function "Direct link to heading")
----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Single app setup
-   Multi app setup

app/config/backend.ts

```
import SuperTokens from "supertokens-node";import ThirdPartyNode from "supertokens-node/recipe/thirdparty"import EmailPasswordNode from "supertokens-node/recipe/emailpassword"import SessionNode from 'supertokens-node/recipe/session'import { appInfo } from './appInfo'import { TypeInput } from "supertokens-node/types";export const backendConfig = (): TypeInput => {  return {    framework: "custom",    supertokens: {      // https://try.supertokens.com is for demo purposes. Replace this with the address of your core instance (sign up on supertokens.com), or self host a core.      connectionURI: "https://try.supertokens.com",      // apiKey: <API_KEY(if configured)>,    },    appInfo,    recipeList: [      EmailPasswordNode.init(),      ThirdPartyNode.init({        // We have provided you with development keys which you can use for testing.        // IMPORTANT: Please replace them with your own OAuth keys for production use.        signInAndUpFeature: {          providers: [{            config: {              thirdPartyId: "google",              clients: [{                clientId: "1060725074195-kmeum4crr01uirfl2op9kd5acmi9jutn.apps.googleusercontent.com",                clientSecret: "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"              }]            }          }, {            config: {              thirdPartyId: "github",              clients: [{                clientId: "467101b197249757c71f",                clientSecret: "e97051221f4b6426e8fe8d51486396703012f5bd"              }]            }          }, {            config: {              thirdPartyId: "apple",              clients: [{                clientId: "4398792-io.supertokens.example.service",                additionalConfig: {                  keyId: "7M48Y4RYDL",                  privateKey:                    "-----BEGIN PRIVATE KEY-----\nMIGTAgEAMBMGByqGSM49AgEGCCqGSM49AwEHBHkwdwIBAQQgu8gXs+XYkqXD6Ala9Sf/iJXzhbwcoG5dMh1OonpdJUmgCgYIKoZIzj0DAQehRANCAASfrvlFbFCYqn3I2zeknYXLwtH30JuOKestDbSfZYxZNMqhF/OzdZFTV0zc5u5s3eN+oCWbnvl0hM+9IW0UlkdA\n-----END PRIVATE KEY-----",                  teamId: "YWQCXGJRJL",                }              }]            }          }],        }      }),      SessionNode.init(),    ],    isInServerlessEnv: true,  }}let initialized = false;// This function is used in your APIs to make sure SuperTokens is initialisedexport function ensureSuperTokensInit() {  if (!initialized) {    SuperTokens.init(backendConfig());    initialized = true;  }}
```


`ensureSuperTokensinit` is a helper function that can be used in your API routes to make sure SuperTokens is initiailised before using any functionality exposed by the backend SDKs.

When you want to generate your own keys, please refer to the corresponding documentation to get your client ids and client secrets for each of the below providers:

GoogleGithubFacebookApple

6) Call the frontend `init` functions and wrap with `<SuperTokensWrapper>` component [#](https://supertokens.com/docs/thirdpartyemailpassword/nextjs/app-directory/init#nextjsinitlastnumber-call-the-frontend---preinit-functions-and-wrap-with---presupertokenswrapper-component--pre "Direct link to heading")
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Create a client component `/app/components/supertokensProvider.tsx`. This file will initialise SuperTokens and wrap its children with the `SuperTokensWrapper` component
-   Modify the `/app/layout.tsx` file to use the `SuperTokensProvider` component. You can learn more about this file [here](https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#root-layout-required).
-   An example of this can be found [here](https://github.com/supertokens/next.js/blob/canary/examples/with-supertokens/app/layout.tsx)

/app/components/supertokensProvider.tsx

```
'use client';import React from 'react';import { SuperTokensWrapper } from 'supertokens-auth-react';import SuperTokensReact from 'supertokens-auth-react';import { frontendConfig, setRouter } from '../config/frontend';import { usePathname, useRouter } from 'next/navigation';if (typeof window !== 'undefined') {  // we only want to call this init function on the frontend, so we check typeof window !== 'undefined'  SuperTokensReact.init(frontendConfig());}export const SuperTokensProvider: React.FC<React.PropsWithChildren<{}>> = ({  children,}) => {  setRouter(useRouter(), usePathname() || window.location.pathname);  return <SuperTokensWrapper>{children}</SuperTokensWrapper>;};
```


/app/layout.tsx

```
import './globals.css'import type { Metadata } from 'next'import { Inter } from 'next/font/google'import { SuperTokensProvider } from "./components/supertokensProvider";const inter = Inter({ subsets: ['latin'] })export const metadata: Metadata = {  title: 'Create Next App',  description: 'Generated by create next app',}export default function RootLayout({  children,}: {  children: React.ReactNode}) {  return (    <html lang="en">      <SuperTokensProvider>        <body className={inter.className}>{children}</body>      </SuperTokensProvider>    </html>  )}
```


