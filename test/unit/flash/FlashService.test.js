describe('lunarc.flash.FlashService', function() {

  beforeEach(module('lunarc.flash'));

  var $rootScope, FlashService;

  beforeEach(inject(function($injector) {
    $rootScope = $injector.get('$rootScope');
    FlashService = $injector.get('FlashService');
  }));

  it('should add a message', function() {
    FlashService.set("Hello");
    expect(FlashService.get()).toBe('Hello');
  });

  it('should add multiples messages', function() {
    FlashService.set("Hello");
    FlashService.set("World");
    expect(FlashService.get()).toBe('Hello');
    expect(FlashService.get()).toBe('World');
  });

  it('should clear a message', function() {
    FlashService.set("Hello");
    expect(FlashService.get()).toBe('Hello');
    FlashService.clear();
    expect(FlashService.get()).toBe('');
  });

  it('should react on locationChangeStart ', function() {
    FlashService.set("Hello");
    $rootScope.$broadcast('$locationChangeStart');
    expect(FlashService.get()).toBe('Hello');
  });
});
