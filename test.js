const should = require('should');
const MongoDriver = require('./index');

describe('Test 1', () => {
    it('Test case 1', (done) => {
        (1 + 1).should.equal(2);
        done();
    });
});