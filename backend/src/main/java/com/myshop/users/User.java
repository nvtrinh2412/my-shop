package com.myshop.users;

import com.myshop.roles.Role;
import lombok.*;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.validator.constraints.UniqueElements;

import javax.persistence.*;
import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@NoArgsConstructor
@Transactional
@Slf4j

@Table(name = "users" ,
        indexes =@Index(columnList = "username", unique = true))
public class User {
    @Id @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @NotNull
    private Long id;
    @NotNull(message = "Name is required")
    private String name;

    @NotNull(message = "Username is required")
    @UniqueElements
    private String username;
    @NotNull(message = "Password is required")
    private String password;
    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();

    public User(String name, String username, String password, Collection<Role> roles) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.roles = roles;
    }

    @Override
    public String toString() {
        return "User{" +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", password='" + password + '\'' +
                ", roles=" + roles +
                '}';
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    public Collection<Role> getRoles() {
        return roles;
    }

    public void setRoles(Collection<Role> roles) {
        this.roles = roles;
    }
}
