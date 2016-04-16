'use strict';

var proxyquire = require('proxyquire').noPreserveCache();

var chatCtrlStub = {
  index: 'chatCtrl.index'
};

var routerStub = {
  get: sinon.spy()
};

// require the index with our stubbed out modules
var chatIndex = proxyquire('./index.js', {
  'express': {
    Router: function() {
      return routerStub;
    }
  },
  './chat.controller': chatCtrlStub
});

describe('Chat API Router:', function() {

  it('should return an express router instance', function() {
    chatIndex.should.equal(routerStub);
  });

  describe('GET /api/chats', function() {

    it('should route to chat.controller.index', function() {
      routerStub.get
        .withArgs('/', 'chatCtrl.index')
        .should.have.been.calledOnce;
    });

  });

});
