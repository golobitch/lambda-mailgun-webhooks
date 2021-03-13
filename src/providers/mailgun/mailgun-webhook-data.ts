import { EventDataDto, IEventData } from "./dto/event-data.dto";

import { INotificationMessage } from "../../publisher/dto/notification-message.dto";
import { IWebhookData } from "../interface/webhook-data.interface";
import { ProviderEnum } from "../enum/provider.enum";
import { SignatureDto } from "./dto/signature.dto";

export class MailgunWebhookData implements IWebhookData {
    private eventData: EventDataDto;
    private signature: SignatureDto;

    public constructor(data: Record<string, unknown>) {
        if (!("event-data" in data)) {
            throw new Error("cannot parse mailgun webhook data. event-data does not exists in payload");
        }
        if (!("signature" in data)) {
            throw new Error("cannot parse mailgun webhook data. signature does not exists in payload");
        }
        this.eventData = new EventDataDto(data["event-data"] as IEventData);
        this.signature = new SignatureDto(data["signature"] as SignatureDto);
    }

    public getPublishData(): INotificationMessage {
        return {
            Provider: ProviderEnum.MAILGUN.charAt(0).toUpperCase() + ProviderEnum.MAILGUN.slice(1),
            timestamp: new Date(this.eventData.timestamp).getTime(),
            type: this.eventData.event,
        };
    }

    public getData(): IWebhookData {
        return new MailgunWebhookData({
            "event-data": this.eventData,
            signature: this.signature,
        });
    }

    public getId(): string {
        return this.eventData.id;
    }

    public getSignature(): string {
        return this.signature.signature;
    }
}
