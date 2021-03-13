import { IVerifySignature } from "./interface/verify-signature.interface";
import { MailgunSignatureVerification } from "./mailgun/mailgun-signature-verification";
import { ProviderEnum } from "./enum/provider.enum";

export class SignatureVerificationFactory {
    private static readonly providers = {
        [ProviderEnum.MAILGUN]: () => new MailgunSignatureVerification(),
    };

    public static Create(provider: ProviderEnum): IVerifySignature {
        return SignatureVerificationFactory.providers[provider]();
    }
}
