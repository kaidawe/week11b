import { updateChat } from "@Week11b/core/src/database";

export async function main(event) {
    const id = event.pathParameters.id;
    const name = JSON.parse(event.body).name;
    const updated = await updateChat(id, name);
    return {
        statusCode: 200,
        body: JSON.stringify({
        updated
        }),
    };
    }