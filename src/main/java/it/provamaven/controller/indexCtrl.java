package it.provamaven.controller;

/**
 * Created by massimo_buonocore on 22/03/17.
 */
import it.provamaven.model.User;
import it.provamaven.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;

@RestController
@RequestMapping("/user")
public class indexCtrl {

    @Autowired
    UserService serviceUser;

    @Autowired
    MessageSource messageSource;
    /**
     * var directory is folder where container image user
     * var extension is extension images files
     * var header is part header a images files
     */
    private String directory = "/imageProjectAngular/";
    private String extension = ".jpg";
    private String header = "Img-";

    //    ----------- List All Users ---------
    @RequestMapping(value = {""}, method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<List<User>> listUsers() {

        List<User> user = serviceUser.findAllUsers();
        if (user.isEmpty()) {
            return new ResponseEntity<List<User>>(user,HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<List<User>>(user, HttpStatus.OK);
    }


    //-------------- Get a single User -----------------------
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public ResponseEntity<User> getUser(@PathVariable String id) {
        System.out.println("Fetching User with id " + id);
        User user = serviceUser.findById(Integer.parseInt(id));

        if (user == null) {
            System.out.println("User with id " + id + " not found");
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        }
        else {

            String nameImage = header + id + extension;

            /*get path system in use*/
            Path systemPath = Paths.get("");
            String pathImage = systemPath.toAbsolutePath().getParent().toString() + directory + nameImage;
        /* Take the save path of the image and save it on the server */
            File image = new File(pathImage);
            if (image.isFile())
                user.setThereIsImage(directory+nameImage);
            else
                user.setThereIsImage( directory + "emptyImage.png");


            return new ResponseEntity<User>(user, HttpStatus.OK);
        }



    }


    //    ------------ Create a Single User ---------------
    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity<User> createUser(@RequestBody User user) {


        serviceUser.saveUser(user);


        return new ResponseEntity<User>(user, HttpStatus.CREATED);
    }


    //    ------------ Update a Singe User ---------------
    @RequestMapping(value = {"/{id}"}, method = RequestMethod.PUT)
    public ResponseEntity<User> updateUser(@RequestBody User user) {

        User currentUser = serviceUser.findById(user.getId());

        if (currentUser == null) {
            return new ResponseEntity<User>(HttpStatus.NOT_FOUND);
        } else {
            serviceUser.updateUser(user);
            return new ResponseEntity<User>(currentUser, HttpStatus.OK);
        }


    }


    //    ------------ Delete a Single User ---------------
    @RequestMapping(value = {"/{id}"}, method = RequestMethod.DELETE)
    public ResponseEntity deleteUser(@PathVariable String id) {

        User user = serviceUser.findById(Integer.parseInt(id));

        if (user == null) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        } else {
            serviceUser.deleteUserId(Integer.parseInt(id));
            return new ResponseEntity(HttpStatus.NO_CONTENT);
        }


    }


    //----------------- Upload Image on server -------------------------

    /**
     * this method must for upload image on server
     *
     * @param file is params to file image
     * @param id   is id this user when save image
     * @return response entity
     */
    @RequestMapping(value = {"/pictures"}, method = RequestMethod.POST)
    public ResponseEntity singleFileUpload(@RequestParam("file") MultipartFile file, @RequestParam("id") String id) {


        User user = serviceUser.findById(Integer.parseInt(id));


        if (file.isEmpty()) {
            return new ResponseEntity(HttpStatus.NOT_FOUND);
        }


        try {
            /*control if extension the name of file it is present JPG for type image*/
            if (file.getOriginalFilename().contains(".jpg")) {
                /*create path on save file image on server*/
                String nameImage = header + id + extension;

                /*get path system in use for save image on server*/
                Path systemPath = Paths.get("");
                String pathImage = systemPath.toAbsolutePath().getParent().toString() + directory + nameImage;

                // this with method Path
                // byte[] bytes = file.getBytes();

                /* create file image for save it on the server */
                File image = new File(pathImage);
                /*save to server*/
                file.transferTo(image);

                /*control if user exist*/
                if (user != null) {
                    /*setting path user into dbms*/
                    user.setThereIsImage(directory + nameImage);
                    serviceUser.updateUser(user);
                }
                // recall for delete image on server
                // image.delete();

                /*save image with method Path java.io*/
                //Path perc = Paths.get(path +nameImage);
                //Files.write(perc, bytes);
            } else {
                return new ResponseEntity(HttpStatus.NOT_FOUND);
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        return new ResponseEntity(HttpStatus.NO_CONTENT);

    }


    //----------------- Delete Image on server -------------------------
    /**
     * this method must for delete image on server
     *
     * @param id is id this user when delete image
     * @return response entity
     */
    @RequestMapping(value = {"/pictures"}, method = RequestMethod.DELETE)
    public ResponseEntity deleteFileUpload(@RequestParam("id") String id) {

        /*create path on save file image on server*/
        String nameImage = header + id + extension;

        /*get path system in use*/
        Path systemPath = Paths.get("");
        String pathImage= systemPath.toAbsolutePath().getParent().toString()+directory+nameImage;

        /* Take the save path of the image and delete it on the server */
        File image = new File(pathImage);

        //recall for delete image on server
        image.delete();


        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }


}