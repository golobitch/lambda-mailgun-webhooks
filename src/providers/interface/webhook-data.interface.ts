import { INotificationMessage } from "../../publisher/dto/notification-message.dto";

export interface IWebhookData {
    getId(): string;
    getSignature(): string;
    getData(): IWebhookData;
    getPublishData(): INotificationMessage;
}
