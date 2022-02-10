import express from 'express';
import { CategoryRepository } from '../repository/CategoryRepository';

export class CategoryController {
    protected categoryRepository: CategoryRepository;

    public constructor(categoryRepository: CategoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public init(express: express.Express): void {
        console.log('init UserControllerController');

        express.get('/category', this.showAll.bind(this));
    }

    public async showAll(_request: express.Request, response: express.Response): Promise<void> {
        const categories = await this.categoryRepository.findAll();
        response.json({ categories });
    }
}
