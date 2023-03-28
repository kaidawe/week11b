import { updateMessage } from "@Week11b/core/src/database";

export async function main(event) {
    const sub = event.requestContext.authorizer?.jwt.claims.sub;
    const content = JSON.parse(event.body).content;
    const id = event.pathParameters.id;
    const updated = await updateMessage(id, sub, content);
    return {
        statusCode: 200,
        body: JSON.stringify({
        updated
        }),
    };
    }