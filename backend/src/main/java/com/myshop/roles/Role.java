package com.myshop.roles;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import javax.persistence.*;

@Entity
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
public class Role {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    @Column(name = "name", nullable = false, unique = true)
    private String name;

    @Override
    public String toString() {
        return "Role{" +
                ", name='" + name + '\'' +
                '}';
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

