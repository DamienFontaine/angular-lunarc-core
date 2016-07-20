describe('lunarc.mail.MailService', function() {

    beforeEach(module('lunarc.mail'));

    var $httpBackend, MailService, Mail;

    beforeEach(inject(function($injector) {
        $httpBackend = $injector.get('$httpBackend');
        MailService = $injector.get('MailService');
        Mail = $injector.get('Mail');
    }));

    it('should send a mail', function() {
        $httpBackend.expectPOST('/mail', function(headers){
          return {"message":"Hello world !","to":"john@doe.lost","from":"postmaster@lunarc.ovh"};
        }).respond(function(){
          return [200, []];
        });
        mail = new Mail("Hello world !", "john@doe.lost", "postmaster@lunarc.ovh");
        MailService.send(mail);
        $httpBackend.flush();
    });

    afterEach(function() {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });
});
