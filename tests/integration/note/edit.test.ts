import {clearDatabase, runMigrations} from '../../../src/database';
import {expect} from 'chai';
import {postTestMethod, putTestMethod} from '../helpers';

describe('PUT /note/:noteId  "update note"', () => {
    it('401 Unauthorized', async () => {
        const result = await putTestMethod('/note/1', {}, 401);
        expect(result.success).to.be.true;
    });

    it('create & edit note (authorized user)', async () => {
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

        // edit note
        const editNoteResult = await putTestMethod(`/note/${noteId}`, {
            text: 'Shopping list...',
        }, 200, authToken);

        expect(editNoteResult.success).to.be.true;
        const noteId2 = createNoteResult.responseBody.noteId;
        expect(noteId2).to.be.equal(noteId);
        expect(editNoteResult.responseBody.text).to.be.equal('Shopping list...');
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    before(async () => {
        await runMigrations();
    });
});
