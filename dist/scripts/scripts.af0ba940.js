"use strict";var app=angular.module("dairyFrontendApp",["ngCookies","ngResource","ngRoute","ngSanitize","ngTouch","ngStorage","restangular"]);app.config(["$routeProvider","RestangularProvider",function(a,b){a.when("/",{templateUrl:"views/login.html",controller:"LoginCtrl"}).when("/signup",{templateUrl:"views/signup.html",controller:"SignupCtrl"}).when("/dashboard",{templateUrl:"views/dashboard.html",controller:"DashboardCtrl"}).when("/records",{templateUrl:"views/records.html",controller:"RecordsCtrl"}).otherwise({redirectTo:"/"}),b.setBaseUrl("https://diary-back.herokuapp.com")}]),app.directive("addRecordForm",function(){return{templateUrl:"views/addRecordForm.html"}}),app.directive("addExpenseForm",function(){return{templateUrl:"views/addExpenseForm.html"}}),app.directive("navBar2",function(){return{templateUrl:"views/navbar2.html"}}),app.directive("selectDate",function(){return{templateUrl:"views/selectDate.html"}}),app.controller("LoginCtrl",["$scope","Restangular","$location","$rootScope",function(a,b,c,d){a.login=function(){var e={email:a.login.email,password:a.login.password};b.one("/api/login").customPOST(e).then(function(b){console.log(b),200==b.status?(d.loggedIn=!0,localStorage.setItem("auth_token",b.auth_token),c.path("/dashboard")):(c.path("/"),a.failed_login=!0)})};var e={auth_token:localStorage.getItem("auth_token")};b.one("/api/logout").customPOST(e).then(function(a){})}]),app.controller("SignupCtrl",["$scope","Restangular","$location","$rootScope",function(a,b,c,d){a.signup=function(){var e={user:{email:a.user.email,password:a.user.password,password_confirmation:a.user.password_confirmation,code:a.user.code}};b.one("/api/create/user").customPOST(e).then(function(b){console.log(b),200==b.status?(c.path("/"),d.user_created_successfuly=!0):a.failed_to_create_user=!0})}}]),app.controller("DashboardCtrl",["$scope","Restangular","$localStorage","$timeout","$rootScope","$location",function(a,b,c,d,e,f,g){function h(){a.getDate();var c={auth_token:localStorage.getItem("auth_token")};b.all("/record/list").customPOST(c).then(function(b){a.records=b.data})}a.getDate=function(){a.newDate=new Date},a.dateChangeEvent=function(){a.getTodaysRecord(),a.getExpenses()},h();var i=[{id:"",morning:"",afternoon:"",evening:"",night:"",read:"",bath:"",sleep:"",water:"",health:"",exercise:"",place:"",comments:""}];a.getTodaysRecord=function(){var c={auth_token:localStorage.getItem("auth_token"),date:$("#date").val().split("-").reverse().join("-")};b.all("/record/today").customPOST(c).then(function(b){b.data.length<=0?a.recordFormInput=i:a.recordFormInput=b.data})},a.addRecord=function(){var c={auth_token:localStorage.getItem("auth_token"),record:a.recordFormInput,date:$("#date").val().split("-").reverse().join("-")};b.one("/record/create").customPOST(c).then(function(b){a.recordAddedSuccessfuly=!1,a.failedToCreateRecord=!1,200==b.status?(a.recordAddedSuccessfuly=!0,h()):a.failedToCreateRecord=!0})},a.getExpenses=function(){var c={auth_token:localStorage.getItem("auth_token"),date:$("#date").val().split("-").reverse().join("-")};b.one("/expense/list").customPOST(c).then(function(b){console.log(b.today_expense),a.expenseFormInput=b.today_expense})},a.addExpenseField=function(){a.expenseFormInput.push({product:"",got:"",spent:"",change:""})},a.removeExpenseField=function(c,d){a.expenseFormInput.splice(c,1);var e={auth_token:localStorage.getItem("auth_token"),expense_id:d};b.one("/expense/delete").customPOST(e).then(function(a){console.log(a.message)})},a.addExpense=function(){console.log(a.expenseFormInput);var c={auth_token:localStorage.getItem("auth_token"),date:$("#date").val().split("-").reverse().join("-"),expense:a.expenseFormInput};console.log(a.expenseFormInput),b.one("/expense/create").customPOST(c).then(function(a){console.log("expense created log  "+a)})}}]),app.controller("RecordsCtrl",["$scope","Restangular","$localStorage","$timeout","$rootScope","$location",function(a,b,c,d,e,f,g){function h(){var c={auth_token:localStorage.getItem("auth_token")};b.all("/record/list").customPOST(c).then(function(b){console.log(b),a.records=b.data}),b.all("/expense/all").customPOST(c).then(function(b){console.log(b),a.expenses=b.allExpenses})}h()}]),angular.module("dairyFrontendApp").run(["$templateCache",function(a){a.put("views/addExpenseForm.html",'<div class="row"> <div class="col-md-6 col-md-offset-3"> <button class="btn btn-success btn-block" ng-click="addExpenseField();">Add</button> </div> </div> <br> <div class="row"> <div class="col-md-12"> <form> <table class="table" border="1" ng-repeat=" inputfield in expenseFormInput"> <tbody> <tr> <td> <label><i>Product/reason</i></label> </td> <td> <div class="form-group"> <textarea class="form-control" cols="80" rows="2" id="product" placeholder="product name...?" autofocus ng-model="inputfield.product"></textarea> </div> </td> </tr> <tr> <td> <label><i>Got(Rs):</i></label> </td> <td> <div class="form-group"> <input type="text" class="form-control" id="got" placeholder="got(Credit Rs)" ng-model="inputfield.got"> </div> </td> </tr> <tr> <td> <label><i>Spent(Rs):</i></label> </td> <td> <div class="form-group"> <input type="text" class="form-control" id="spent" placeholder="spent(Debit Rs)" ng-model="inputfield.spent"> </div> <div class="pull-right"> <i class="red">Change(Rs:)</i> <input type="text" id="change" placeholder="change(Credit Rs)" ng-model="inputfield.change"> </div> </td> </tr> <tr> <td></td> <td> <button type="button" class="btn btn-danger pull-right" ng-click="removeExpenseField($index, inputfield.id)">Remove</button> </td> </tr> </tbody> </table> </form> </div> </div>'),a.put("views/addRecordForm.html",'<div select-date></div> <form name="myForm" ng-repeat="recordInputfield in recordFormInput"> <div class="panel-group"> <div class="panel panel-primary"> <div class="panel-heading"><i>Good Food Good Mood</i></div> <div class="panel-body"> <div class="form-group"> <label for="email">Morning:</label> <input type="text" class="form-control" id="email" placeholder="Breakfast special...?" ng-model="recordInputfield.morning"> </div> <div class="form-group"> <label for="pwd">Afternoon:</label> <input type="text" class="form-control" id="pwd" placeholder="Lunch special...?" ng-model="recordInputfield.afternoon"> </div> <div class="form-group"> <label for="pwd">Evening:</label> <input type="text" class="form-control" id="pwd" placeholder="Evening special..?" ng-model="recordInputfield.evening"> </div> <div class="form-group"> <label for="pwd">Night:</label> <input type="text" class="form-control" id="pwd" placeholder="Dinner special..?" ng-model="recordInputfield.night"> </div> </div> </div> </div> <div class="panel-group"> <div class="panel panel-success"> <div class="panel-heading">Daily Routine</div> <div class="panel-body"> <table class="table" border="1"> <tbody> <tr> <td> <label><i>Reading Skill(Hours) :</i></label> </td> <td> <select class="form-control" id="sel1" ng-model="recordInputfield.read"> <option>0</option> <option>1</option> <option>2</option> <option>3</option> <option>4</option> <option>5</option> </select> </td> </tr> <tr> <td> <label><i>Sleep(Hours) :</i></label></td> <td> <input class="form-control" type="text" ng-model="recordInputfield.sleep"> </td> </tr> <tr> <td> <label><i>Water(liters) :</i></label></td> <td> <input class="form-control" type="text" ng-model="recordInputfield.water"> </td> </tr> <tr> <td> <label><i>Exercise(Minutes):</i></label></td> <td> <select class="form-control" id="sel1" ng-model="recordInputfield.exercise"> <option>YES</option> <option>NO</option> </select> </td> </tr> <tr> <td> <label><i>Bathing:</i></label></td> <td> <select class="form-control" id="sel1" ng-model="recordInputfield.bath"> <option>YES</option> <option>NO</option> </select> </td> </tr> <tr> <td> <label><i>Health:</i></label></td> <td> <select class="form-control" id="sel1" ng-model="recordInputfield.health"> <option>Good</option> <option>Normal</option> <option>Medicated</option> <option>Bad</option> </select> </td> </tr> </tbody> </table> </div> </div> </div> <div class="panel-group"> <div class="panel panel-success"> <div class="panel-heading">Work</div> <div class="panel-body"> <div class="form-group"> <label for="pwd">Place:</label> <textarea class="form-control" rows="3" id="place" placeholder="Where u went?" ng-model="recordInputfield.place"></textarea> </div> </div> </div> </div> <div class="panel-group"> <div class="panel panel-warning"> <div class="panel-heading">Add Expense</div> <div class="panel-body"> <div add-expense-form></div> </div> </div> </div> <div class="panel-group"> <div class="panel panel-danger"> <div class="panel-heading">Extras</div> <div class="panel-body"> <div class="form-group"> <label for="comment">Comments:</label> <textarea class="form-control" rows="2" ng-model="recordInputfield.comments" id="comments"></textarea> </div> </div> </div> </div> </form>'),a.put("views/dashboard.html",'<div ng-controller="DashboardCtrl"> <div nav-bar2></div> <div class="row"> <div class="col-md-2"></div> <div class="col-md-8 dailyformdiv"> <div ng-if="recordAddedSuccessfuly" class="alert alert-success alert-dismissable"> <a data-target="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Record added successfuly </div> <div ng-if="failedToCreateRecord" class="alert alert-danger alert-dismissable"> <a data-target="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Failed to create record </div> <div class="row"> <div class="col-md-6 col-xs-6"> <div class="dailyform col-md-2 col-md-offset-3 col-xs-2 col-xs-offset-2"> <button type="button" class="btn btn-primary btn-circle btn-xl" data-target="#addRecord" data-toggle="modal" ng-click=" getTodaysRecord(); getExpenses();"><i class="glyphicon glyphicon-plus-sign"></i>Add Record</button> </div> </div> <div class="col-md-6 col-xs-6"> <div class="dailyform col-md-2 col-md-offset-3 col-xs-2 col-xs-offset-2"> <button type="button" class="btn btn-danger btn-circle btn-xl" data-target="#addExpence" data-toggle="modal" ng-click="getTodaysRecord(); getExpenses(); "><i class="glyphicon glyphicon-usd"></i>Add Expence</button> </div> </div> </div><hr> <div class="row"> </div> </div> <div class="col-md-2"></div> </div> <div class="row"> <div class="col-md-2"></div> <div class="col-md-8 well"> <!-- each record display starts --> <div class="panel-group" id="accordion"> <div class="panel" ng-repeat="record in records | orderBy : \'-date\' | limitTo : 5"> <div class="panel-heading"> <h4 class="panel-title"> <a data-toggle="collapse" class="btn btn-primary btn-block" data-parent="#accordion" data-target="#collapse-{{record.id}}">{{record.date }}</a> </h4> </div> <div id="collapse-{{record.id}}" class="panel-collapse collapse"> <div class="panel-body"> <div class="panel-group"> <div class="panel panel-success"> <div class="panel-heading"><h6>Record</h6></div> <div class="panel-body dailyRecord"> <table class="table" border="2"> <tbody> <tr> <td class="success"> <b>Morning :</b> </td> <td> {{record.morning}} </td> </tr> <tr> <td class="success"> <b>Afternoon :</b> </td> <td> {{record.afternoon}} </td> </tr> <tr> <td class="success"> <b>Evening:</b> </td> <td> {{record.evening}} </td> </tr> <tr> <td class="success"> <b>Night:</b> </td> <td> {{record.night}} </td> </tr> </tbody> </table> <table class="table" border="1"> <thead> <tr class="success"> <td>Read :</td> <td>Exercise :</td> <td>Last Sleep :</td> </tr> <tr> <td>{{record.read}}</td> <td>{{record.exercise}}</td> <td>{{record.sleep}}</td> </tr> </thead> </table> <table class="table" border="1"> <thead> <tr class="success"> <td>Health :</td> <td>Bath :</td> <td>Water(l) :</td> </tr> <tr> <td>{{record.health}}</td> <td>{{record.bath}}</td> <td>{{record.sleep}}</td> </tr> </thead> </table> <table class="table" border="2"> <tbody> <tr> <td><b>Place : </b>{{record.place}}</td> </tr> <tr> <td><b>Comment : </b>{{record.comments}}</td> </tr> </tbody> </table> </div> </div> </div> <div class="panel-group"> <div class="panel panel-danger"> <div class="panel-heading"><h6>Expense</h6></div> <div class="panel-body dailyRecord"> <table class="table" border="2" ng-repeat="expense in expenses | filter : record.date"> <thead> <tr><td colspan="3"><b>Product/reason : </b><i>{{expense.product}}</i> </td></tr> </thead> <tbody> <tr class="danger"> <td>Got(Rs)</td> <td>Spent(Rs)</td> <td>Change(Rs)</td> </tr> <tr> <td>{{expense.got}}</td> <td>{{expense.spent}}</td> <td>{{expense.change}}</td> </tr> </tbody> </table> </div> </div> </div> </div> </div> </div> </div> <!-- each record display ends here --> </div> <div class="col-md-2"></div> </div> <!-- Add the record model ********************************--> <div class="container"> <div class="modal fade" id="addRecord" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Add Record</h4> </div> <div class="modal-body"> <div add-record-form></div> </div> <!-- ******************************* --> <div class="modal-footer"> <button type="submit" data-dismiss="modal" class="btn btn-success" data-dismiss="modal" ng-click="addRecord(); addExpense();">Submit</button> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div> </div> </div> <!-- Add the record model ends*****************************--> <!-- Add the Expence model ********************************--> <div class="container"> <div class="modal fade" id="addExpence" role="dialog"> <div class="modal-dialog"> <div class="modal-content"> <div class="modal-header"> <button type="button" class="close" data-dismiss="modal">&times;</button> <h4 class="modal-title">Add Expense</h4> </div> <div class="modal-body"> <div select-date></div> <div add-expense-form></div> </div> <div class="modal-footer"> <button type="submit" class="btn btn-success" data-dismiss="modal" ng-click="addExpense()">Submit</button> <button type="button" class="btn btn-default" data-dismiss="modal">Close</button> </div> </div> </div> </div> </div> <!-- Add the Expence model ends*****************************--> </div>'),a.put("views/login.html",'<div class="container"> <div ng-include="\'views/nav_bar.html\'"></div> </div> <div class="row" ng-controller="LoginCtrl"> <div class="col-md-4"></div> <div class="col-md-4 well login-form"> <h2 class="login-title">Login</h2> <div ng-if="user_created_successfuly" class="alert alert-success alert-dismissable"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> successfuly user created </div> <div ng-if="failed_login" class="alert alert-danger alert-dismissable"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Failed to login/ Try again </div> <hr> <form class="login"> <div class="form-group"> <label for="exampleInputEmail1">Email address</label> <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" ng-model="login.email" autofocus> </div> <div class="form-group"> <label for="exampleInputPassword1">Password</label> <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ng-model="login.password"> </div> <button type="submit" class="btn btn-success" ng-click="login()">Submit</button> <a class="btn btn-default pull-right" href="/#!/signup">signup</a> <br> <!-- <span class="pull-right">If not registered?</span> --> </form> </div> <div class="col-md-4"></div> </div>'),a.put("views/nav_bar.html",'<div class="row"> <div class="col-md-2"></div> <div class="jumbotron col-md-8 col-xs-12"> <div class="nav-title">DIARY</div> </div> <div class="col-md-2"></div> </div>'),a.put("views/navbar2.html",'<nav class="navbar navbar-inverse"> <div class="container-fluid"> <div class="navbar-header"> <button type="button" class="navbar-toggle" data-toggle="collapse" data-target="#myNavbar"> <span class="icon-bar"></span> <span class="icon-bar"></span> <span class="icon-bar"></span> </button> <a class="navbar-brand" href="#"><strong>DIARY</strong></a> </div> <div class="collapse navbar-collapse" id="myNavbar"> <ul class="nav navbar-nav"> <li class="active"><a href="/#!/dashboard">Home</a></li> <li><a href="/#!/records">All Record</a></li> <li><a href="#">Expences</a></li> </ul> <ul class="nav navbar-nav navbar-right"> <li><a href="/#!/"><span class="glyphicon glyphicon-log-out"></span> Logout</a></li> </ul> </div> </div> </nav>'),a.put("views/records.html",'<div ng-controller="RecordsCtrl"> <div nav-bar2></div> <div class="row"> <div class="col-md-2"></div> <div class="col-md-8 well"> <div class="panel-group" id="accordion"> <div class="panel" ng-repeat="record in records | orderBy : \'-date\'"> <div class="panel-heading"> <h4 class="panel-title"> <a data-toggle="collapse" class="btn btn-primary btn-block" data-parent="#accordion" data-target="#collapse-{{record.id}}">{{record.date }}</a> </h4> </div> <div id="collapse-{{record.id}}" class="panel-collapse collapse"> <div class="panel-body"> <div class="panel-group"> <div class="panel panel-success"> <div class="panel-heading"><h6>Record</h6></div> <div class="panel-body dailyRecord"> <table class="table" border="2"> <tbody> <tr> <td class="success"> <b>Morning :</b> </td> <td> {{record.morning}} </td> </tr> <tr> <td class="success"> <b>Afternoon :</b> </td> <td> {{record.afternoon}} </td> </tr> <tr> <td class="success"> <b>Evening:</b> </td> <td> {{record.evening}} </td> </tr> <tr> <td class="success"> <b>Night:</b> </td> <td> {{record.night}} </td> </tr> </tbody> </table> <table class="table" border="1"> <thead> <tr class="success"> <td>Read :</td> <td>Exercise :</td> <td>Last Sleep :</td> </tr> <tr> <td>{{record.read}}</td> <td>{{record.exercise}}</td> <td>{{record.sleep}}</td> </tr> </thead> </table> <table class="table" border="1"> <thead> <tr class="success"> <td>Health :</td> <td>Bath :</td> <td>Water(l) :</td> </tr> <tr> <td>{{record.health}}</td> <td>{{record.bath}}</td> <td>{{record.sleep}}</td> </tr> </thead> </table> <table class="table" border="2"> <tbody> <tr> <td><b>Place : </b>{{record.place}}</td> </tr> <tr> <td><b>Comment : </b>{{record.comments}}</td> </tr> </tbody> </table> </div> </div> </div> <div class="panel-group"> <div class="panel panel-danger"> <div class="panel-heading"><h6>Expense</h6></div> <div class="panel-body dailyRecord"> <table class="table" border="2" ng-repeat="expense in expenses | filter : record.date"> <thead> <tr><td colspan="3"><b>Product/reason : </b><i>{{expense.product}}</i> </td></tr> </thead> <tbody> <tr class="danger"> <td>Got(Rs)</td> <td>Spent(Rs)</td> <td>Change(Rs)</td> </tr> <tr> <td>{{expense.got}}</td> <td>{{expense.spent}}</td> <td>{{expense.change}}</td> </tr> </tbody> </table> </div> </div> </div> </div> </div> </div> </div> </div> <div class="col-md-2"></div> </div> </div>'),a.put("views/selectDate.html",'<div class="form-group jumbotron" ng-init="todaydate=newDate"> <label for="email">Date:</label> <input type="date" class="form-control" id="date" ng-model="todaydate" ng-blur="dateChangeEvent();"> </div>'),a.put("views/signup.html",'<div class="container"> <div ng-include="\'views/nav_bar.html\'"></div> </div> <div class="row" ng-controller="SignupCtrl"> <div class="col-md-4"></div> <div class="col-md-4 well login-form"> <h2 class="login-title">Register</h2> <div ng-if="failed_to_create_user" class="alert alert-danger alert-dismissable fade in"> <a href="#" class="close" data-dismiss="alert" aria-label="close">&times;</a> Failed to create user/ Try again </div> <hr> <form class="login"> <div class="form-group"> <label for="exampleInputEmail1">Email address</label> <input type="email" class="form-control" id="exampleInputEmail1" placeholder="Email" ng-model="user.email"> </div> <div class="form-group"> <label for="exampleInputPassword1">Password</label> <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ng-model="user.password"> </div> <div class="form-group"> <label for="exampleInputPassword1">Password Confirmation</label> <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ng-model="user.password_confirmation"> </div> <div class="form-group"> <label for="exampleInputPassword1">Code</label> <input type="password" class="form-control" id="exampleInputPassword1" placeholder="Password" ng-model="user.code"> </div> <button type="submit" class="btn btn-success" ng-click="signup()">Submit</button> <a type="submit" class="btn btn-default pull-right" href="/#!/">Login</a><br> <span class="pull-right">If already registered?</span> </form> </div> <div class="col-md-4"></div> </div>')}]);