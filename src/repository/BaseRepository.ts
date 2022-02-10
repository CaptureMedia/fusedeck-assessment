import BetterSqlite3 from 'better-sqlite3';
import { BaseEntity } from '../entity/BaseEntity';

export abstract class BaseRepository<T extends BaseEntity> {
    protected database: BetterSqlite3.Database;
    protected tableName: string;

    public constructor(database: BetterSqlite3.Database) {
        this.database = database;
        this.tableName = this.getTableName();
    }

    public abstract getTableName(): string;

    public async findById(id: number): Promise<T|null> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *
                FROM ${this.tableName}
                WHERE id = ?
            `;

            try {
                const result = this.database.prepare(query).get(id);
                if (!result) {
                    resolve(null);
                    return;
                }
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    public async findAll(): Promise<T[]> {
        return new Promise((resolve, reject) => {
            const query = `
                SELECT *
                FROM ${this.tableName}
            `;

            try {
                const result = this.database.prepare(query).all();
                if (!result) {
                    resolve([]);
                    return;
                }
                resolve(result);
            } catch (err) {
                reject(err);
            }
        });
    }

    public async insert(entity: T): Promise<T> {
        return new Promise((resolve, reject) => {
            let query = `
                INSERT INTO ${this.tableName} ${this.entityToInsertString(entity)} VALUES ${this.entityToInsertString(entity, true)}
            `;

            try {
                const result = this.database.prepare(query).run(Object.values(entity));
                entity.id = result.lastInsertRowid as number;
                resolve(entity);
            } catch (err) {
                reject(err);
            }
        });
    }

    public async update(entity: T): Promise<T> {
        return new Promise((resolve, reject) => {
            let query = `
                UPDATE ${this.tableName} SET ${this.entityToUpdateString(entity)} WHERE id = ${entity.id}
            `;

            try {
                this.database.prepare(query).run(Object.values(entity));

                resolve(entity);
            } catch (err) {
                reject(err);
            }
        });
    }

    public async delete(entity: T): Promise<void> {
        return new Promise((resolve, reject) => {
            const query = `
                DELETE
                FROM ${this.tableName}
                WHERE id = ?
            `;

            try {
                this.database.prepare(query).run(entity.id);
                resolve();
            } catch (err) {
                reject(err);
            } 
        });
    }

    private entityToInsertString(entity: BaseEntity, useValues = false): string
    {
        let fields = '(';
        let fieldsArr = [];

        if (useValues) {
            fieldsArr = Object.values(entity);
        } else {
            fieldsArr = Object.keys(entity);
        }

        const lastIndex = fieldsArr.length - 1;
        fieldsArr.forEach((value, index) => {
            if (useValues) {
                fields += '?';
            } else {
                fields += `${value}`;
            }
            if (index !== lastIndex) {
                fields += ',';
            }
        });
        fields += ')';
        return fields; 
    }

    private entityToUpdateString(entity: BaseEntity): string
    {
        let fields = '';
        const fieldsArr = Object.keys(entity); 
        const lastIndex = fieldsArr.length - 1;
        fieldsArr.forEach((value, index) => {
            fields += `${value} = ?`;
            if (index !== lastIndex) {
                fields += ',';
            }
        });
        return fields;
    }
}
