package com.myshop.products;

import com.myshop.categories.Category;
import lombok.Getter;
import lombok.Setter;
import org.hibernate.annotations.Where;

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
@Where(clause = "deleted_at is NULL")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    @NotNull(message = "Name is required")
    private String name;
    @NotNull(message = "Price is required")
    private float price;
    @NotNull(message = "ImageURL is required")
    @ElementCollection
    private List<String> imageUrl;
    @ElementCollection
    private List<String> color;
    @ElementCollection
    private List<String> size;
    private String description;
    @ManyToOne(fetch = FetchType.EAGER)
    private Category category;
    @Column(name = "created_at")
    private Date createdAt;
    @Column(name = "updated_at")
    private Date updatedAt;
    @Column(name = "deleted_at")
    private Date deletedAt;
    @Column(name = "designer")
    private String designer;
    @Column(name = "sell_quantity")
    private int sellQuantity;


    public Product() {

    }

    public Product(String name, float price, List<String> imageUrl, List<String> color, String description) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.color = color;
        this.description = description;
        this.createdAt = new Date(System.currentTimeMillis());
    }

    public Product(String name, float price, List<String> imageUrl, List<String> color, List<String> size, String description, Category category) {
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
