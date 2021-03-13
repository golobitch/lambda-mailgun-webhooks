import { AWSDynamoDbProvider } from "./provider/aws-dynamodb.provider";
import { DatabaseEnum } from "./enum/database.enum";
import { IDatabase } from "./interface/database.interface";

export class DatabaseFactory {
    private static databases = {
        [DatabaseEnum.DYNAMO_DB]: () => new AWSDynamoDbProvider(),
    };
    public static Create(db: DatabaseEnum): IDatabase {
        return DatabaseFactory.databases[db]();
    }
}
