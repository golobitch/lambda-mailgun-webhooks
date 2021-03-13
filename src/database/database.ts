import { IDatabase } from "./interface/database.interface";
import { SaveDataDto } from "./dto/save-data.dto";

export class Database {
    private readonly database: IDatabase;
    public constructor(db: IDatabase) {
        this.database = db;
    }

    public async save(data: SaveDataDto): Promise<void> {
        if (!this.database) {
            console.error("database is not defined. cannot save data to db");
            return;
        }

        try {
            console.log(`trying to save data to database: ${JSON.stringify(data)}`);
            await this.database.save(data);
            console.log(`database save returned`);
        } catch (err) {
            console.error(`error occurred while trying to save data to db. error: ${err}`);
        }
    }
}
