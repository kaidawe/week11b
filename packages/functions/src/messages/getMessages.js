import { getMessages } from "@Week11b/core/src/database";

export async function main(event) {
    const id = event.pathParameters.id;
    console.table({id});

    const messages = await getMessages(id);
    return {
        statusCode: 200,
        body: JSON.stringify({
        messages: messages
    }),
    };
    }