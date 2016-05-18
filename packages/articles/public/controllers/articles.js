'use strict';

angular.module('mean.articles').controller('ArticlesController', ['$scope', '$timeout',  'Upload', '$stateParams', '$location', 'Global', 'Articles',
  function($scope, $timeout, Upload, $stateParams, $location, Global, Articles) {
    $scope.global = Global;

    $scope.hasAuthorization = function(article) {
      if (!article || !article.user) return false;
      return $scope.global.isAdmin || article.user._id === $scope.global.user._id;
    };

    $scope.isAdmin = function(article) {
      if (!article || !article.user) return false;
      return $scope.global.isAdmin;
    };

    $scope.create = function(isValid, picFile) {
      if (isValid) {
        console.log(picFile);
        console.log('create');
        var article = this.article;
        article.image = null;

        console.log(article);

        Upload.upload({
            url: '/articles/articleupload', 
            method: 'POST', 
            headers: {'Content-Type': 'multipart/form-data'},
            fields: {article: article},
            file: picFile,               
        }).success(function (response, status) { $location.path('articles/' + response._id);

        $scope.title = '';
        $scope.content = '';
        
        }).error(function (err) {
                $scope.error = err.data.message;
        });
      }
    };

    $scope.remove = function(article) {
      if (article) {
        article.$remove();

        for (var i in $scope.articles) {
          if ($scope.articles[i] === article) {
            $scope.articles.splice(i, 1);
          }
        }
      } else {
        $scope.article.$remove(function(response) {
          $location.path('articles');
        });
      }
    };

    $scope.update = function(isValid) {
      if (isValid) {
        var article = $scope.article;
        if (!article.updated) {
          article.updated = [];
        }
        article.updated.push(new Date().getTime());

        article.$update(function() {
          $location.path('articles/' + article._id);
        });
      } else {
        $scope.submitted = true;
      }
    };

    $scope.find = function() {
      Articles.query(function(articles) {
        $scope.articles = articles;
      });
    };

    $scope.findOne = function() {
      Articles.get({
        articleId: $stateParams.articleId
      }, function(article) {
        $scope.article = article;
      });
    };
  }
]);
