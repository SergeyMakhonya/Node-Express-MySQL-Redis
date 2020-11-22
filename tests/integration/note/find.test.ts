import {clearDatabase, runMigrations} from '../../../src/database';
import {expect} from 'chai';
import {getTestMethod, postTestMethod} from '../helpers';

describe('GET /note  "find notes"', () => {
    it('401 Unauthorized', async () => {
        const result = await getTestMethod('/note', {}, 401);
        expect(result.success).to.be.true;
    });

    it('create & find note (authorized user)', async () => {
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

        // find notes 1
        const findNotesResult1 = await getTestMethod('/note/', {}, 200, authToken);

        expect(findNotesResult1.success).to.be.true;
        const array1 = findNotesResult1.responseBody;
        expect(Array.isArray(array1)).to.be.true;
        expect(array1.length).to.be.equal(0);

        // create note
        const createNoteResult = await postTestMethod('/note', {
            text: 'Plan to take over the world...',
        }, 200, authToken);

        expect(createNoteResult.success).to.be.true;
        const noteId = createNoteResult.responseBody.noteId;
        expect(noteId).to.not.be.NaN;
        expect(createNoteResult.responseBody.text).to.be.equal('Plan to take over the world...');

        // find notes 2
        const findNotesResult2 = await getTestMethod('/note/', {}, 200, authToken);

        expect(findNotesResult2.success).to.be.true;
        const array2 = findNotesResult2.responseBody;
        expect(Array.isArray(array2)).to.be.true;
        expect(array2.length).to.be.equal(1);
        expect(array2[0].noteId).to.be.equal(noteId);
    });

    it('create 10 notes & find notes (count = 5)', async () => {
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

        // create 10 notes
        for (let i = 0; i < 10; i++) {
            const createNoteResult = await postTestMethod('/note', {
                text: `note ${i}`,
            }, 200, authToken);

            expect(createNoteResult.success).to.be.true;
        }

        // find notes (count = 5)
        const findNotesResult = await getTestMethod('/note', {
            count: 5,
        }, 200, authToken);

        expect(findNotesResult.success).to.be.true;
        const array = findNotesResult.responseBody;
        expect(Array.isArray(array)).to.be.true;
        expect(array.length).to.be.equal(5);
    });

    it('create 4 notes & find notes (cursor = firstNoteId + 2 (3th place))', async () => {
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

        // create 4 notes
        let firstNoteId = 0;
        for (let i = 0; i < 4; i++) {
            const createNoteResult = await postTestMethod('/note', {
                text: `note ${i}`,
            }, 200, authToken);

            expect(createNoteResult.success).to.be.true;

            if (!firstNoteId) {
                firstNoteId = createNoteResult.responseBody.noteId;
            }
        }

        const cursor = firstNoteId + 2;
        const resultId = cursor + 1;

        // find notes (cursor = firstNoteId + 2)
        const findNotesResult = await getTestMethod('/note', {
            cursor,
        }, 200, authToken);

        expect(findNotesResult.success).to.be.true;
        const array = findNotesResult.responseBody;
        expect(Array.isArray(array)).to.be.true;
        expect(array.length).to.be.equal(1);                    // result count = 1
        expect(array[0].noteId).to.be.equal(resultId);
    });

    beforeEach(async () => {
        await clearDatabase();
    });

    before(async () => {
        await runMigrations();
    });
});
