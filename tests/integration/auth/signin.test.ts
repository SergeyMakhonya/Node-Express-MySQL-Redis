import {clearDatabase, runMigrations} from '../../../src/database';
import {expect} from 'chai';
import {postTestMethod} from '../helpers';

describe('POST /auth/signin', () => {
    it('successful signin', async () => {
        const params = {
            username: 'vasya',
            password: '123456',
            passwordConfirm: '123456',
        };

        const signupResult = await postTestMethod('/auth/signup', params, 200);
        expect(signupResult.success).to.be.true;

        delete params.passwordConfirm;
        
        const signinResult = await postTestMethod('/auth/signin', params, 200);
        expect(signinResult.success).to.be.true;
        expect(signinResult.responseBody).to.have.property('token');
    });

    it('failed signin', async () => {
        const signinResult = await postTestMethod('/auth/signin', {
            username: 'petya',
            password: '121212',
        }, 500);
        expect(signinResult.success).to.be.true;
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    before(async () => {
        await runMigrations();
    });
});
