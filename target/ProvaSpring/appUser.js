/**
 * Created by massimo_buonocore on 11/04/17.
 */
'use strict';


    // -------------------- AppUser Module -----------------------
    var appUser = angular.module("appUser",['ui.router','ngResource'])
        .config(['$stateProvider','$urlRouterProvider', function ($stateProvider,$urlRouterProvider) {

        /*state 'list' return all controller
        *
        *
        */
        $stateProvider.state('list',
        {            url: '/',
            templateUrl: 'list.html',
            controller:'userController'

        }).state('addUser',
            {            url: '/add',
                templateUrl: 'addUser.html',
                controller:'userController'
            }).state('editUser',
            {            url: '/edit/:id',
                templateUrl: 'addUser.html',
                controller:'userController'
            }).state('viewUser',
            {            url: '/view/:id',
                templateUrl: 'addUser.html',
                controller:'userController'
            });

        //default root mapping
        $urlRouterProvider.otherwise("/");
    }]);

//--------------------------End AppUser ------------------------------