
import * as fs from "fs";
import * as path from "path";
import { v4 as uuid } from "uuid";

type FileType = {
    key: string;
    body: string;
    type: string;
};

export const generateFile = ({ key, body, type }: FileType): Promise<string> => {
    const uniqueKey = uuid();
    const buffer = Buffer.from(
        body
            .replace(/^data:image\/\w+;base64,/, "")
            .replace(/^data:application\/\w+;base64,/, "")
            .replace(/^data:video\/\w+;base64,/, ""),
        "base64"
    );
    const filePath = path.join(__dirname, `../uploads/${uniqueKey}.${type}`);
    return new Promise<string>((resolve, reject) => {

        fs.writeFile(filePath, buffer, "base64", (err) => {
            if (err) {
                console.log("err: ", err);
                reject(err);
            } else {
                console.log(`/upload/${uniqueKey}.${type}`)
                resolve(`/upload/${uniqueKey}.${type}`);
            }
        });
    });
};

export const deleteFile = (url: string): Promise<boolean> => {
    const arrayString = url.split("/");
    const file = arrayString[arrayString.length - 1];
    const type = arrayString[arrayString.length - 2];
    return new Promise<boolean>((resolve, reject) => {
        const link = path.join(__dirname, `../uploads/${file}`)
        fs.unlink(link, (err) => {
            if (err) {
                console.log("err: ", err);
                reject(false);
            } else {
                resolve(true);
            }
        });
    });
};