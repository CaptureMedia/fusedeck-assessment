import Express from 'express';
import cors from 'cors';
import BetterSqlite3 from 'better-sqlite3';
import { CategoryController } from '../controller/CategoryController';
import { CategoryRepository } from '../repository/CategoryRepository';

export class Application {
    public async start(): Promise<void> {
        console.log('Start application...\n');

        // Database
        const database = new BetterSqlite3(`${__dirname}/../../db/assessment.db`);

        // Repository
        const categoryRepository = new CategoryRepository(database);

        // Web Server
        const express = Express();
        express.use(cors());
        express.use(Express.static(`${__dirname}/../../public`));

        // Controllers
        new CategoryController(categoryRepository).init(express);

        // start web server
        express.listen(4000, () => {
            console.log('\x1b[36m%s\x1b[0m', '\nYour application is ready!');
            console.log('\x1b[36m%s\x1b[0m', 'Url: http://localhost:4000/\n');
        }).on('error', (error: Error) => {
            console.error(error.stack || error.message);
        });
    }
}
