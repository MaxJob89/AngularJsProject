package it.provamaven.dao;

/**
 * Created by massimo_buonocore on 23/03/17.
 */

import it.provamaven.model.User;
        import org.hibernate.query.Query;

        import java.util.List;



public interface UserDao    {

    User findById(int id);

    void saveUser(User utent);


    void deleteUserId(int id);



    List<User> findAllUsers();


}