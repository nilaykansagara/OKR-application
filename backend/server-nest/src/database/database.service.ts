import {Injectable} from '@nestjs/common';
import {Pool} from 'pg';

@Injectable()
export class DatabaseService {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: 'admin',
            host: 'localhost',
            database: 'okrs',
            password: 'admin',
            port: 5432,
        });
    }

    async query(query: any, params: any[] = []) {
        return this.pool.query(query, params);
    }
}
