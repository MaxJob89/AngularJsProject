package it.provamaven.service;

/**
 * Created by massimo_buonocore on 23/03/17.
 */
import java.util.List;

import it.provamaven.dao.UserDao;
import it.provamaven.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


@Service("UserService")
@Transactional
public class UserImp implements UserService {

    @Autowired
    private UserDao dao;

    public User findById(int id) {
        return dao.findById(id);
    }

    public void saveUser(User utent) {
        dao.saveUser(utent);
    }


    public void updateUser(User utent) {
        User entity = dao.findById(utent.getId());
        if(entity!=null){
            entity.setFirstname(utent.getFirstname());
            entity.setBirthdata(utent.getBirthdata());
            entity.setLastname(utent.getLastname());
            entity.setCountry(utent.getCountry());
            entity.setCity(utent.getCity());
            entity.setPhone(utent.getPhone());
            entity.setThereIsImage(utent.getThereIsImage());
        }

    }

    public void deleteUserId(int id) {
        dao.deleteUserId(id);
    }

    public List<User> findAllUsers() {
        return dao.findAllUsers();
    }


    @Autowired
    public void setDao(UserDao dao){
        this.dao=dao;
    }

}