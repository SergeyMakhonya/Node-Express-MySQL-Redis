import {clearDatabase, runMigrations} from '../../../src/database';
import {expect} from 'chai';
import {postTestMethod} from '../helpers';

describe('POST /auth/signup', () => {
    it('signup 2 retries', async () => {
        const params = {
            username: 'vasya',
            password: '123456',
            passwordConfirm: '123456',
        };

        const result1 = await postTestMethod('/auth/signup', params, 200);
        const result2 = await postTestMethod('/auth/signup', params, 500);

        expect(result1.success).to.be.true;
        expect(result2.success).to.be.true;
    });

    it('signup ajv valid', async () => {
        const params = {
            username: 'vasya',
            password: '123456',
            passwordConfirm: '123456',
        };

        const result = await postTestMethod('/auth/signup', params, 200);

        expect(result.success).to.be.true;
    });

    it('signup ajv invalid v1', async () => {
        const params = {
            username: 'vasya',
            password: '123456',
        };

        const result = await postTestMethod('/auth/signup', params, 400);

        expect(result.success).to.be.true;
    });

    it('signup ajv invalid v2', async () => {
        const params = {
            username: 'vasya',
            password: 123456,
            passwordConfirm: 123456,
        };

        const result = await postTestMethod('/auth/signup', params, 400);

        expect(result.success).to.be.true;
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    before(async () => {
        await runMigrations();
    });
});
