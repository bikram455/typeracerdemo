(
  function(){
    'use strict';

    angular.module('typeRacer')
    .config(config);

    config.$inject = ['$urlRouterProvider' , '$stateProvider'];

    function config($urlRouterProvider , $stateProvider){
      $urlRouterProvider.otherwise('/home');

      $stateProvider
      .state('home',{
        url:'/home',
        templateUrl:'app/components/home/home.html'
      })      
      .state('menu',{
        url:'/menu',
        templateUrl:'app/components/menu/menu.html'
      })
      
      .state('game',{
        url:'/game',
        templateUrl:'app/components/game/game.html',
        controller:'GameController as gameCtrl'
      });

    }
  }
)();