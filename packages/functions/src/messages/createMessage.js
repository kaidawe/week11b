import {createMessage } from '@Week11b/core/src/database'

export async function main(event) {
    const sub = event.requestContext.authorizer?.jwt.claims.sub;
    const username = event.requestContext.authorizer?.jwt.claims.username;

    const id = event.pathParameters.id;
    const {content} = JSON.parse(event.body);
    const message = await createMessage(id, sub, username, content);

    return {
        statusCode: 200,
        body: JSON.stringify({
        message
        }),
    };
    }