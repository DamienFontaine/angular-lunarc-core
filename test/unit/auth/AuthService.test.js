describe('lunarc.auth.AuthService', function() {

  beforeEach(module('lunarc.auth'));

  var store = {};
  var $rootScope, AuthService;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    AuthService = $injector.get('AuthService');

    // LocalStorage mock.
    spyOn(localStorage, 'getItem').and.callFake(function(key) {
      return store[key];
    });
    Object.defineProperty(sessionStorage, "setItem", {
      writable: true
    });
    spyOn(localStorage, 'setItem').and.callFake(function(key, value) {
      store[key] = value;
    });
  }));

  it('should store a token', function() {
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0NDc3NjUzOTEsImV4cCI6MTYwNTUzMTc5MSwiYXVkIjoid3d3LmxpbmVvbGlhLm5ldCIsInN1YiI6ImRhbWllbi5mb250YWluZUBsaW5lb2xpYS5uZXQiLCJpZCI6IjEiLCJ1c2VybmFtZSI6ImRmb250YWluZSIsImVtYWlsIjoiZGFtaWVuLmZvbnRhaW5lQGxpbmVvbGlhLm5ldCJ9.DZEMdX7mhnbHqu_C7jnxMT4nly8zNGvfEYDERltmHeo';
    AuthService.storeToken(token);
    expect(store['id_token']).toBe(token);
    expect(AuthService.user).toEqual(jasmine.objectContaining({
      id: '1',
      username: 'dfontaine',
      email: 'damien.fontaine@lineolia.net'
    }));
  });

  it('should be authenticated', function() {
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0NDc3NjUzOTEsImV4cCI6MTYwNTUzMTc5MSwiYXVkIjoid3d3LmxpbmVvbGlhLm5ldCIsInN1YiI6ImRhbWllbi5mb250YWluZUBsaW5lb2xpYS5uZXQiLCJpZCI6IjEiLCJ1c2VybmFtZSI6ImRmb250YWluZSIsImVtYWlsIjoiZGFtaWVuLmZvbnRhaW5lQGxpbmVvbGlhLm5ldCJ9.DZEMdX7mhnbHqu_C7jnxMT4nly8zNGvfEYDERltmHeo';
    localStorage.setItem('id_token', token);
    expect(AuthService.isAuthenticated()).toBe(true);
    expect(AuthService.user).toEqual(jasmine.objectContaining({
      id: '1',
      username: 'dfontaine',
      email: 'damien.fontaine@lineolia.net'
    }));
  });

  it('shouldn\'t be authenticated', function() {
    expect(AuthService.isAuthenticated()).toBe(false);
    expect(AuthService.user).toBe(null);
  });

  it('shouldn\'t be authenticated, token is expired', function() {
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0MTYyMzYwMDUsImV4cCI6MTQxNjE0OTYwNSwiYXVkIjoid3d3LmxpbmVvbGlhLm5ldCIsInN1YiI6ImRhbWllbi5mb250YWluZUBsaW5lb2xpYS5uZXQiLCJ1c2VybmFtZSI6ImRmb250YWluZSIsImVtYWlsIjoiZGFtaWVuLmZvbnRhaW5lQGxpbmVvbGlhLm5ldCIsImlkIjoiMSJ9.y4eqFLOcp7WYJoW0bzRrLGzNH2PvtVCdEAxrNlPwvL8';
    localStorage.setItem('id_token', token);
    expect(AuthService.isAuthenticated()).toBe(false);
    expect(AuthService.user).toBe(null);
  });

  afterEach(function() {
    store = {};
  });
});
