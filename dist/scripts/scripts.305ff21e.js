"use strict";var app=angular.module("dairyFrontendApp",["ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngStorage","restangular"]);app.config(["$routeProvider","RestangularProvider",function(a,b){a.when("/",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/signup",{templateUrl:"views/signup.html",controller:"SignupCtrl"}).when("/dashboard",{templateUrl:"views/dashboard.html",controller:"DashboardCtrl"}).otherwise({redirectTo:"/"}),b.setBaseUrl("http://localhost:3000")}]),app.controller("LoginCtrl",["$scope","Restangular","$location","$rootScope",function(a,b,c,d){a.login=function(){var e={email:a.login.email,password:a.login.password};b.one("/api/login").customPOST(e).then(function(b){console.log(b),200==b.status?(d.loggedIn=!0,localStorage.setItem("auth_token",b.auth_token),c.path("/dashboard")):(c.path("/"),a.failed_login=!0)})};var e={auth_token:localStorage.getItem("auth_token")};b.one("/api/logout").customPOST(e).then(function(a){})}]),app.controller("SignupCtrl",["$scope","Restangular","$location","$rootScope",function(a,b,c,d){a.signup=function(){var e={user:{email:a.user.email,password:a.user.password,password_confirmation:a.user.password_confirmation,code:a.user.code}};b.one("/api/create/user").customPOST(e).then(function(b){console.log(b),200==b.status?(c.path("/"),d.user_created_successfuly=!0):a.failed_to_create_user=!0})}}]),app.controller("DashboardCtrl",["$scope","Restangular","$localStorage","$timeout","$rootScope","$location",function(a,b,c,d,e,f,g){var h={auth_token:localStorage.getItem("auth_token")};b.all("/record/list").customPOST(h).then(function(b){console.log(b),a.records=b.data})}]),angular.module("dairyFrontendApp").run(["$templateCache",function(a){a.put("views/addRecordForm.html",'<form> <div class="form-group"> <label for="email">Email:</label> <input type="email" class="form-control" id="email" placeholder="Enter email"> </div> <div class="form-group"> <label for="pwd">Password:</label> <input type="password" class="form-control" id="pwd" placeholder="Enter password"> </div> </form>'),a.put("views/dashboard.html",'<nav class="navbar navbar-inverse"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#"><strong>DIARY</strong></a> </div> <div class="collapse navbar-collapse" id="myNavbar"> <ul class="nav navbar-nav"> <li class="active"><a href="#">Home</a></li> <li><a href="#">All Record</a></li> <li><a href="#">Expences</a></li> </ul> <ul class="nav navbar-nav navbar-right"> <li><a href="/#!/"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li> </ul> </div> </div> </nav> <div class="row"> <div class="col-md-2"></div> <div class="col-md-8 dailyformdiv"> <div class="row"> <div class="col-md-6 col-xs-6"> <div class="dailyform col-md-2 col-md-offset-3 col-xs-2 col-xs-offset-2"> <button type="button" class="btn btn-primary btn-circle btn-xl" data-target="#addRecord" data-toggle="modal"><i class="glyphicon glyphicon-plus-sign"></i>Add Record</button> </div> </div> <div class="col-md-6 col-xs-6"> <div class="dailyform col-md-2 col-md-offset-3 col-xs-2 col-xs-offset-2"> <button type="button" class="btn btn-danger btn-circle btn-xl"><i class="glyphicon glyphicon-usd"></i>Add Expence</button> </div> </div> </div><hr> <div class="row"> </div> </div> <div class="col-md-2"></div> </div> <div class="row"> <div class="col-md-2"></div> <div class="col-md-8 well"> <div class="listRecords well well-sm" ng-repeat="record in records | orderBy : \'-created_at\'| limitTo : 5"> <a data-target="#demo-{{record.id}}" class="btn btn-primary btn-block" data-toggle="collapse">{{record.created_at | limitTo : 10}}</a><br> <div id="demo-{{record.id}}" class="collapse"> {{record}} <table class="table table-bordered"> <thead> <tr> <th>TITLE</th> <th>DESC</th> <th>Email</th> </tr> </thead> <tbody> <tr> <td>John</td> <td>Doe</td> <td>john@example.com</td> </tr> <tr> <td>Mary</td> <td>Moe</td> <td>mary@example.com</td> </tr> <tr> <td>July</td> <td>Dooley</td> <td>july@example.com</td> </tr> </tbody> </table> </div> </div> </div> <div class="col-md-2"></div> </div> <!-- Add the record model ********************************--> <div class="container"> <div class="modal fade" id="addRecord" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Add Record</h4> </div> <div class="modal-body"> <div ng-include="\'views/addRecordForm.html\'"> </div> </div> <div class="modal-footer"> <button type="submit" class="btn btn-success">Submit</button> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div> </div> </div> <!-- Add the record model ends*****************************-->'),a.put("views/login.html",'<div class="container"> <div ng-include="\'views/nav_bar.html\'"></div> </div> <div class="row" ng-controller="LoginCtrl"> <div class="col-md-4"></div> <div class="col-md-4 well login-form"> <h2 class="login-title">Login</h2> <div ng-if="user_created_successfuly" class="alert alert-success alert-dismissable"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> successfuly user created </div> <div ng-if="failed_login" class="alert alert-danger alert-dismissable"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Failed to login/ Try again </div> <hr> <form class="login"> <div class="form-group"> <label for="exampleInputEmail1">Email address</label> <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" ng-model="login.email"> </div> <div class="form-group"> <label for="exampleInputPassword1">Password</label> <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ng-model="login.password"> </div> <button type="submit" class="btn btn-success" ng-click="login()">Submit</button> <a class="btn btn-default pull-right" href="/#!/signup">signup</a> <br> <!-- <span class="pull-right">If not registered?</span> --> </form> </div> <div class="col-md-4"></div> </div>'),a.put("views/nav_bar.html",'<div class="row"> <div class="col-md-2"></div> <div class="jumbotron col-md-8 col-xs-12"> <div class="nav-title">Diary</div> </div> <div class="col-md-2"></div> </div>'),a.put("views/signup.html",'<div class="container"> <div ng-include="\'views/nav_bar.html\'"></div> </div> <div class="row" ng-controller="SignupCtrl"> <div class="col-md-4"></div> <div class="col-md-4 well login-form"> <h2 class="login-title">Register</h2> <div ng-if="failed_to_create_user" class="alert alert-danger alert-dismissable fade in"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Failed to create user/ Try again </div> <hr> <form class="login"> <div class="form-group"> <label for="exampleInputEmail1">Email address</label> <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" ng-model="user.email"> </div> <div class="form-group"> <label for="exampleInputPassword1">Password</label> <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ng-model="user.password"> </div> <div class="form-group"> <label for="exampleInputPassword1">Password Confirmation</label> <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ng-model="user.password_confirmation"> </div> <div class="form-group"> <label for="exampleInputPassword1">Code</label> <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ng-model="user.code"> </div> <button type="submit" class="btn btn-success" ng-click="signup()">Submit</button> <a type="submit" class="btn btn-default pull-right" href="/#!/">Login</a><br> <span class="pull-right">If already registered?</span> </form> </div> <div class="col-md-4"></div> </div>')}]);