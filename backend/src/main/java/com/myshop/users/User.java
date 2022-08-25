package com.myshop.users;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.myshop.roles.Role;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.extern.slf4j.Slf4j;
import javax.persistence.*;
import javax.transaction.Transactional;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;

@Entity
@NoArgsConstructor
@Transactional
@Slf4j
@Getter
@Setter
@Table(name = "users",
        indexes = @Index(columnList = "username", unique = true))
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    @NotNull(message = "Name is required")
    private String name;
    @NotNull(message = "Username is required")
    @Column(unique = true)
    private String username;
    @NotNull(message = "Password is required")
    private String password;
    @ManyToMany(fetch = FetchType.EAGER)
    private Collection<Role> roles = new ArrayList<>();
    @Column(name = "created_at")
    private Date createdAt;
    @Column(name = "updated_at")
    private Date updatedAt;
    @Column(name = "deleted_at")
    private Date deletedAt;

    public User(String name, String username, String password, Collection<Role> roles) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.roles = roles;
        this.createdAt = new Date(System.currentTimeMillis());
    }

    public User(String name, String username, String password) {
        this.name = name;
        this.username = username;
        this.password = password;
        this.createdAt = new Date(System.currentTimeMillis());
    }

    @Override
    public String toString() {
        return "User{" +
                ", name='" + name + '\'' +
                ", username='" + username + '\'' +
                ", roles=" + roles +
                '}';
    }

    @JsonIgnore
    public String getPassword() {
        return password;
    }

    @JsonSetter
    public void setPassword(String password) {
        this.password = password;
    }

    @JsonIgnore
    public Long getId() {
        return id;
    }

    @JsonSetter
    public void setId(Long id) {
        this.id = id;
    }

}
