import { AWSSNSPublisher } from "./aws-sns.publisher";
import { INotificationPublisher } from "./interface/notification-publisher.interface";
import { NotificationPublisherEnum } from "./enum/notification-publisher.enum";

export class NotificationPublisherFactory {
    private static readonly publishers = {
        [NotificationPublisherEnum.SNS]: new AWSSNSPublisher(),
    };

    public static Create(publisher: NotificationPublisherEnum): INotificationPublisher {
        return NotificationPublisherFactory.publishers[publisher];
    }
}
