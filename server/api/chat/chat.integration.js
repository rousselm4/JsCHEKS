'use strict';

var app = require('../..');
import request from 'supertest';

describe('Chat API:', function() {

  describe('GET /api/chats', function() {
    var chats;

    beforeEach(function(done) {
      request(app)
        .get('/api/chats')
        .expect(200)
        .expect('Content-Type', /json/)
        .end((err, res) => {
          if (err) {
            return done(err);
          }
          chats = res.body;
          done();
        });
    });

    it('should respond with JSON array', function() {
      chats.should.be.instanceOf(Array);
    });

  });

});
