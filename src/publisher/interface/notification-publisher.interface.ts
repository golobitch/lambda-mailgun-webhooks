import { INotificationMessage } from "../dto/notification-message.dto";

export interface INotificationPublisher {
    publish(message: INotificationMessage): Promise<void>;
}
