import { IWebhookData } from "./interface/webhook-data.interface";
import { MailgunWebhookData } from "./mailgun/mailgun-webhook-data";
import { ProviderEnum } from "./enum/provider.enum";

export class ProviderDataFactory {
    private static dataProviders = {
        [ProviderEnum.MAILGUN]: (data: Record<string, unknown>) => new MailgunWebhookData(data),
    };
    public static Create(provider: ProviderEnum, data: Record<string, unknown>): IWebhookData {
        return ProviderDataFactory.dataProviders[provider](data);
    }
}
