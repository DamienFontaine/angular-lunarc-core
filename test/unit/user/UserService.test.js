describe('lunarc.user.UserService', function() {

  beforeEach(module('lunarc.user'));

  var UserService, $httpBackend;

  beforeEach(inject(function($injector, _$httpBackend_) {
    UserService = $injector.get('UserService');
    $httpBackend = _$httpBackend_;
  }));

  afterEach(function() {
     $httpBackend.verifyNoOutstandingExpectation();
     $httpBackend.verifyNoOutstandingRequest();
   });

  it('should return a user', function() {
    var url = '/user/1';
    var response = {
      "Id": "55f06ff71d41c85de4000001",
      "Username": "dfontaine",
      "Firstname": "Damien",
      "Lastname": "Fontaine",
      "Password": "password",
      "Salt": "salt",
      "Email": "damien.fontaine@lineolia.net"
    };
    $httpBackend.when('GET', url).respond(response);
    $httpBackend.expectGET(url);
    var user = UserService.get({
      Id: '1'
    });
    $httpBackend.flush();
    expect(user.Id).toBe(response.Id);
  });
});
