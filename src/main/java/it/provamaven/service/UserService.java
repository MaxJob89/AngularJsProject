package it.provamaven.service;

/**
 * Created by massimo_buonocore on 23/03/17.
 */

    import it.provamaven.dao.UserDao;
    import it.provamaven.model.User;
    import org.hibernate.query.Query;

    import java.util.List;

public interface UserService {

    User findById(int id);

    void saveUser(User utent);

    void updateUser(User utent);

    void deleteUserId(int id);

    List<User> findAllUsers();



    public void setDao(UserDao dao);


}