import {clearDatabase, runMigrations} from '../../../src/database';
import {expect} from 'chai';
import {getTestMethod, postTestMethod} from '../helpers';

describe('GET /note/:noteId  "get note"', () => {
    it('401 Unauthorized', async () => {
        const result = await getTestMethod('/note/1', {}, 401);
        expect(result.success).to.be.true;
    });

    it('create & get note (authorized user)', async () => {
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

        // get note
        const getNoteResult = await getTestMethod(`/note/${noteId}`, {}, 200, authToken);

        expect(getNoteResult.success).to.be.true;
        expect(getNoteResult.responseBody.noteId).to.be.equal(noteId);
    });

    it('get someone else\`s note', async () => {
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

        //-------------

        // signup vasya
        const signupResult2 = await postTestMethod('/auth/signup', {
            username: 'petya',
            password: '121212',
            passwordConfirm: '121212',
        }, 200);

        expect(signupResult2.success).to.be.true;

        // signin petya
        const signinResult2 = await postTestMethod('/auth/signin', {
            username: 'petya',
            password: '121212',
        }, 200);

        expect(signinResult2.success).to.be.true;
        const authToken2: string = signinResult2.responseBody.token;

        // get vasya`s note
        const getNoteResult = await getTestMethod(`/note/${noteId}`, {}, 404, authToken2); // 404 - The user does not need to know that there is such an item

        expect(getNoteResult.success).to.be.true;
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    before(async () => {
        await runMigrations();
    });
});
