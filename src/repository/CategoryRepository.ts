import { Category } from "../entity/Category";
import { BaseRepository } from "./BaseRepository";

export class CategoryRepository extends BaseRepository<Category> {
    public getTableName(): string {
        return 'category';
    }
}
