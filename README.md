# Simple LinkedIn OAuth 2.0 Project

Simple weekend project to use [LinkedIn Autherization](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/context) for SSO. This uses the 3 legged OAuth.

It uses NodeJS and Express to set up both the webserver and backend server.

The backend server which handles the operations to get the `access_token` from LinkedIn and then serve the webserver with user data for whoever logged in.

## Environmental variables

You need to set up an `.env` file with the following details:

```
CLIENT_ID='Your Client ID'
CLIENT_SECRET='Your Client Secret'
CALLBACK_URL='Your Callback URL'
```

Details are given on the [LinkedIn Documentation](https://docs.microsoft.com/en-us/linkedin/shared/authentication/authorization-code-flow?context=linkedin/context#step-1-configure-your-application) on how to get each of these variables.

### Start your backend server

You can run the following to start your server.

```
npm run start
```

### Start your WebServer

You can run the following to start your webserver.

```
npm run serve
```

Once it is up and running, you can visit `localhost:8080` and click the link to login using LinkedIn.
