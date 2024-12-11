3\. Adding auth APIs
====================

We will add all the backend APIs for auth on `/api/auth`. This can be changed by setting the `apiBasePath` property in the `appInfo` object in the `appInfo.ts` file. For the rest of this page, we will assume you are using `/api/auth`.

1) Create the `app/api/auth/[[...path]]/route.ts` route[#]
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Be sure to create the `auth/[[...path]]` folder in the `app/api/` folder.
-   `route.ts` will use the `getAppDirRequestHandler` helper function exposed by `supertokens-node` which helps in calling all the APIs like sign in, sign up etc. (the full folder path should be `/app/api/auth/[[...path]]/route.ts`).
-   An example of this can be found [here].

2) Expose the SuperTokens APIs[#]
--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

To learn more about what these properties mean read [here].

Your app's name:*

![Information about the question]

This is the name of your application

API Base Path:

![Information about the question]

SuperTokens will expose it's APIs scoped by this base API path.

Website Domain:*

![Information about the question](https://supertokens.com/img/form-question.png)

This is the URL of your website.

Website Base Path:

![Information about the question]

The path where the login UI will be rendered

I am using NextJS' [API route]

Submit form

app/api/auth/[[...path]]/route.ts

```
import { getAppDirRequestHandler } from 'supertokens-node/nextjs';import { NextRequest, NextResponse } from 'next/server';import { ensureSuperTokensInit } from '../../../config/backend';ensureSuperTokensInit();const handleCall = getAppDirRequestHandler();export async function GET(request: NextRequest) {  const res = await handleCall(request);  if (!res.headers.has('Cache-Control')) {    // This is needed for production deployments with Vercel    res.headers.set(      'Cache-Control',      'no-cache, no-store, max-age=0, must-revalidate'    )  }  return res;}export async function POST(request: NextRequest) {  return handleCall(request);}export async function DELETE(request: NextRequest) {  return handleCall(request);}export async function PUT(request: NextRequest) {  return handleCall(request);}export async function PATCH(request: NextRequest) {  return handleCall(request);}export async function HEAD(request: NextRequest) {  return handleCall(request);}
```

Copy

##### note

In the snippet above we add the `Cache-Control` header to the responses for all auth APIs with the `GET` method. This is required if you are deploying your app with Vercel because API responses are automatically cached for production deployments. This results in problems because APIs such as `/session/refresh` return older session tokens resulting in infinite calls to refresh if an API returns unauthorised status. Setting the header ensures that Vercel does not cache any of the auth API responses.

3) Use the login widget[#]
------------------------------------------------------------------------------------------------------------------------------------------------------------------------

If you are now able to sign in or sign up, this means the backend setup is done correctly! If not, please feel free to ask questions on [Discord]
