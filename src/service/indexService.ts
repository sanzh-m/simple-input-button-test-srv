import {dbConn} from "@server";

export const getName = async (name: string): Promise<boolean> => {
    return await dbConn.oneOrNone({
        name: 'find-name',
        text: 'SELECT * FROM users WHERE name = $1',
        values: [name]
    }) != null;
}