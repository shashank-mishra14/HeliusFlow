import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class DatabaseService {
  private pools = new Map<string, Pool>();

  async createConnection(userId: string, config: DatabaseConfig) {
    const pool = new Pool({
      host: config.host,
      port: config.port,
      user: config.user,
      password: config.password,
      database: config.database,
      max: 20,
      idleTimeoutMillis: 30000,
    });

    try {
      await pool.query('SELECT 1');
      this.pools.set(userId, pool);
    } catch (error) {
      throw new DatabaseConnectionError(error.message);
    }
  }

  getConnection(userId: string): Pool {
    const pool = this.pools.get(userId);
    if (!pool) throw new NoDatabaseConnectionError();
    return pool;
  }