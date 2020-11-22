import {clearDatabase, runMigrations} from '../../../src/database';
import {expect} from 'chai';
import {postTestMethod} from '../helpers';

describe('POST /note  "create note"', () => {
    it('401 Unauthorized', async () => {
        const result = await postTestMethod('/note', {}, 401);
        expect(result.success).to.be.true;
    });

    it('create note (authorized user)', async () => {
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

        // create note
        const createNoteResult = await postTestMethod('/note', {
            text: 'Plan to take over the world...',
        }, 200, authToken);

        expect(createNoteResult.success).to.be.true;
        const noteId = createNoteResult.responseBody.noteId;
        expect(noteId).to.not.be.NaN;
        expect(createNoteResult.responseBody.text).to.be.equal('Plan to take over the world...');
    });

    it('attempting to create a note larger than 1000 characters', async () => {
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

        const array: string[] = [];

        for (let i = 0; i < 1001; i++) {
            array.push('A');
        }

        const text = array.join('');

        // create note
        const createNoteResult = await postTestMethod('/note', {
            text,
        }, 400, authToken);

        expect(createNoteResult.success).to.be.true;
    });

    it('attempting to create a note less ot equal than 1000 characters', async () => {
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

        const array: string[] = [];

        for (let i = 0; i < 1000; i++) {
            array.push('A');
        }

        const text = array.join('');

        // create note
        const createNoteResult = await postTestMethod('/note', {
            text,
        }, 200, authToken);

        expect(createNoteResult.success).to.be.true;
    });

    it('attempting to create a note with empty text', async () => {
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

        // create note
        const createNoteResult = await postTestMethod('/note', {
            text: '',
        }, 400, authToken);

        expect(createNoteResult.success).to.be.true;
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    before(async () => {
        await runMigrations();
    });
});
