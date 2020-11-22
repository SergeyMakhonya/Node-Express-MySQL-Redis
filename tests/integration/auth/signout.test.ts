import {clearDatabase, runMigrations} from '../../../src/database';
import {expect} from 'chai';
import {postTestMethod} from '../helpers';

describe('POST /auth/signout', () => {
    it('401 Unauthorized', async () => {
        const result = await postTestMethod('/auth/signout', {}, 401);
        expect(result.success).to.be.true;
    });
    
    it('signup & signin & signout', async () => {
        // signup vasya
        const signupResult = await postTestMethod('/auth/signup', {
            username: 'vasya',
            password: '123456',
            passwordConfirm: '123456',
        }, 200);

        expect(signupResult.success).to.be.true;

        // signin vasya
        const signinResult = await postTestMethod('/auth/signin', {
            username: 'vasya',
            password: '123456',
        }, 200);

        expect(signinResult.success).to.be.true;
        const authToken: string = signinResult.responseBody.token;

        // signout vasya
        const signoutResult = await postTestMethod('/auth/signout', {}, 200, authToken);

        expect(signoutResult.success).to.be.true;
    });

    it('reset sessions', async () => {
        // signup vasya
        const signupResult = await postTestMethod('/auth/signup', {
            username: 'vasya',
            password: '123456',
            passwordConfirm: '123456',
        }, 200);

        expect(signupResult.success).to.be.true;

        // signin (vasya1)
        const signinResult1 = await postTestMethod('/auth/signin', {
            username: 'vasya',
            password: '123456',
        }, 200);

        expect(signinResult1.success).to.be.true;
        const authToken1: string = signinResult1.responseBody.token;

        // signin (vasya2)
        const signinResult2 = await postTestMethod('/auth/signin', {
            username: 'vasya',
            password: '123456',
        }, 200);

        expect(signinResult2.success).to.be.true;
        const authToken2: string = signinResult2.responseBody.token;

        // signout (vasya1)
        const signoutResult = await postTestMethod('/auth/signout', {}, 200, authToken1);

        expect(signoutResult.success).to.be.true;

        // trying to create a note (vasya2)
        const createNoteResult = await postTestMethod('/note', {
            text: 'Plan to take over the world...',
        }, 401, authToken2);

        expect(createNoteResult.success).to.be.true;
    });

    it('attempting to create a note with a invalid token', async () => {
        // signup vasya
        const signupResult = await postTestMethod('/auth/signup', {
            username: 'vasya',
            password: '123456',
            passwordConfirm: '123456',
        }, 200);

        expect(signupResult.success).to.be.true;

        // signin vasya
        const signinResult = await postTestMethod('/auth/signin', {
            username: 'vasya',
            password: '123456',
        }, 200);

        expect(signinResult.success).to.be.true;
        const authToken: string = signinResult.responseBody.token;

        // trying to create a note
        const createNoteResult1 = await postTestMethod('/note', {
            text: 'Plan to take over the world...',
        }, 200, authToken);

        expect(createNoteResult1.success).to.be.true;

        // signout vasya
        const signoutResult = await postTestMethod('/auth/signout', {}, 200, authToken);

        expect(signoutResult.success).to.be.true;

        // trying to create a note
        const createNoteResult2 = await postTestMethod('/note', {
            text: 'Plan to take over the world...',
        }, 401, authToken);

        expect(createNoteResult2.success).to.be.true;
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    before(async () => {
        await runMigrations();
    });
});
