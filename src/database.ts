import mysql, { Connection, MysqlError, PoolConnection } from 'mysql';
import {config} from './config';
import path from 'path';
import migration from 'mysql-migration-promise';
import {Id} from './base-types';

const connectionConfig = {
    connectionLimit : 10,
    host: config.dbHost,
    user: config.dbUser,
    password: config.dbPassword,
    database: config.dbDatabase,
    multipleStatements: true,
};

export async function clearDatabase() {
    await query(`
        DELETE FROM shared_item;
        DELETE FROM note;
        DELETE FROM user;
    `);
}

export async function runMigrations() {
    const migrationsPath = path.resolve(__dirname, '../migrations');
    const connection = mysql.createConnection(connectionConfig);

    try {
        let migrationService = await migration.init(connection, migrationsPath);
        await migrationService.migrate();
    } catch (error) {
        console.error('Unable to start database: ', error);
    }
}

const pool = mysql.createPool(connectionConfig);

export async function query<T>(sql: string, values: any[] = [], db?: Connection) {
    const connection = db ?? pool;
    
    return new Promise<T[]>((resolve, reject) => {
        connection.query(sql, values, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result as T[]);
            }
        });
    });
}

export interface OkPacket {
    insertId: Id;
    affectedRows: number;
}

export async function queryOkPacket<T>(sql: string, values: any[] = [], db: Connection) {
    return new Promise<OkPacket>((resolve, reject) => {
        db.query(sql, values, (error, result) => {
            if (error) {
                reject(error);
            } else {
                resolve(result);
            }
        });
    });
}

async function getConnection(): Promise<PoolConnection> {
    return new Promise<PoolConnection>((resolve, reject) => {
        pool.getConnection((error: MysqlError, connection: PoolConnection) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(connection);
        });
    });
}

async function startTransaction(connection: Connection): Promise<Connection> {
    return new Promise<Connection>((resolve, reject) => {
        connection.beginTransaction((error: MysqlError) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(connection);
        });
    });
}

async function commitTransaction(connection: Connection): Promise<Connection> {
    return new Promise<Connection>((resolve, reject) => {
        connection.commit((error: MysqlError) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(connection);
        });
    });
}

async function rollbackTransaction(connection: Connection): Promise<Connection> {
    return new Promise<Connection>((resolve, reject) => {
        connection.rollback((error: MysqlError) => {
            if (error) {
                reject(error);
                return;
            }
            resolve(connection);
        });
    });
}

export function createTransactionFunc<In extends any[], Out>(worker: (db: Connection, ...inParams: In) => Promise<Out>) : (...inParams: In) => Promise<Out> {
    return async (...inParams: In): Promise<Out> => {
        const db: PoolConnection = await getConnection();

        try {
            await startTransaction(db);
            const result = await worker(db, ...inParams);
            await commitTransaction(db);
            return result;
        }
        catch (error) {
            await rollbackTransaction(db);
            throw error;
        }
        finally {
            db.release();
        }
    };
}