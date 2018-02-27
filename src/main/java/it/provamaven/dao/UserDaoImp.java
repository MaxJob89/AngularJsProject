package it.provamaven.dao;

/**
 * Created by massimo_buonocore on 24/03/17.
 */
import it.provamaven.model.User;
import org.springframework.stereotype.Repository;

import javax.persistence.TypedQuery;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Predicate;
import javax.persistence.criteria.Root;
import java.util.List;


@Repository("UserDao")
public class UserDaoImp extends DAO<User> implements UserDao {

    public User findById(int id) {
        CriteriaBuilder criteria=getSession().getCriteriaBuilder();
        CriteriaQuery<User> sql = criteria.createQuery(User.class);
        Root<User> sqlRoot= sql.from(User.class);
        Predicate sqlQuery=criteria.equal(sqlRoot.get("id"),id);
        sql.where(sqlQuery);

         return getSingleResult(sql);

    }

    public void saveUser(User utent) {
        save(utent);
    }


    public void deleteUserId(int id) {
        CriteriaBuilder criteria=getSession().getCriteriaBuilder();
        CriteriaQuery<User> sql = criteria.createQuery(User.class);
        Root<User> sqlRoot= sql.from(User.class);
        Predicate sqlQuery=criteria.equal(sqlRoot.get("id"),id);
        sql.where(sqlQuery);

        User user= getSingleResult(sql);
        delete(user);

    }


    @SuppressWarnings("unchecked")

    public List<User> findAllUsers() {

        return selectAll(User.class);

    }


}
