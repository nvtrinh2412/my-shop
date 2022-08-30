package com.myshop.categories;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;

@Entity
@Setter
@Getter
@Table(name = "categories",
        indexes = {
                @Index(columnList = "id", unique = true),
                @Index(columnList = "name")
        })
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    private Long id;
    @Column(name = "name", nullable = false)
    private String name;
    @Column(name = "description")
    private String description;

    public Category(String name, String description) {
        this.name = name;
        this.description = description;
    }

    public Category() {

    }

    @JsonIgnore
    public Long getId() {
        return this.id;
    }

    @JsonSetter
    public void setId(Long id) {
        this.id = id;
    }

}

