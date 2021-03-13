import * as crypto from "crypto";

import { ISignatureDto } from "./dto/signature.dto";
import { IVerifySignature } from "../interface/verify-signature.interface";
import { IWebhookData } from "../interface/webhook-data.interface";

export class MailgunSignatureVerification implements IVerifySignature {
    public verify(data: IWebhookData): boolean {
        const signatureObj: ISignatureDto = data.getData()["signature"] as ISignatureDto;

        return (
            data.getSignature() ===
            crypto
                .createHmac("sha256", process.env.MAILGUN_WEBHOOK_API_KEY)
                .update(signatureObj["timestamp"].concat(signatureObj["token"]))
                .digest("hex")
        );
    }
}
