/**
 * Created by massimo_buonocore on 11/04/17.
 */
'use strict';


/**
 * @return object Json
 */

// -------------------- AppUser Service -----------------------
appUser.factory('userService', function ($resource) {
    /**
     * this Factory userService i used for Actions (get,delete,add,ecc..) a users
     */
    // ------- Url Server -------
    var url = "http://localhost:8080/user";



    /* --------- return actions method user --------------
    * return one object Json in angularJs controller*/

    return $resource(url + "/:id", {id: "@id"},{
            update: {
                method: 'PUT'
            }

        });

}).factory('userRandom', function ($resource) {
    /**
     * this Factory 'userRandom' i used for get 3 users random form site randomApi.com
     */
    // ------- Url Server -------
    var url = "https://randomapi.com/api/b922562139e32f3a0ab3d3e0c6cac1cf";


    /* --------- return actions method user --------------
     * return one object Json in angularJs controller*/

    return $resource(url + "/:id", {id: "@id"},{
        update: {
            method: 'PUT'
        }

    });

}).service('image', function ($http) {
    /**
     * this Service 'image' i used for must upload,delete and search image on server
     */

    /**
     * this method use for upload image on server
     * @param file is file the type image selected to user
     * @param idUser is user what have update image or add image
     * @param uploadUrl is path URL to send image on server spring
     */
    this.uploadFileImage = function(file,idUser,uploadUrl){

        /*create formDate file with in content file image*/
        var fd = new FormData();
        fd.append('file', file);

        /*recall service http post,type content Multipart*/
        $http.post(uploadUrl,fd, {
            params: { id: idUser },
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).then(function () {
            console.log('.........Success Upload Image....... ');
        });
    };

    /**
     * this method use for delete image on server
     * @param id is User identity on which to delete the image
     * @param uploadUrl is path URL to send image on server spring
     */
    this.deleteFileImage = function(id,uploadUrl){

        /*recall service http post,type content Multipart*/
        $http.delete(uploadUrl, {
            params: { id: id},
            headers: {'Content-Type': undefined},
            transformRequest: angular.identity
        }).then(function () {
            console.log('......... Delete Image ....... ');
        });
    };

});

//--------------------------End AppUser Service ------------------------------