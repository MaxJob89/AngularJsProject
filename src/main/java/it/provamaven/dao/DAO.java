package it.provamaven.dao;

import org.hibernate.Session;
import org.hibernate.SessionFactory;
import org.springframework.beans.factory.annotation.Autowired;

import javax.persistence.criteria.CriteriaQuery;
import java.util.List;

public abstract class DAO<T> {

    @Autowired
    private SessionFactory sessionFactory;

    protected Session getSession(){
        return sessionFactory.getCurrentSession();
    }

    public T save(T entity) {
        return (T) getSession().save(entity);
    }

    public void update(T entity) {
        getSession().update(entity);
    }

    public void delete(T entity) {
        getSession().delete(entity);
    }

    public List<T> selectAll(Class c){
        CriteriaQuery<T> query = getSession().getCriteriaBuilder().createQuery(c);
        query.from(c);
        return getListResult(query);
    }



    public List<T> getListResult(CriteriaQuery<T> query){
        return getSession().createQuery(query).getResultList();
    }

    public T getSingleResult(CriteriaQuery<T> query){
        return getSession().createQuery(query).getSingleResult();
    }
}

