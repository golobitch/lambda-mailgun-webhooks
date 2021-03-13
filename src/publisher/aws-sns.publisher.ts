import AWS from "aws-sdk";
import { INotificationMessage } from "./dto/notification-message.dto";
import { INotificationPublisher } from "./interface/notification-publisher.interface";

export class AWSSNSPublisher implements INotificationPublisher {
    private readonly sns: AWS.SNS;

    public constructor() {
        AWS.config.update({
            region: process.env.AWS_SERVICES_REGION,
        });

        this.sns = new AWS.SNS({
            apiVersion: process.env.AWS_SNS_API_VERSION,
        });
    }

    public async publish(message: INotificationMessage): Promise<void> {
        const params = {
            TopicArn: process.env.AWS_SNS_TOPIC,
            Message: JSON.stringify(message),
        };

        await this.sns.publish(params).promise();
    }
}
