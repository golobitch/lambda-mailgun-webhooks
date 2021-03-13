import { IWebhookData } from "../../providers/interface/webhook-data.interface";

export class SaveDataDto {
    public TableName: string;
    public Item: IWebhookData;
}
