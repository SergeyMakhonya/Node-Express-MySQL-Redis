import {clearDatabase, runMigrations} from '../../../src/database';
import {expect} from 'chai';
import {getTestMethod, postTestMethod} from '../helpers';

describe('GET /shared/1', () => {
    it('share item & get item by hash', async () => {
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

        // share note
        const shareNoteResult = await postTestMethod(`/note/${noteId}/share`, {}, 200, authToken);

        expect(shareNoteResult.success).to.be.true;
        expect(shareNoteResult.responseBody).to.have.property('hash');
        const hash = shareNoteResult.responseBody.hash;

        // get note by hash (without token)
        const getSharedResult = await getTestMethod(`/shared/${hash}`, {}, 200);

        expect(getSharedResult.success).to.be.true;
        expect(getSharedResult.responseBody).to.have.property('itemType');
        expect(getSharedResult.responseBody).to.have.property('data');
        expect(getSharedResult.responseBody.itemType).to.be.equal('note');
        expect(getSharedResult.responseBody.data.noteId).to.be.equal(noteId);
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    before(async () => {
        await runMigrations();
    });
});
