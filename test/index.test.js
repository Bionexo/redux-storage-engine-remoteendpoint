import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import nock from 'nock';
import createEngine from '../src/';

chai.use(chaiAsPromised);
const expect = chai.expect;

describe('engine', () => {
  describe('#load', () => {
    context('when the request go well', () => {
      it('should fetch store from remote', () => {
        nock('http://test.localhost')
          .get('/some/url.json')
          .reply(200, { store: { test: 'store' } });

        const engine = createEngine('http://test.localhost/some/url.json', 'whatever');
        return expect(engine.load()).to.eventually.eql({ test: 'store' });
      });
    });

    context('when the request returns an error', () => {
      it('should reject if the remote returns an error code', () => {
        nock('http://test.localhost')
          .get('/some/url.json')
          .reply(500);

        const engine = createEngine('http://test.localhost/some/url.json', 'whatever');
        return expect(engine.load()).to.eventually.be.rejectedWith('Internal Server Error');
      });
    });
  });

  describe('#save', () => {
    context('when the request go well', () => {
      it('should save sending a post to the post url with the store', () => {
        nock('http://test.localhost', {
          reqheaders: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).post('/some/pretty/url', JSON.stringify({ store: { test: 'store' } }))
        .reply(200, { some: 'potato' });

        const engine = createEngine('http://test.localhost/some/pretty/url', 'http://test.localhost/some/pretty/url');
        return expect(engine.save({ test: 'store' })).to.eventually.have.property('status').eq(200);
      });
    });

    context('when the request returns an error', () => {
      it('should reject if the remote returns an error code', () => {
        nock('http://test.localhost', {
          reqheaders: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        }).post('/some/other/pretty/url', JSON.stringify({ store: { test: 'store' } }))
        .reply(500);

        const engine = createEngine('http://test.localhost/some/other/pretty/url', 'http://test.localhost/some/other/pretty/url');
        return expect(engine.save({ test: 'store' })).to.eventually.be.rejectedWith('Internal Server Error');
      });
    });
  });
});
