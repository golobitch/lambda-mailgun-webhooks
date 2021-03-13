import { IWebhookData } from "./webhook-data.interface";
export interface IVerifySignature {
    verify(data: IWebhookData): boolean;
}
