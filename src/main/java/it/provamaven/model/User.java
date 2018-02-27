/**
 * Created by si2001 on 03/03/17.
 */

package it.provamaven.model;

import org.springframework.format.annotation.DateTimeFormat;

import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.util.Date;



@Entity
@Table( name = "user",schema = "Prova")
public class User {
    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private int id;

@Column (name = "nome")
    private String nome;

@Column (name = "cognome")
    private String second;

@Column(name="birthdate")
@DateTimeFormat(pattern="dd/MM/yyyy")
    private Date birthdate;

@Column (name = "country")
@NotNull
    private String country;

@Column (name = "city")
@NotNull
    private String city;

@Column (name = "phone")
@NotNull
    private String phone;

@Column(name="thereIsImage")
private String thereIsImage;



    public User(String nm , String cg) {
        nome = nm;
        second = cg;

    }
    public User(int idn,String nm , String cg,String ct,String cty,String pn,Date bt) {
        nome = nm;
        second = cg;
        city=ct;
        id=idn;
        country=cty;
        phone=pn;
        birthdate=bt;


    }

    public User(){}





    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getFirstname() {
        return nome;
    }

    public void setBirthdata(Date dt){ this.birthdate=dt; }
    public Date getBirthdata (){ return birthdate;}

    public void setCountry(String dt){ this.country=dt; }
    public String getCountry (){ return country;}
    public void setCity(String dt){ this.city=dt; }
    public String getCity(){ return city;}

    public void setPhone(String pn){ this.phone=pn; }
    public String getPhone(){ return phone;}

    public void setFirstname(String nm) {
        this.nome = nm;
    }

    public String getLastname() {
        return second;
    }

    public void setLastname(String cg){
        this.second = cg;
    }

    public String getThereIsImage(){return thereIsImage;}
    public void setThereIsImage(String img){this.thereIsImage=img;}

}

