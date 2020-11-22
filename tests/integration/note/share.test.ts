import {clearDatabase, runMigrations} from '../../../src/database';
import {expect} from 'chai';
import {getTestMethod, postTestMethod} from '../helpers';

describe('POST /note/:noteId/share  "share note"', () => {
    it('401 Unauthorized', async () => {
        const result = await postTestMethod('/note/1/share', {}, 401);
        expect(result.success).to.be.true;
    });

    it('share item & check property "shared"', async () => {
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
        expect(createNoteResult.responseBody.shared).to.be.false;

        // share note
        const shareNoteResult = await postTestMethod(`/note/${noteId}/share`, {}, 200, authToken);

        expect(shareNoteResult.success).to.be.true;

        // get note
        const getNoteResult = await getTestMethod(`/note/${noteId}`, {}, 200, authToken);

        expect(getNoteResult.success).to.be.true;
        expect(getNoteResult.responseBody.shared).to.be.true;
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    before(async () => {
        await runMigrations();
    });
});
