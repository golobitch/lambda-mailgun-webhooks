import { IVerifySignature } from "./interface/verify-signature.interface";
import { IWebhookData } from "./interface/webhook-data.interface";

export class SignatureVerificator {
    private readonly verificator: IVerifySignature;
    public constructor(verificator: IVerifySignature) {
        this.verificator = verificator;
    }

    public verify(verify: IWebhookData): boolean {
        if (!this.verificator) {
            throw new Error("verificator is undefined. cannot verify signature");
        }

        console.log("trying to verify the signature");
        const isSignatureVerified = this.verificator.verify(verify);
        console.log(`signature verification completed. result: ${isSignatureVerified}`);
        return isSignatureVerified;
    }
}
