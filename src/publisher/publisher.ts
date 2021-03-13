import { INotificationMessage } from "./dto/notification-message.dto";
import { INotificationPublisher } from "./interface/notification-publisher.interface";

export class NotificationPublisher {
    private readonly publisher: INotificationPublisher;

    public constructor(pub: INotificationPublisher) {
        this.publisher = pub;
    }

    public async publish(msg: INotificationMessage): Promise<void> {
        if (!this.publisher) {
            throw new Error("publisher is not defined. Cannot publish message");
        }

        try {
            console.log(`trying to publish msg ${JSON.stringify(msg)}`);
            await this.publisher.publish(msg);
            console.log(`message successfully published`);
        } catch (err) {
            console.error(`failed to publish message. error: ${err}`);
        }
    }
}
