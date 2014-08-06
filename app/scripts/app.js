'use strict';

/**
 * @ngdoc overview
 * @name angularTrainingApp
 * @description
 * # angularTrainingApp
 *
 * Main module of the application.
 */
var POSTS_FILE_ADDR = 'posts.json';


function getJsonData(url, callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url);
    xhr.onreadystatechange = function(){
        if (this.readyState === 4) {
            if (this.status === 200) {
                callback(JSON.parse(this.responseText));
            }
            //else network error
        }
    };
    xhr.send(null);
}


var app = angular.module('angularTrainingApp', [])
    .factory('postsExchange', function() {
    return {
        thing : {
            x : 100
        }
    };
    })
    .directive('blogPost', function () {
        return {
            link: function (scope, element, attrs) {
                    getJsonData(POSTS_FILE_ADDR, function(res) {
                        if (res instanceof Object && res.hasOwnProperty('posts')) {
                            scope.$apply(function(){scope.posts = res.posts;});
                        }
                    });
                },
            restrict: 'E',
            templateUrl: 'views/posts-body.html',
            replace: true,
            transclude: true
        }
    })
    .directive('newPost', function () {
        return {
            restrict: 'E',
            templateUrl: 'views/new_post.html',
            replace: true,
            transclude: true
        }
    });
