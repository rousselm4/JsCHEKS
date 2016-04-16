'use strict';

describe('Service: AESEncrypter', function () {

  // load the service's module
  beforeEach(module('kekchoseIoApp'));

  // instantiate service
  var AESEncrypter;
  beforeEach(inject(function (_AESEncrypter_) {
    AESEncrypter = _AESEncrypter_;
  }));

  it('should do something', function () {
    expect(!!AESEncrypter).toBe(true);
  });

});
