'use strict';

describe('Service: ChaoticSystem', function () {

  // load the service's module
  beforeEach(module('kekchoseIoApp'));

  // instantiate service
  var ChaoticSystem;
  beforeEach(inject(function (_ChaoticSystem_) {
    ChaoticSystem = _ChaoticSystem_;
  }));

  it('should do something', function () {
    expect(!!ChaoticSystem).toBe(true);
  });

});
