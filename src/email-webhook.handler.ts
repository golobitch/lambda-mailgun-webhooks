import { Database } from "./database/database";
import { DatabaseEnum } from "./database/enum/database.enum";
import { DatabaseFactory } from "./database/database.factory";
import { IWebhookData } from "./providers/interface/webhook-data.interface";
import { NotificationPublisher } from "./publisher/publisher";
import { NotificationPublisherEnum } from "./publisher/enum/notification-publisher.enum";
import { NotificationPublisherFactory } from "./publisher/notification-publisher.factory";
import { ProviderDataFactory } from "./providers/provider-data.factory";
import { ProviderEnum } from "./providers/enum/provider.enum";
import { SignatureVerificationFactory } from "./providers/signature-verification.factory";
import { SignatureVerificator } from "./providers/signature-verificator";

interface IEmailWebhookHandler {
    provider: ProviderEnum;
    database: DatabaseEnum;
    notificationPublisher: NotificationPublisherEnum;
}

export class EmailWebhookHandler {
    private readonly opts: IEmailWebhookHandler;
    private readonly data: IWebhookData;

    public constructor(payload: Record<string, unknown>, opts: IEmailWebhookHandler) {
        this.opts = opts;
        this.data = ProviderDataFactory.Create(opts.provider, payload);
    }

    public async handle(): Promise<boolean> {
        const signatureVerificator = SignatureVerificationFactory.Create(this.opts.provider);
        const verification = new SignatureVerificator(signatureVerificator);
        try {
            if (!verification.verify(this.data)) {
                console.error("request was not verified");
                return false;
            }
            //save raw data to storage
            const pub = NotificationPublisherFactory.Create(this.opts.notificationPublisher);
            const dbProvider = DatabaseFactory.Create(this.opts.database);

            const publisher = new NotificationPublisher(pub);
            const database = new Database(dbProvider);

            await Promise.all([
                database.save({
                    TableName: "raw-email-payload",
                    Item: this.data.getData(),
                }),

                publisher.publish(this.data.getPublishData()),
            ]);
        } catch (err) {
            console.error(`got error while trying to handle data. error: ${err}`);
            return false;
        }

        return true;
    }
}
