import {createChat } from '@Week11b/core/src/database'

export async function main(event) {

    const sub = event.requestContext.authorizer?.jwt.claims.sub;
    const username = event.requestContext.authorizer?.jwt.claims.username;

    const {name} = JSON.parse(event.body);
    const chat = await createChat(name, sub, username);

    return {
        statusCode: 200,
        body: JSON.stringify({
        chat
        }),
    };
    }