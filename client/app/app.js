'use strict';

angular.module('kekchoseIoApp', [
  'kekchoseIoApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'btford.socket-io'
])
.config(function($urlRouterProvider, $locationProvider) {
  $urlRouterProvider
    .otherwise('/');

  $locationProvider.html5Mode(true);
})
.factory('mySocket', function (socketFactory) {
  var myIoSocket = io.connect('http://atomracechat.herokuapp.com/');
  var mySocket = socketFactory({
    ioSocket: myIoSocket
  });
  return mySocket;
});
