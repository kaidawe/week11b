import { deleteMessage } from "@Week11b/core/src/database";

export async function main(event) {
    const sub = event.requestContext.authorizer?.jwt.claims.sub;
    const username = event.requestContext.authorizer?.jwt.claims.username;

    const id = event.pathParameters.id;
    const deleted = await deleteMessage(id, sub);

    
    return {
        statusCode: 200,
        body: JSON.stringify({
        deleted
        }),
    };
    }