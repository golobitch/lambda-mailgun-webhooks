export interface INotificationMessage {
    Provider: string;
    timestamp: number;
    type: string;
}

export class NotificationMessageDto implements INotificationMessage {
    public Provider: string;
    public timestamp: number;
    public type: string;

    public constructor(data: INotificationMessage) {
        this.Provider = data.Provider;
        this.timestamp = data.timestamp;
        this.type = data.type;
    }
}
