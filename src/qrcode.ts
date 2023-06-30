
import * as QRCode from "qrcode"
import { generateFile } from "./generateFile";

export enum QRENUM {
    UNIQUE = "UNIQUE",
    JOUR = "JOUR",
    SEMAINE = "SEMAINE",
    MOIS = "MOIS"
}

export type InfoQR = {
    useremail: string;
    busid?: number;
    qrType: QRENUM;
    key: string;
}

export const generateQRCode = async (
    info: InfoQR
): Promise<{ url?: string; error?: string }> => {
    const uri = await new Promise((resolve: (value: string) => void, reject) => {
        const infoQr = JSON.stringify(info);
        QRCode.toDataURL(infoQr, function (err: Error, base64: string) {
            resolve(base64)
            reject(err)
        })
    })
    if (typeof uri === "string") {
        const qrcode = await generateFile({
            key: new Date().toString(),
            body: uri,
            type: "png"
        })
        return { url: qrcode }
    }
    return { error: "failed to create QRCode" }
}
