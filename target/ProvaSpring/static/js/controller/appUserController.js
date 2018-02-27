/**
 * Created by massimo_buonocore on 11/04/17.
 */
'use strict';

/**
 * -------------------- AppUser Controller User -----------------------
 *
 * @param userService get service $resource from app factory
 */
appUser.controller('userController',function ($scope,userService,userRandom,image,$stateParams,$state,$filter,$location) {

    /**
     *  Var usersList They contain the all users objects
     *  Var singleUser i use for get user temporally
     *  Var searchUser is the input the type text for use search user in home page
     *  Var usersListOrder is object what contain all user after action
     *  Var check is array what contain user selected and multi-select
     *  Var selectPage is array contain all number the user for page
     *  Var userForPage contain the actually view the user for page
     *  Var orderField use for action the order alphabet end manage view triangle
     *  Var
     *  Var
     *  Var
     *  Var
     *  Var
     *  Var
     *  Var
     *  Var
     *  Var
     *  Var
     *  Var
     *  Var
     *  Var
     *  Var
     */
    $scope.usersList={};
    $scope.singleUser={};
    $scope.searchUser={};
    $scope.usersListOrder={};
    $scope.check=[];
    $scope.selectPage=["5","10","20","50","100"];
    $scope.numUserForPage=$scope.selectPage[0];
    $scope.orderField='';
    $scope.numPage=1;
    $scope.maxDate=new Date().toISOString().split('T')[0];
    $scope.maxNumPage=1;
    $scope.controlPage=false;
    $scope.editPage=false;
    $scope.total=0;
    $scope.beginning=0;
    $scope.numCurrentUser=-1;
    $scope.orderAscDec= false;
    $scope.checkOnOff=false;
    $scope.numClickCheck=0;
    $scope.numClick=0;
    $scope.up="glyphicon glyphicon-triangle-top";
    $scope.down="glyphicon glyphicon-triangle-bottom";
    $scope.selectCol="colSelect";
    $scope.selectRow="rowSelect";
    $scope.imageUser={};

    /*---------------- Basic Control-------------- */
    if($stateParams.id==null)
    {
        /**
         * function query() return object all users
         */
        userService.query().$promise.then(function (users) {
            $scope.usersList=users;
            $scope.usersListOrder=$scope.usersList;
            $scope.userForPage();
        });
    }
    else{
        /**
         * function get(param it is user ID) return object one user
         */
        userService.get({id: $stateParams.id}).$promise.then(function (data) {
            $scope.singleUser=data;
            $scope.singleUser.birthdata=new Date($scope.singleUser.birthdata);
            /*get image on server and reject the ng-src*/
            $scope.imageUser=$scope.singleUser.thereIsImage;
        });


}

    /**
     * This if view manage input in page addUser
     */
    $scope.localUrl=$location.path();
    if($scope.localUrl.indexOf("/view")>-1)
        $scope.view=true;
    /*this code use for control name in the view*/
    if($scope.localUrl.indexOf("/edit")>-1)
        $scope.editPage=true;

    /*---------------- End Basic Control-------------- */


    /*------------------- Pagination -------------*/

    /**
     * this function use for the pagination
     */
    $scope.userForPage = function () {

        /*Check the contents of the filter variable*/
        if (Object.getOwnPropertyNames($scope.searchUser).length == 0)
        /*get length total user*/
            $scope.total = $scope.usersList.length;
        else
        /*get length total user*/
            $scope.total = $scope.usersListOrder.length;

        $scope.totalPage();
    };


    /**
     * this function use for calculation total number page
     */
    $scope.totalPage=function () {


        /*control if the list is empty*/
        if($scope.total==0)
        {
            $scope.numPage=1;
            $scope.currentUser=0;
            $scope.numCurrentUser=0;
        }
        else
        {
            /*control if number page in the range from 1 to maxNumPage*/
            if($scope.numPage>0 || $scope.numPage<$scope.maxNumPage)
            {
                /* variable for view in footer*/
                $scope.currentUser=(parseInt($scope.numUserForPage)*$scope.numPage)-parseInt($scope.numUserForPage)+1;
                $scope.numCurrentUser=parseInt($scope.numUserForPage)*$scope.numPage;
            }
        }

        $scope.beginning=$scope.currentUser-1;

        /*control for number users last page*/
        if($scope.numCurrentUser>$scope.total)
            $scope.numCurrentUser=$scope.total;

        /*calculating max number page*/
        $scope.maxNumPage=Math.ceil($scope.total / parseInt($scope.numUserForPage));
        /*control if there is more page*/
        if($scope.total>0)
        /*recall function manage checkbox*/
            checkAll();
        else
            $scope.checkOnOff=false;
    };

    /**
     * function use for return begin page
     */
    $scope.begin=function () {
        if($scope.numPage!=1)
        {
            $scope.numPage=1;
            /**
             * recall function for pagination
             */
            $scope.userForPage();
        }
        else
            /**
             * recall function for pagination
             */
            $scope.userForPage();

    };

    /**
     * function use for back one page
     */
    $scope.back=function () {
        if($scope.numPage > 1)
        {
            $scope.numPage--;
            /**
             * recall function for pagination
             */
            $scope.userForPage();
        }

    };

    /**
     * function use for next one page
     */
    $scope.next=function () {
        if($scope.numPage<$scope.maxNumPage)
        {
            $scope.numPage++;
            /**
             * recall function for pagination
             */
            $scope.userForPage();
        }

    };

    /**
     * function use go last page
     */
    $scope.end=function () {
        if($scope.numPage!=$scope.maxNumPage)
        {
            $scope.numPage=$scope.maxNumPage;
            /**
             * recall function for pagination
             */
            $scope.userForPage();
        }

    };

    /*--------------------- End Pagination ----------------------*/



    /*-------------------------- Filter ----------------------*/
    /**
     * this function clean search text this field in use
     */
    $scope.cleanSearch=function () {
        $scope.searchUser={};
        $scope.usersListOrder=$scope.usersList;
        $scope.begin();
        $scope.userForPage();
        /*recall function manage checkbox*/
        checkAll();

    };


    /**
     * The function order of display of a field
     */
    $scope.orderBy=function (field,bool) {
        /**
         * In case of changing the sorting of the field
         * if change name field, change value click,name field and order boolean
         */
        if(field!=$scope.orderField )
        {
            $scope.numClick=1;
            $scope.orderAscDec= false;
            $scope.orderField=field;


        }
        /**
         * When ordering the sorting of the same field
         * change value boolean variable and sum one numClick
         */
        else
        {
            $scope.orderField=field;
            $scope.orderAscDec=bool;
            $scope.numClick++;
        }
        /**
         * if it's click 3 times enter in default order
         */
        if($scope.numClick==3 )
        {
            $scope.numClick=0;
            $scope.orderAscDec= false;
            $scope.orderField='';
            $scope.filterSearch();
        }

        /**
         * filter for orderBy with field
         */

        /*Check the contents of the filter variable*/
        $scope.usersListOrder = $filter('orderBy')($scope.usersListOrder, $scope.orderField, $scope.orderAscDec);
        /*recall function manage checkbox*/
        checkAll();
    };

    /**
     * The function filter search the insert text
     */
    $scope.filterSearch=function () {

        var filter = angular.copy($scope.searchUser);
        delete filter.birthDate;
        $scope.usersListOrder = $filter('filter')($scope.usersList,filter);
        /**
         * This handles filter date
         * var searchListOrder is array order in filter
         * var user is the object user
         */
        if($scope.searchUser.birthDate){
            $scope.usersListOrder = $filter('filter')($scope.usersListOrder, function (user) {
                var userBirthDate = $filter('date')(user.birthdata, 'dd/MM/yyyy');
                return userBirthDate.indexOf($scope.searchUser.birthDate) > -1;
            });
        }
        /**
         * recall function orderBy in (a-z, z-a)
         */
        $scope.orderBy($scope.orderField,$scope.orderAscDec);
        $scope.userForPage();


    };

    /*----------------------------- End Filter ---------------------------*/


    /*------------ Action -----------------*/



    /**
     * @param user in one user select
     * This function role the check user select and multiselect
     */
    $scope.userCheck=function (user) {

        /**
         * Let's check if we click on the check all
         */
        if (user == null)
        {
            /*insert user only if the user is absent*/
            angular.forEach($filter('limitTo')($scope.usersListOrder,parseInt($scope.numUserForPage), $scope.beginning), function (thisUser) {
                if ($scope.check.indexOf(thisUser) == -1 && $scope.checkOnOff)
                    $scope.check.push(thisUser);

                /*Update value the checkbox users*/
                thisUser.selectCheck = $scope.checkOnOff;
            });

            /*When we deselect everything */
            if (!$scope.checkOnOff)
            {
                $scope.check = [];
                /*reset variable the control button delete*/
                $scope.controlPage=false;
            }

        }
        else
        {
            /**
             * create other array check which contains selected users
             */
            if(user.selectCheck)
                $scope.check.push(user);
            else
            {
                /**
                 * delete user deselected
                 */
                $scope.check.splice($scope.check.indexOf(user),1);
                /*reset variable the control button delete*/
                $scope.controlPage=false;
            }

            /*recall function manage checkbox*/
            checkAll();
        }

    };

    /**
     * this method use for menage checkbox and your comportment
     */
    function checkAll() {
        $scope.checkOnOff = true;
        /*watch the checkbok user and invert the checkbox all*/
        angular.forEach($filter('limitTo')($scope.usersListOrder, parseInt($scope.numUserForPage), $scope.beginning), function (thisUser) {
            $scope.checkOnOff &= thisUser.selectCheck;
            /*control only if user is select*/
            if (thisUser.selectCheck)
            /*set variable the control button delete*/
                $scope.controlPage = thisUser.selectCheck;
        });
        /*convert in boolean the value*/
        $scope.checkOnOff = !!$scope.checkOnOff;

    }


    /**
     *@param form is true or false for control fields
     * @param user object where the user is contained
     * @param click manage the click event and the What action to perform
     * @return void
     */
    $scope.addUser = function (user, click, form) {
        if (form) {
            /*control if user is valid*/
            if (user != null) {

                /**
                 * function update(
                 * @input user this object user to update in dbms
                 * @input function is execute the update in the service update
                 * ) return one object user
                 */
                if (user.id != null){

                    if($scope.imageUser)
                        /*recall method for upload image this user*/
                        $scope.upload(user.id);

                    userService.update(user, function () {
                    }).$promise.then(function (userSingle) {
                        console.log('......Update OK........');

                        /**
                         * function manage the event button click
                         */
                        if (click)
                            $state.go('list');
                        else
                            $state.go('editUser', {id: userSingle.id});


                    });
                }
                else
                {
                    /**
                     * function save(
                     * @input user this object user to save in dbms
                     * @input function is execute the save in the service save
                     * ) return response http
                     */
                    userService.save(user, function () {
                    }).$promise.then(function (userSingle) {
                        console.log('......Create user OK........');

                        if($scope.imageUser)
                            /*recall method for upload image this user*/
                            $scope.upload(userSingle.id);

                        if (!click)
                            $state.go('editUser', {id: userSingle.id});
                        else
                            $state.go('list');
                    });
                }
            }
        }//close if form
    };


    /**
     * This function is executed when checks are checked and click on delete
     */
    $scope.deleteAll=function () {
        var ans=confirm("Confirm deletion?");
        if(ans)
            angular.forEach($scope.check,function (user) {
                /**
                 * recall function delete for all user present in check array
                 */
                $scope.deleteUser(user);
            });
        /**
         * Reset variable default
         */
        $scope.check=[];
        $scope.checkOnOff=false;
        $scope.userCheck(null);
        $scope.userForPage();
    };


    /**
     * function delete return void
     */
    $scope.deleteUser=function (user) {
        /**
         * Promise use for delete one object user
         */
        userService.delete({id: user.id}).$promise.then(function () {
            /**
             * splice use for delete user in the array usersList
             * So that you upgrade your view
             */

            // $scope.usersList.splice($scope.usersList.indexOf(user),1);
            $scope.usersListOrder.splice($scope.usersListOrder.indexOf(user),1);
            console.log('......Delete OK.......');
            $scope.userForPage();
            $scope.begin();
            $scope.deleteImage(user.id);
        });

    };//close method deleteUser


    /**
     * function for create 3 users in random mode
     */
    $scope.randomUser=function () {
        for (var i=0;i<3;i++)
            /**
             * Promise get the user in api site randomapi.com for create random user
             */
            userRandom.get().$promise.then(function (data) {
                /**
                 * promise for save user
                 */
                userService.save(data.results[0],function () {
                }).$promise.then(function (data) {
                    console.log('....... Create OK ..........');
                    /*Update object Json beginner*/
                    $scope.usersList.push(data);
                    $scope.usersListOrder=$scope.usersList;
                    /*recall pagination*/
                    $scope.userForPage();
                });
            });

    };


    /**
     * this method use for upload image on server and call service $http.post
     */
    $scope.upload= function(idUser){
        var file = $scope.imageUser;
        var uploadUrl = "/user/pictures";
        image.uploadFileImage(file,idUser,uploadUrl);
    };


    /**
     * this method use for delete image on server and call service $http.delete
     */
    $scope.deleteImage= function(id){
        var uploadUrl = "/user/pictures";
        image.deleteFileImage(id,uploadUrl);
    };

    /*------------ End Action -----------------*/
});

/** -------------------- End Controller User -----------------------*/
