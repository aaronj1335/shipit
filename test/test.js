/*global test,ok,equal*/

test('basic test', function() {
  ok(true, 'this had better work.');
});


test('can access the DOM', function() {
  var fixture = document.getElementById('qunit-fixture');
  equal(fixture.innerText, 'this is the jam',
    'should be able to access the DOM.');
});
