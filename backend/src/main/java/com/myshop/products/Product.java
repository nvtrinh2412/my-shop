package com.myshop.products;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonSetter;
import com.myshop.categories.Category;
import lombok.Getter;
import lombok.Setter;
import javax.persistence.*;
import javax.validation.constraints.NotNull;
import java.sql.Date;
import java.util.List;

@Entity
@Setter
@Getter
@Table(name = "products",
        indexes = {
                @Index(columnList = "id", unique = true),
                @Index(columnList = "name")
        })
public class Product {
    Date createdAt;
    Date updatedAt;
    Date deletedAt;
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    @NotNull(message = "Name is required")
    private String name;
    @NotNull(message = "Price is required")
    private float price;
    @NotNull(message = "ImageURL is required")
    private String imageUrl;
    @ElementCollection
    private List<String> color;
    @ElementCollection
    private List<String> size;
    private String description;
    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;


    public Product() {

    }

    public Product(String name, float price, String imageUrl, List<String> color, String description) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.color = color;
        this.description = description;
        this.createdAt = new Date(System.currentTimeMillis());
    }

    public Product(String name, float price, String imageUrl, List<String> color, List<String> size, String description, Category category) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.color = color;
        this.size = size;
        this.description = description;
        this.category = category;
        this.createdAt = new Date(System.currentTimeMillis());
    }

    public Product(Product product) {
        this.name = product.name;
        this.price = product.price;
        this.imageUrl = product.imageUrl;
        this.color = product.color;
        this.description = product.description;
        this.category = product.category;
        this.createdAt = new Date(System.currentTimeMillis());
    }

    public void updateWith(Product newProduct) {
        this.setName(newProduct.getName());
        this.setPrice(newProduct.getPrice());
        this.setDescription(newProduct.getDescription());
        this.setColor(newProduct.getColor());
        this.setSize(newProduct.getSize());
        this.setImageUrl(newProduct.getImageUrl());
        this.setUpdatedAt(new Date(System.currentTimeMillis()));
    }

    @JsonIgnore
    public Long getId() {
        return id;
    }

    @JsonSetter
    public void setId(Long id) {
        this.id = id;
    }

    @Override
    public String toString() {
        return "Product{" +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", imageUrl='" + imageUrl + '\'' +
                ", color=" + color +
                ", size=" + size +
                ", description='" + description + '\'' +
                '}';
    }

}