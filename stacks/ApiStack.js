import { Api, Cognito } from "sst/constructs";

export function API({ stack }) {

  const auth = new Cognito(stack, "Auth", {
    login: ["email", "username"],
  });

  const api = new Api(stack, "Api", {
    authorizers: {
      jwt: {
        type: "user_pool",
        userPool: {
          id: auth.userPoolId,
          clientIds: [auth.userPoolClientId],
        },
      },
    },
    defaults: {
      authorizer: "jwt",
      function: {
        environment: {
          DATABASE_URL: process.env.DATABASE_URL,
      },
    },
  },
    
    routes: {
      "GET /chats": {
        function: "packages/functions/src/getChats.main",
        authorizer: "none",
      },
      "POST /chats": "packages/functions/src/createChat.main",
      "PUT /chats/{id}": "packages/functions/src/updateChat.main",
      "DELETE /chats/{id}": "packages/functions/src/deleteChat.main",
      "GET /chats/{id}/messages": "packages/functions/src/messages/getMessages.main",
      "POST /chats/{id}/messages": "packages/functions/src/messages/createMessage.main",
      "PUT /chats/{id}/messages/{messageId}": "packages/functions/src/messages/updateMessage.main",
      "DELETE /chats/{id}/messages/{messageId}": "packages/functions/src/messages/deleteMessage.main",
    },
  });

  // Allow authenticated users invoke API
  auth.attachPermissionsForAuthUsers(stack, [api]);

  stack.addOutputs({
    ApiEndpoint: api.url,
    UserPoolId: auth.userPoolId,
    IdentityPoolId: auth.cognitoIdentityPoolId ?? "",
    UserPoolClientId: auth.userPoolClientId,
  });

  return {api, auth};
}
