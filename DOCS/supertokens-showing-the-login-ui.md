2\. Showing the Login UI
========================

1) Create the `app/auth/[[...path]]/page.tsx` page 
-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

-   Be sure to create the `auth/[[...path]]` folder in the `app` folder.
-   `page.tsx` will contain the component for showing SuperTokens UI
-   An example of this can be found [here].

2) Create the `Auth` component: 
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

app/auth/[[...path]]/page.tsx

```
'use client';import { useEffect, useState } from 'react';import { redirectToAuth } from 'supertokens-auth-react';import SuperTokens from 'supertokens-auth-react/ui';import { ThirdPartyPreBuiltUI } from 'supertokens-auth-react/recipe/thirdparty/prebuiltui';import { EmailPasswordPreBuiltUI } from 'supertokens-auth-react/recipe/emailpassword/prebuiltui';export default function Auth() {  // if the user visits a page that is not handled by us (like /auth/random), then we redirect them back to the auth page.  const [loaded, setLoaded] = useState(false);  useEffect(() => {    if (      SuperTokens.canHandleRoute([ThirdPartyPreBuiltUI, EmailPasswordPreBuiltUI]) === false    ) {      redirectToAuth({ redirectBack: false });    } else {      setLoaded(true);    }  }, []);  if (loaded) {    return SuperTokens.getRoutingComponent([ThirdPartyPreBuiltUI, EmailPasswordPreBuiltUI]);  }  return null;}
```

Copy

3) Visit `/auth` page on your website
-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

If you see a login UI, then you have successfully completed this step! You can also see all designs of our pre built UI, for each page on [this link].

If you cannot see the UI in your app, please feel free to ask questions on [Discord]
