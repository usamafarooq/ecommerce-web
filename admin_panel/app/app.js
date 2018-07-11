var api = 'http://localhost:4300/';
var site_url = 'http://localhost/ecommerce-web/';
var admin_url = 'http://localhost/ecommerce-web/admin_panel';
var app = angular.module("ecommerceApp", ["ngRoute"]);
app.config(function($routeProvider, $locationProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "templates/home.html",
        controller: 'homeCtrl',
        cache: false
    }).when("/home", {
        templateUrl : "templates/home.html",
        controller: 'homeCtrl',
        cache: false
    }).when("/user", {
        templateUrl : "templates/user.html",
        controller: 'userCtrl',
        cache: false
    }).when("/user/create", {
        templateUrl : "templates/createuser.html",
        controller: 'createuserCtrl',
        cache: false
    }).when("/user/edit/:name", {
        templateUrl : "templates/edituser.html",
        controller: 'edituserCtrl',
        cache: false
    }).when("/modules", {
        templateUrl : "templates/modules.html",
        controller: 'modulesCtrl',
        cache: false
    }).when("/modules/create", {
        templateUrl : "templates/createmodules.html",
        controller: 'createmodulesCtrl',
        cache: false
    }).when("/modules/edit/:name", {
        templateUrl : "templates/editmodules.html",
        controller: 'editmodulesCtrl',
        cache: false
    }).when("/role", {
        templateUrl : "templates/role.html",
        controller: 'roleCtrl',
        cache: false
    }).when("/role/create", {
        templateUrl : "templates/createrole.html",
        controller: 'createroleCtrl',
        cache: false
    }).when("/role/edit/:name", {
        templateUrl : "templates/editrole.html",
        controller: 'editroleCtrl',
        cache: false
    });
    //$urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
});

app.controller('mainCtrl', function($scope,$http,$location) {
    $scope.current = $location.path();
    $scope.modules;
    if (!localStorage.getItem('login_id')) {
        window.location.href = admin_url+'/login';
    }
    $scope.logout = function() {
        localStorage.removeItem('login_id')
        window.location.href = admin_url+'/login';
    }
    $http({
        method: 'GET',
        url: api + "usermodules",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        var module = [];
        var con = 0;
        for (var i = 0; i < data.data.length; i++) {
            var main = data.data[i]
            if (!main.parent_id) {
                module[con] = main
                for (var a = 0; a < data.data.length; a++) {
                    var mains = data.data[a]
                    
                    if ( main._id == mains.parent_id ) 
                    {
                        if (!module[con].children) {
                            module[con].children = []
                        }
                        module[con].children[module[con].children.length] = mains;
                    }
                }
                con++;
            }
            else if (main.parent_id == 0){
                module[con] = main
                for (var a = 0; a < data.data.length; a++) {
                    var mains = data.data[a]
                    
                    if ( main._id == mains.parent_id ) 
                    {
                        if (!module[con].children) {
                            module[con].children = []
                        }
                        module[con].children[module[con].children.length] = mains;
                    }
                }
                con++;
            }
        }
        //module = JSON.parse(module)
        //console.log(module)
        $scope.modules = module
        //console.log($scope.modules)
        setTimeout(function() {
            $("#side-menu").metisMenu()
        })
        //$("#side-menu").metisMenu()
        //$scope.modules = data.data
    });
});


app.controller('homeCtrl', function($scope,$http) {

});

app.controller('userCtrl', function($scope,$http,$location,$route) {
    $scope.users
    $http({
        method: 'GET',
        url: api + "users",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.users = data.data
        setTimeout(function(argument) {
            $("#dataTableExample2").DataTable({
                dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",
                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                buttons: [
                    {extend: 'copy', className: 'btn-sm'},
                    {extend: 'csv', title: 'ExampleFile', className: 'btn-sm'},
                    {extend: 'excel', title: 'ExampleFile', className: 'btn-sm'},
                    {extend: 'pdf', title: 'ExampleFile', className: 'btn-sm'},
                    {extend: 'print', className: 'btn-sm'}
                ],
                "order": [[ 0, "desc" ]]
            });
        }, 300)
    });
    $scope.deleteuser = function(id) {
        $http({
            method: 'GET',
            url: api + "deleteuser/"+id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            $route.reload()
        })
    }
});

app.controller('createuserCtrl', function($scope,$http,$location) {
    $scope.role
    $http({
        method: 'GET',
        url: api + "role",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.role = data.data
    })
    $scope.submitForm = function() {
        console.log($scope.form)
        $http({
            method: 'POST',
            //cache: false,
            url: api + "createuser",
            data: $scope.form,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/user')
        })
    }
});

app.controller('edituserCtrl', function($scope,$http,$location,$routeParams) {
    $scope.role
    $scope.form
    var currentId = $routeParams.name;
    //console.log(currentId)
    $http({
        method: 'GET',
        url: api + "role",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.role = data.data
    })
    $http({
        method: 'GET',
        url: api + "edituser/"+currentId,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        // var form = data.data
        // $scope.form.first_name = form.first_name
        // $scope.form.last_name = form.last_name
        // $scope.form.username = form.username
        // $scope.form.email = form.email
        // $scope.form.password = form.password
        // $scope.form.role = form.role
        $scope.form = data.data
    })
    $scope.submitForm = function() {
        //console.log($scope.form)
        $http({
            method: 'POST',
            //cache: false,
            url: api + "updateuser/"+currentId,
            data: {
                'first_name' : $scope.form.first_name,
                'last_name' : $scope.form.last_name,
                'username' : $scope.form.username,
                'email' : $scope.form.email,
                'password' : $scope.form.password,
                'role' : $scope.form.role,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/user')
        })
    }
});


app.controller('modulesCtrl', function($scope,$http,$location,$route) {
    $scope.module
    $http({
        method: 'GET',
        url: api + "modules",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.module = data.data
        setTimeout(function(argument) {
            $("#dataTableExample2").DataTable({
                dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",
                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                buttons: [
                    {extend: 'copy', className: 'btn-sm'},
                    {extend: 'csv', title: 'ExampleFile', className: 'btn-sm'},
                    {extend: 'excel', title: 'ExampleFile', className: 'btn-sm'},
                    {extend: 'pdf', title: 'ExampleFile', className: 'btn-sm'},
                    {extend: 'print', className: 'btn-sm'}
                ],
                "order": [[ 0, "desc" ]]
            });
        }, 300)
    });
    $scope.deletemodule = function(id) {
        $http({
            method: 'GET',
            url: api + "deletemodule/"+id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            $route.reload()
        })
    }
});


app.controller('createmodulesCtrl', function($scope,$http,$location) {
    $scope.module
    $http({
        method: 'GET',
        url: api + "modules",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.module = data.data
    })
    $scope.submitForm = function() {
        console.log($scope.form)
        $http({
            method: 'POST',
            //cache: false,
            url: api + "createmodule",
            data: $scope.form,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/modules')
        })
    }
});

app.controller('editmodulesCtrl', function($scope,$http,$location,$routeParams) {
    $scope.role
    $scope.form
    var currentId = $routeParams.name;
    //console.log(currentId)
    $scope.module
    $http({
        method: 'GET',
        url: api + "modules",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.module = data.data
    })
    $http({
        method: 'GET',
        url: api + "editmodule/"+currentId,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        // var form = data.data
        // $scope.form.first_name = form.first_name
        // $scope.form.last_name = form.last_name
        // $scope.form.username = form.username
        // $scope.form.email = form.email
        // $scope.form.password = form.password
        // $scope.form.role = form.role
        $scope.form = data.data
    })
    $scope.submitForm = function() {
        //console.log($scope.form)
        $http({
            method: 'POST',
            //cache: false,
            url: api + "updatemodule/"+currentId,
            data: {
                'name' : $scope.form.name,
                'main_name' : $scope.form.main_name,
                'sort' : $scope.form.sort,
                'icon' : $scope.form.icon,
                'url' : $scope.form.url,
                'parent_id' : $scope.form.parent_id,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/modules')
        })
    }
});

app.controller('roleCtrl', function($scope,$http,$location,$route) {
    $scope.role
    $http({
        method: 'GET',
        url: api + "role",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.role = data.data
        setTimeout(function(argument) {
            $("#dataTableExample2").DataTable({
                dom: "<'row'<'col-sm-4'l><'col-sm-4 text-center'B><'col-sm-4'f>>tp",
                "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
                buttons: [
                    {extend: 'copy', className: 'btn-sm'},
                    {extend: 'csv', title: 'ExampleFile', className: 'btn-sm'},
                    {extend: 'excel', title: 'ExampleFile', className: 'btn-sm'},
                    {extend: 'pdf', title: 'ExampleFile', className: 'btn-sm'},
                    {extend: 'print', className: 'btn-sm'}
                ],
                "order": [[ 0, "desc" ]]
            });
        }, 300)
    });
    $scope.deleterole = function(id) {
        $http({
            method: 'GET',
            url: api + "deleterole/"+id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            $route.reload()
        })
    }
});

app.controller('createroleCtrl', function($scope,$http,$location) {
    $scope.module
    $http({
        method: 'GET',
        url: api + "modules",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.module = data.data
        setTimeout(function() {
            $('input[data-toggle="toggle"]').bootstrapToggle({
                on: 'Yes',
                off: 'No'
            });
        })
    })
    $scope.submitForm = function() {
        //console.log($scope.form)
        var form = {'role' : $scope.form.role, 'permission' : {}}
        // form['role'] = $scope.form.role
        // form['permission'] = []
        var con = 0
        $('input.view').each(function() {
            var val = 0;
            if ($(this).is(':checked')) {
                val = 1
            }
            form['permission'][con] = {'view' : val,'view_all' : val,'edit' : val,'created' : val,'deleted' : val,'disable' : val, 'module_id':val}
            con++;
        })
        var con = 0
        $('input.view_all').each(function() {
            var val = 0;
            if ($(this).is(':checked')) {
                val = 1
            }
            form['permission'][con].view_all = val
            con++;
        })
        var con = 0
        $('input.disable').each(function() {
            var val = 0;
            if ($(this).is(':checked')) {
                val = 1
            }
            form['permission'][con].disable = val
            con++;
        })
        var con = 0
        $('input.edit').each(function() {
            var val = 0;
            if ($(this).is(':checked')) {
                val = 1
            }
            form['permission'][con].edit = val
            con++;
        })
        var con = 0
        $('input.created').each(function() {
            var val = 0;
            if ($(this).is(':checked')) {
                val = 1
            }
            form['permission'][con].created = val
            con++;
        })
        var con = 0
        $('input.deleted').each(function() {
            var val = 0;
            if ($(this).is(':checked')) {
                val = 1
            }
            form['permission'][con].deleted = val
            con++;
        })
        var con = 0
        $('input.module_id').each(function() {
            var val = $(this).val();
            form['permission'][con].module_id = val
            con++;
        })
        //form.permission = JSON.parse(form.permission)
        form = JSON.stringify(form)
        console.log(form)
        $http({
            method: 'POST',
            url: api + "createrole",
            data: form,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/role')
        })
    }
});

app.controller('editroleCtrl', function($scope,$http,$location,$routeParams) {
    $scope.role
    $scope.form
    var currentId = $routeParams.name;
    //console.log(currentId)
    $scope.module
    $http({
        method: 'GET',
        url: api + "role_permission/"+currentId,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        console.log(data.data)
        $scope.role = data.data
    })
    $http({
        method: 'GET',
        url: api + "editrole/"+currentId,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        console.log(data.data)
        $scope.form = data.data
    })
    $scope.module
    $http({
        method: 'GET',
        url: api + "modules",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.module = data.data
        setTimeout(function() {
            $('input[data-toggle="toggle"]').bootstrapToggle({
                on: 'Yes',
                off: 'No'
            });
        })
    })
    $scope.submitForm = function() {
        //console.log($scope.form)
        $http({
            method: 'POST',
            //cache: false,
            url: api + "updatemodule/"+currentId,
            data: {
                'name' : $scope.form.name,
                'main_name' : $scope.form.main_name,
                'sort' : $scope.form.sort,
                'icon' : $scope.form.icon,
                'url' : $scope.form.url,
                'parent_id' : $scope.form.parent_id,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/modules')
        })
    }
});