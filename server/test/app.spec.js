const supertest = require('supertest');
const app = require('../src/app');
const songs = require('../songData.json');

describe('App', () => {
  it('GET /songs responds with 200 and all songs', () => {
    return supertest(app)
      .get('/songs')
      .expect(200, songs);
  });
});

