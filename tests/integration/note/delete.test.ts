import {clearDatabase, runMigrations} from '../../../src/database';
import {expect} from 'chai';
import {deleteTestMethod, postTestMethod} from '../helpers';

describe('DELETE /note/:noteId  "delete note"', () => {
    it('401 Unauthorized', async () => {
        const result = await deleteTestMethod('/note/1', {}, 401);
        expect(result.success).to.be.true;
    });

    it('create & delete note (authorized user)', async () => {
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

        // delete note
        const deleteNoteResult = await deleteTestMethod(`/note/${noteId}`, {}, 200, authToken);

        expect(deleteNoteResult.success).to.be.true;
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    before(async () => {
        await runMigrations();
    });
});
