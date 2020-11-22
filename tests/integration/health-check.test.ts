import {expect} from 'chai';
import {getTestMethod} from './helpers';

describe('GET /health-check', () => {
    it('server is availabled', async () => {
        const result = await getTestMethod('/health-check', {}, 200);
        expect(result.success).to.be.true;
        expect(result.responseBody.status).to.be.equal('availabled');
    });
});
