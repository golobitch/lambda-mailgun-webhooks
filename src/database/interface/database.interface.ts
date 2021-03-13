import { SaveDataDto } from "../dto/save-data.dto";

export interface IDatabase {
    save(data: SaveDataDto): Promise<void>;
}
