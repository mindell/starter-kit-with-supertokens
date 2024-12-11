Adding a session guard to each API route
========================================

##### CAUTION

This guide only applies to scenarios which involve SuperTokens Session Access Tokens.

If you are implementing either, [Unified Login] or [Microservice Authentication], features that make use of OAuth2 Access Tokens, please check the [separate page] that shows you how to verify those types of tokens.

##### note

This is applicable for when the frontend calls an API in the `/app/api` folder.

For this guide, we will assume that we want an API `/api/user GET` which returns the current session information.

Create a new file `/app/api/user/route.ts`

-   An example of this is [here].

app/api/user/route.ts

```
import { withSession } from "supertokens-node/nextjs";import { NextResponse, NextRequest } from "next/server";import { ensureSuperTokensInit } from '../../config/backend';ensureSuperTokensInit();export function GET(request: NextRequest) {  return withSession(request, async (err, session) => {      if (err) {          return NextResponse.json(err, { status: 500 });      }      if (!session) {          return new NextResponse("Authentication required", { status: 401 });      }      return NextResponse.json({          note: "Fetch any data from your application for authenticated user after using verifySession middleware",          userId: session.getUserId(),          sessionHandle: session.getHandle(),          accessTokenPayload: session.getAccessTokenPayload(),      });  });}
```

Copy

In the above snippet we are creating a `GET` handler for the `/api/user` route. We call the `withSession` helper function. The function will pass the session object in the callback which we then use to read user information. If a session does not exist `undefined` will be passed intead.

The `withSession` guard will return:

-   Status `401` if the session does not exist or has expired
-   Stauts `403` if the session claims fail their validation. For example if email verification is required but the user's email is not verified.
