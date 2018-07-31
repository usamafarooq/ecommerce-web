var api = 'http://localhost:4300/';
var site_url = 'http://localhost/ecommerce-web/';
var admin_url = 'http://localhost/ecommerce-web/admin_panel';
var media = 'http://localhost/ecommerce-web/uploads';
var app = angular.module("ecommerceApp", ["ngRoute"]);
function reload_js(src) {
    $('script[src="' + src + '"]').remove();
    $('<script>').attr('src', src).appendTo('head');
}
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
    }).when("/category", {
        templateUrl : "templates/category.html",
        controller: 'categoryCtrl',
        cache: false
    }).when("/category/create", {
        templateUrl : "templates/createcategory.html",
        controller: 'createcategoryCtrl',
        cache: false
    }).when("/category/edit/:name", {
        templateUrl : "templates/editcategory.html",
        controller: 'editcategoryCtrl',
        cache: false
    }).when("/media", {
        templateUrl : "templates/media.html",
        controller: 'mediaCtrl',
        cache: false
    }).when("/tags", {
        templateUrl : "templates/tags.html",
        controller: 'tagsCtrl',
        cache: false
    }).when("/tags/create", {
        templateUrl : "templates/createtags.html",
        controller: 'createtagsCtrl',
        cache: false
    }).when("/tags/edit/:name", {
        templateUrl : "templates/edittags.html",
        controller: 'edittagsCtrl',
        cache: false
    }).when("/attribute", {
        templateUrl : "templates/attribute.html",
        controller: 'attributeCtrl',
        cache: false
    }).when("/attribute/create", {
        templateUrl : "templates/createattribute.html",
        controller: 'createattributeCtrl',
        cache: false
    }).when("/attribute/edit/:name", {
        templateUrl : "templates/editattribute.html",
        controller: 'editattributeCtrl',
        cache: false
    }).when("/attribute/configure/:name", {
        templateUrl : "templates/configureattribute.html",
        controller: 'configureattributeCtrl',
        cache: false
    }).when("/attribute/configure/:name/create", {
        templateUrl : "templates/configurecreate.html",
        controller: 'configurecreateCtrl',
        cache: false
    })
    .when("/attribute/configure/:name/edit/:term", {
        templateUrl : "templates/configureedit.html",
        controller: 'configureeditCtrl',
        cache: false
    }).when("/product", {
        templateUrl : "templates/product.html",
        controller: 'productCtrl',
        cache: false
    }).when("/product/create", {
        templateUrl : "templates/createproduct.html",
        controller: 'createproductCtrl',
        cache: false
    });
    //$urlRouterProvider.otherwise('/');
    $locationProvider.html5Mode(true);
});

app.controller('mainCtrl', function($scope,$http,$location) {
    $scope.media_url = media
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
        url: api + "edituser/"+localStorage.getItem('login_id'),
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        var role_id = data.data.role
        $http({
            method: 'GET',
            url: api + "usermodules/"+role_id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            var module = [];
            var con = 0;
            for (var i = 0; i < data.data.length; i++) {
                var main = data.data[i]
                main = main.module_id
                //console.log(main)
                if (main != null) {
                    //console.log(main)
                    if (!main.parent_id) {
                        module[con] = main
                        for (var a = 0; a < data.data.length; a++) {
                            var mains = data.data[a].module_id
                            if (mains != null) {
                                if ( main._id == mains.parent_id )
                                {
                                    if (!module[con].children) {
                                        module[con].children = []
                                    }
                                    module[con].children[module[con].children.length] = mains;
                                }
                            }
                        }
                        con++;
                    }
                    else if (main.parent_id == 0){
                        module[con] = main
                        for (var a = 0; a < data.data.length; a++) {
                            var mains = data.data[a].module_id
                            if (mains != null) {
                                if ( main._id == mains.parent_id )
                                {
                                    if (!module[con].children) {
                                        module[con].children = []
                                    }
                                    module[con].children[module[con].children.length] = mains;
                                }
                            }
                        }
                        con++;
                    }
                }
                if (data.data.length == (i+1)) {
                    $scope.modules = module
                    setTimeout(function() {
                        $("#side-menu").metisMenu()
                    }, 300)
                }
            }
            //module = JSON.parse(module)
            //console.log(module)

            //$("#side-menu").metisMenu()
            //$scope.modules = data.data
        });
    })

    $scope.storeLocalStorage = function(btnId, limit ) {
      localStorage.setItem('btnId',btnId);
      localStorage.setItem('imgLimit',limit);
      localStorage.setItem('mediaID', []);
    }



});

app.controller('mediaCtrl', function($scope,$http) {
    $scope.media
    $http({
        method: 'GET',
        url: api + "media",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.media = data.data
    });
    $scope.onFileSelect = function ($files) {
        for (var i = 0; i < $files.length; i++) {
            var $file = $files[i];
            var formData = new FormData();
            formData.append('media', $file);
            console.log(formData)
            $http({ method: 'POST', url: api + "addmedia", data: formData, headers: { 'Content-Type': undefined }, transformRequest: angular.identity })
            .then(function (data, status, headers, config) {
                $scope.media = data.data
            });
        }
    }
    $scope.deletemedia = function(id) {
        $http({
            method: 'GET',
            url: api + "deletemedia/"+id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            $scope.media = data.data
        })
    }


    // document.getElementsByClassName('selectMedia').addEventListener('click', function() {

    // });
    // $('.selectMedia').click( function(){
    //   alert('asdf');
    // });

    $scope.selectmedia = function (id){
        if (localStorage.getItem('mediaID') == '')
        {
          mediaID = [];

          localStorage.setItem('mediaID', '1');
        }
        var is_repeated = 0;
        if (mediaID.length > 0 ) {

            for (var i = mediaID.length - 1; i >= 0; i--) {
                if (mediaID[i].id == id)
                {
                  is_repeated = 1;
                }

            }
        }

        if (localStorage.getItem('imgLimit') == 'multiple')
        {
          if(is_repeated == 0)
          {
              mediaID.push( {'id' : id});
          }
          else{
            var removeIndex = mediaID.map(function(item) { return item.id; }).indexOf(id);

            // remove object
            mediaID.splice(removeIndex, 1);
          }
        }
        else{
          mediaID[0] = {id : id};
        }

        var row = '<ul>';
        for (var i = 0; i < mediaID.length; i++)
        {
            row += '<li><img src="' + $('#'+mediaID[i].id).attr('src') + '" width="100px" height="100px"></li>';
        }

        row += '</ul>'


        $('#'+localStorage.getItem('btnId')).closest('.form-group').next('.showSelectedImages').html(row);
        $('#'+localStorage.getItem('btnId')).siblings('input').val(JSON.stringify(mediaID));



    }
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
    //$scope.role
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
        $scope.module = data.data
        setTimeout(function() {
            $('input[data-toggle="toggle"]').bootstrapToggle({
                on: 'Yes',
                off: 'No'
            });
        })
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
    // $scope.module
    // $http({
    //     method: 'GET',
    //     url: api + "modules",
    //     headers: {
    //         'Content-Type': 'application/x-www-form-urlencoded'
    //     }
    // }).then(function(data, status, headers, config) {
    //     $scope.module = data.data
    //     setTimeout(function() {
    //         $('input[data-toggle="toggle"]').bootstrapToggle({
    //             on: 'Yes',
    //             off: 'No'
    //         });
    //     })
    // })
    $scope.submitForm = function() {
        var form = {'permission' : {}}
        // form['role'] = $scope.form.role
        // form['permission'] = []
        var con = 0
        $('input.view').each(function() {
            var val = 0;
            if ($(this).is(':checked')) {
                val = 1
            }
            form['permission'][con] = {'view' : val,'view_all' : val,'edit' : val,'created' : val,'deleted' : val,'disable' : val, 'id':val}
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
        $('input.id').each(function() {
            var val = $(this).val();
            form['permission'][con].id = val
            con++;
        })
        //form.permission = JSON.parse(form.permission)
        form = JSON.stringify(form)
        $http({
            method: 'POST',
            url: api + "updaterole",
            data: form,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/role')
        })
        //console.log(form)

    }
});

app.controller('categoryCtrl', function($scope,$http,$location,$route) {
    $scope.category
    $http({
        method: 'GET',
        url: api + "category",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.category = data.data
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
    $scope.deletecategory = function(id) {
        $http({
            method: 'GET',
            url: api + "deletecategory/"+id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            $route.reload()
        })
    }



});

app.controller('createcategoryCtrl', function($scope,$http,$location) {
    $scope.category
    $http({
        method: 'GET',
        url: api + "category",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.category = data.data
    })
    $scope.submitForm = function() {
        console.log($scope.form)
        $http({
            method: 'POST',
            //cache: false,
            url: api + "createcategory",
            data: $scope.form,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/category')
        })
    }


    $scope.submitForm = function() {
        // console.log($scope.form);
        var form = $scope.form;
        // var form = {'role' : $scope.form, 'permission' : {}}
        var other_fields = {};
        for (var i = 0; i < $('.custom-field-container').length; i++) {
          // console.log();

          var container = $('.custom-field-container')[i];
          var name = $(container).find('.custom-field-name').val();
          var value = $(container).find('.custom-field-value').val();
          other_fields[i] = {name: name, value: value}
          //other_fields.push({name: name, value: value});

        }


        var featured_img = '';
        var images = {}

        // featured_img = JSON.parse($('input[ng-model="form.featured_img"]').val())
        // for (var i = 0; i < featured_img.length; i++) {
        //     images[i] = featured_img[i]
        // }

        img = JSON.parse($('input[ng-model="form.featured_img"]').val())
        for (var i = 0; i < img.length; i++) {
            images[i] = img[i]
            if (img[i].id) {
                images[i] = img[i].id
            }
        }
        // img = images
        form.featured_img = images;


        var images = {}

        img = JSON.parse($('input[ng-model="form.gallery"]').val())
        for (var i = 0; i < img.length; i++) {
            images[i] = img[i]
            if (img[i].id) {
                images[i] = img[i].id
            }
        }
        form.gallery = images;




        var images = {}

        img = JSON.parse($('input[ng-model="form.mobile_featured_img"]').val())
        for (var i = 0; i < img.length; i++) {
            images[i] = img[i]
            if (img[i].id) {
                images[i] = img[i].id
            }
        }
        form.mobile_featured_img = images;


        // var mobile_gallery = '';
        var images = {}

        img = JSON.parse($('input[ng-model="form.mobile_gallery"]').val())
        for (var i = 0; i < img.length; i++) {
            images[i] = img[i]
            if (img[i].id) {
                images[i] = img[i].id
            }
        }

        form.mobile_gallery = images;


        form.other_fields = other_fields;
        form = JSON.stringify(form)
        $http({
            method: 'POST',
            //cache: false,
            url: api + "createcategory",
            data: $scope.form,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/category')
        })
    }

    $scope.choices = [{id: 'choice1'}];

    $scope.addNewChoice = function() {
      var newItemNo = $scope.choices.length+1;
      $scope.choices.push({'id' : 'choice' + newItemNo, 'name' : 'choice' + newItemNo});
    };

    $scope.removeNewChoice = function(index) {
      var newItemNo = $scope.choices.length-1;
      if ( newItemNo !== 0 ) {
        // $scope.choices.pop();
        $scope.choices.splice(index, 1);
      }
    };

    $scope.showAddChoice = function(choice) {
      return choice.id === $scope.choices[$scope.choices.length-1].id;
    };

});

app.controller('editcategoryCtrl', function($scope,$http,$location,$routeParams) {
    $scope.role
    $scope.form
    var currentId = $routeParams.name;
    //console.log(currentId)
    $scope.category
    $http({
        method: 'GET',
        url: api + "category",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.category = data.data
    })
    $http({
        method: 'GET',
        url: api + "editcategory/"+currentId,
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
        var fields = data.data.other_fields[0]
        // for (var i = 0; i < fields.length; i++) {
        //   fields[i] += {
        //     id: 'choice'+i+1,
        //     name: fields[i].name,
        //     value: fields[i].value,
        //   }
        // }

        _temp = [];
        for (var i in fields) {
          index = parseInt(i)+1;

          _temp.push({
            'id' : 'choice' + index,
            'name': fields[i].name,
            'value': fields[i].value,
          });
        }

        $scope.choices = _temp;

        $scope.mobile_gallery
        if (data.data.featured_img !=  '' ) {
          row = '';

          // for (var key in data.data.featured_img[0]) {
          //
          //     if (!data.data.featured_img[0].hasOwnProperty(key)) continue;
          //
          //     var obj = data.data.featured_img[0][key];
          //     for (var prop in obj) {
          //         // skip loop if the property is from prototype
          //         // if(!obj.hasOwnProperty(prop)) continue;
          //
          //
          //         var imgId = data.data.featured_img[0][i].id
          //         var imgSrc = $('#'+imgId).attr('src')
          //
          //         row += '<li><img src="'+imgSrc+'" width="100px" height="100px"></li>'
          //     }
          // }


          for (var i = 0; i < data.data.featured_img.length; i++) {
            data.data.featured_img[i]

            var imgId = data.data.featured_img[i]
            var imgSrc = $('#'+imgId).attr('src')
            row += '<li><img src="'+imgSrc+'" width="100px" height="100px"></li>'
          }

          $('input[ng-model="form.featured_img"]').closest('.form-group').next('.showSelectedImages').append('<ul>'+row+'</ul>')
        }


        if (data.data.gallery !=  '' ) {

          row = '';


          for (var i = 0; i < data.data.gallery.length; i++) {
            data.data.gallery[i]

            var imgId = data.data.gallery[i]
            var imgSrc = $('#'+imgId).attr('src')
            row += '<li><img src="'+imgSrc+'" width="100px" height="100px"></li>'
          }


          // for (var key in data.data.gallery[0]) {
          //
          //     if (!data.data.gallery[0].hasOwnProperty(key)) continue;
          //
          //     var obj = data.data.gallery[0][key];
          //     for (var prop in obj) {
          //         // skip loop if the property is from prototype
          //         // if(!obj.hasOwnProperty(prop)) continue;
          //
          //
          //         var imgId = data.data.gallery[0][i].id
          //         var imgSrc = $('#'+imgId).attr('src')
          //
          //         row += '<li><img src="'+imgSrc+'" width="100px" height="100px"></li>'
          //     }
          // }

          $('input[ng-model="form.gallery"]').closest('.form-group').next('.showSelectedImages').append('<ul>'+row+'</ul>')

        }


        if (data.data.mobile_featured_img !=  '' ) {

          row = '';


          for (var i = 0; i < data.data.mobile_featured_img.length; i++) {
            data.data.mobile_featured_img[i]

            var imgId = data.data.mobile_featured_img[i]
            var imgSrc = $('#'+imgId).attr('src')
            row += '<li><img src="'+imgSrc+'" width="100px" height="100px"></li>'
          }


          // for (var key in data.data.mobile_featured_img[0]) {
          //
          //     if (!data.data.mobile_featured_img[0].hasOwnProperty(key)) continue;
          //
          //     var obj = data.data.mobile_featured_img[0][key];
          //     for (var prop in obj) {
          //
          //
          //         var imgId = data.data.mobile_featured_img[0][i].id
          //         var imgSrc = $('#'+imgId).attr('src')
          //
          //         row += '<li><img src="'+imgSrc+'" width="100px" height="100px"></li>'
          //     }
          // }

          $('input[ng-model="form.mobile_featured_img"]').closest('.form-group').next('.showSelectedImages').append('<ul>'+row+'</ul>')


        }


        if (data.data.mobile_gallery !=  '' ) {

          row = '';


          for (var i = 0; i < data.data.mobile_gallery.length; i++) {
            data.data.mobile_gallery[i]

            var imgId = data.data.mobile_gallery[i]
            var imgSrc = $('#'+imgId).attr('src')
            row += '<li><img src="'+imgSrc+'" width="100px" height="100px"></li>'
          }

          $('input[ng-model="form.mobile_gallery"]').closest('.form-group').next('.showSelectedImages').append('<ul>'+row+'</ul>')
        }


            // var imgId = $scope.form.image[0].id
            // var imgSrc = $('#'+imgId).attr('src')
            // $('.showSelectedImages').append('<ul><li><img src="'+imgSrc+'" width="100px" height="100px"></li></ul>')
            // console.log(imgId)

        console.log($scope.choices);
    })
    $scope.submitForm = function() {
        //console.log($scope.form)
        var form = $scope.form;
        // var form = {'role' : $scope.form, 'permission' : {}}
        var other_fields = {};
        for (var i = 0; i < $('.custom-field-container').length; i++) {
          // console.log();

          var container = $('.custom-field-container')[i];
          var name = $(container).find('.custom-field-name').val();
          var value = $(container).find('.custom-field-value').val();
          other_fields[i] = {name: name, value: value}
          //other_fields.push({name: name, value: value});

        }
        // form.other_fields = other_fields;
        // form = JSON.stringify(form)

        var featured_img = '';
        var images = {}

        featured_img = JSON.parse($('input[ng-model="form.featured_img"]').val())
        for (var i = 0; i < featured_img.length; i++) {
            images[i] = featured_img[i]
        }
        featured_img = images


        var gallery = '';
        var images = {}

        gallery = JSON.parse($('input[ng-model="form.gallery"]').val())
        for (var i = 0; i < gallery.length; i++) {
            images[i] = gallery[i]
        }
        gallery = images;


        var mobile_featured_img = '';
        var images = {}

        mobile_featured_img = JSON.parse($('input[ng-model="form.mobile_featured_img"]').val())
        for (var i = 0; i < mobile_featured_img.length; i++) {
            images[i] = mobile_featured_img[i]
        }
        mobile_featured_img = images;


        var mobile_gallery = '';
        var images = {}

        mobile_gallery = JSON.parse($('input[ng-model="form.mobile_gallery"]').val())
        for (var i = 0; i < mobile_gallery.length; i++) {
            images[i] = mobile_gallery[i]
        }
        mobile_gallery = images;



        console.log(form)
        $http({
            method: 'POST',
            //cache: false,
            url: api + "updatecategory/"+currentId,
            data: {
                'name' : $scope.form.name,
                'sort' : $scope.form.sort,
                'url' : $scope.form.url,
                'parent_id' : $scope.form.parent_id,
                'short_description' : $scope.form.short_description,
                'description' : $scope.form.description,
                'other_fields': other_fields,
                            'featured_img':featured_img,
                            'gallery':gallery,
                            'mobile_featured_img':mobile_featured_img,
                            'mobile_gallery':mobile_gallery,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/category')
        })
    }


    // $scope.choices = [{id: 'choice1'}];

    $scope.addNewChoice = function() {
      var newItemNo = $scope.choices.length+1;
      $scope.choices.push({'id' : 'choice' + newItemNo});
    };

    $scope.removeNewChoice = function(index) {
      var newItemNo = $scope.choices.length-1;
      if ( newItemNo !== 0 ) {
        // $scope.choices.pop();
        $scope.choices.splice(index, 1);
      }
    };

    $scope.showAddChoice = function(choice) {
      return choice.id === $scope.choices[$scope.choices.length-1].id;
    };


    // $scope.editChoice = function(){
    //
    // }


});

app.controller('tagsCtrl', function($scope,$http,$location,$route) {
    $scope.tags
    $http({
        method: 'GET',
        url: api + "tags",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.tags = data.data
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
    $scope.deletetags = function(id) {
        $http({
            method: 'GET',
            url: api + "deletetags/"+id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            $route.reload()
        })
    }
});

app.controller('createtagsCtrl', function($scope,$http,$location) {
    $scope.submitForm = function() {
        console.log($scope.form)
        $http({
            method: 'POST',
            //cache: false,
            url: api + "createtags",
            data: $scope.form,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/tags')
        })
    }
});

app.controller('edittagsCtrl', function($scope,$http,$location,$routeParams) {
    $scope.form
    var currentId = $routeParams.name;
    $http({
        method: 'GET',
        url: api + "edittags/"+currentId,
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
            url: api + "updatetags/"+currentId,
            data: {
                'name' : $scope.form.name,
                'url' : $scope.form.url,
                'short_description' : $scope.form.short_description,
                'description' : $scope.form.description,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/tags')
        })
    }
});

app.controller('attributeCtrl', function($scope,$http,$location,$route) {
    $scope.attribute
    $http({
        method: 'GET',
        url: api + "attribute",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.attribute = data.data
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
    $scope.deleteattribute = function(id) {
        $http({
            method: 'GET',
            url: api + "deleteattribute/"+id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            $route.reload()
        })
    }
});

app.controller('createattributeCtrl', function($scope,$http,$location) {
    $scope.submitForm = function() {
        console.log($scope.form)
        $http({
            method: 'POST',
            //cache: false,
            url: api + "createattribute",
            data: $scope.form,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/attribute')
        })
    }
});

app.controller('editattributeCtrl', function($scope,$http,$location,$routeParams) {
    $scope.form
    var currentId = $routeParams.name;
    $http({
        method: 'GET',
        url: api + "editattribute/"+currentId,
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
            url: api + "updateattribute/"+currentId,
            data: {
                'name' : $scope.form.name,
                'url' : $scope.form.url,
                'type' : $scope.form.type,
            },
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/attribute')
        })
    }
});


app.controller('configureattributeCtrl', function($scope,$http,$location,$route,$routeParams) {
    var currentId = $routeParams.name;
    $scope.attribute
    $scope.currentId = currentId
    $http({
        method: 'GET',
        url: api + "configureattribute/"+currentId,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.attribute = data.data
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
    $scope.deleteattribute = function(id) {
        $http({
            method: 'GET',
            url: api + "deleteconfigureattribute/"+id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            $route.reload()
        })
    }
});

app.controller('configurecreateCtrl', function($scope,$http,$location,$route,$routeParams) {
    $scope.attribute
    var currentId = $routeParams.name;
    $http({
        method: 'GET',
        url: api + "editattribute/"+currentId,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.attribute = data.data
        //console.log($scope.attribute)
    })
    $scope.submitForm = function() {
        console.log($scope.form)
        var img = '';
        var images = {}
        if ($scope.attribute.type == 'image') {
            img = JSON.parse($('[name="image"]').val())
            for (var i = 0; i < img.length; i++) {
                images[i] = img[i]
            }
            img = images
        }
        console.log(img)
        var form = {
            name : $scope.form.name,
            attribute_id : currentId,
            image : img,
            text : $('[name="text"]').val(),
            color : $('[name="color"]').val(),
        }
        $http({
            method: 'POST',
            //cache: false,
            url: api + "createconfigure",
            data: form,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/attribute/configure/'+currentId)
        })
    }
});

app.controller('configureeditCtrl', function($scope,$http,$location,$route,$routeParams) {
    $scope.attribute
    $scope.form
    var currentId = $routeParams.name;
    var termId = $routeParams.term;
    $http({
        method: 'GET',
        url: api + "editattribute/"+currentId,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.attribute = data.data
        //console.log($scope.attribute)
    })
    $http({
        method: 'GET',
        url: api + "editconfigure/"+termId,
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.form = data.data
        if ($scope.attribute.type == 'image') {
            var imgId = $scope.form.image[0]
            var imgSrc = $('#'+imgId).attr('src')
            $('.showSelectedImages').append('<ul><li><img src="'+imgSrc+'" width="100px" height="100px"></li></ul>')
            console.log(imgId)
        }
        //console.log($scope.attribute)
    })
    $scope.submitForm = function() {
        console.log($scope.form)
        var img = '';
        var images = {}
        if ($scope.attribute.type == 'image') {
            img = JSON.parse($('[name="image"]').val())
            for (var i = 0; i < img.length; i++) {
                images[i] = img[i]
                if (img[i].id) {
                    images[i] = img[i].id
                }
            }
            img = images
        }
        console.log(img)
        var form = {
            name : $scope.form.name,
            image : img,
            text : $scope.form.text,
            color : $scope.form.color,
        }

        console.log(form)
        $http({
            method: 'POST',
            //cache: false,
            url: api + "updateconfigure/"+termId,
            data: form,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/attribute/configure/'+currentId)
        })
    }
});


app.controller('productCtrl', function($scope,$http,$location,$route) {
    $scope.product
    $http({
        method: 'GET',
        url: api + "product",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.product = data.data
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
    $scope.deleteattribute = function(id) {
        $http({
            method: 'GET',
            url: api + "deleteproduct/"+id,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            $route.reload()
        })
    }
});

app.controller('createproductCtrl', function($scope,$http,$location) {
    $scope.category
    $http({
        method: 'GET',
        url: api + "category",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.category = data.data
    });
    $scope.tags
    $http({
        method: 'GET',
        url: api + "tags",
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        }
    }).then(function(data, status, headers, config) {
        $scope.tags = data.data
    });
    setTimeout(function() {
        $('input[data-toggle="toggle"]').bootstrapToggle({
            on: 'Yes',
            off: 'No'
        });
        reload_js('assets/plugins/bootstrap-wizard/jquery.backstretch.min.js');
        reload_js('assets/plugins/bootstrap-wizard/form.scripts.js');
    })
    $scope.submitForm = function() {
        var form = $scope.form
        var img = '';
        var images = {}
        img = $('[ng-model="form.featured_img"]').val()
        if (img) {
            img = JSON.parse($('[ng-model="form.featured_img"]').val())
            for (var i = 0; i < img.length; i++) {
                images[i] = img[i].id
            }
            img = images
            form.featured_img = img
        }

        var img = '';
        var images = {}
        img = $('[ng-model="form.gallery"]').val()
        if (img) {
            img = JSON.parse($('[ng-model="form.gallery"]').val())
            for (var i = 0; i < img.length; i++) {
                images[i] = img[i].id
            }
            img = images
            form.gallery = img
        }

        var img = '';
        var images = {}
        img = $('[ng-model="form.mobile_featured_img"]').val()
        if (img) {
            img = JSON.parse($('[ng-model="form.mobile_featured_img"]').val())
            for (var i = 0; i < img.length; i++) {
                images[i] = img[i].id
            }
            img = images
            form.mobile_featured_img = img
        }

        var img = '';
        var images = {}
        img = $('[ng-model="form.mobile_gallery"]').val()
        if (img) {
            img = JSON.parse($('[ng-model="form.mobile_gallery"]').val())
            for (var i = 0; i < img.length; i++) {
                images[i] = img[i].id
            }
            img = images
            form.mobile_gallery = img
        }

        var array = {}
        var cat = form.category
        for (var i = 0; i < cat.length; i++) {
            array[i] = cat[i]
        }
        cat = array
        form.category = cat

        var array = {}
        var tags = form.tags
        for (var i = 0; i < tags.length; i++) {
            array[i] = tags[i]
        }
        tags = array
        if($('[ng-model="form.featured"]:checked')){
            form.featured = 1
        }
        if($('[ng-model="form.deal"]:checked')){
            form.deal = 1
        }
        form.tags = tags

        console.log(form)
        $http({
            method: 'POST',
            //cache: false,
            url: api + "createproduct",
            data: form,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).then(function(data, status, headers, config) {
            console.log(data.data)
            $location.path('/product')
        })
    }
})
