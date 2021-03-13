import AWS from "aws-sdk";
import { IDatabase } from "../interface/database.interface";
import { IWebhookData } from "../../providers/interface/webhook-data.interface";
import { SaveDataDto } from "../dto/save-data.dto";
import { v4 } from "uuid";

export class AWSDynamoDbProvider implements IDatabase {
    private readonly dynamoDb: AWS.DynamoDB.DocumentClient;

    public constructor() {
        AWS.config.update({
            region: process.env.AWS_SERVICES_REGION,
        });

        this.dynamoDb = new AWS.DynamoDB.DocumentClient({
            apiVersion: process.env.AWS_DYNAMODB_API_VERSION,
        });
    }

    public async save(data: SaveDataDto): Promise<void> {
        if (!this.dynamoDb) {
            throw Error("database connection is not defined");
        }

        data.Item["id"] = data.Item.getId();

        await this.dynamoDb.put(data).promise();
    }
}
