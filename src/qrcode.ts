
import QRCode from "qrcode"
import { generateFile } from "./generateFile";

enum QRENUM {
    UNIQUE = "0",
    JOUR = "1",
    SEMAINE = "7",
    MOIS = "31"
}

export type InfoQR = {
    busId: number;
    qrType: QRENUM
}

export const generateQRCode = async (
    url: string
): Promise<{ url?: string; error?: string }> => {
    const uri = await new Promise((resolve: (value: string) => void, reject) => {
        QRCode.toDataURL(url, function (err: Error, base64: string) {
            resolve(base64)
            reject(err)
        })
    })
    if (typeof uri === "string") {
        const qrcode = await generateFile({
            key: new Date().toString(),
            body: uri,
            type: "image/png"
        })
        return { url: qrcode }
    }
    return { error: "failed to create QRCode" }
}
