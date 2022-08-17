package com.myshop.products;

import com.myshop.utils.SLUGIFY;

import javax.persistence.*;
import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import java.util.List;

@Entity
@Table( name = "products",
        indexes =@Index(columnList = "name_id", unique = true))

public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(name = "id", nullable = false)
    private Long id;
    @Column(name = "name_id", nullable = false)
    @NotBlank(message = "Name is required")
    private String nameId;
    @NotNull
    private String name;
    @NotNull
    private float price;
    @NotNull
    private String imageUrl;
    @ElementCollection
    private List<String> color;
    @ElementCollection
    private List<String> size;
    private String description;

    public Product(String name, float price, String imageUrl, List<String> color, String description) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.color = color;
        this.description = description;
        this.nameId = SLUGIFY.toSlug(name);
    }
    public Product() {

    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void updateWith(Product newProduct) {
        this.setName(newProduct.getName());
        this.setNameId(newProduct.getNameId());
        this.setPrice(newProduct.getPrice());
        this.setDescription(newProduct.getDescription());
        this.setColor(newProduct.getColor());
        this.setSize(newProduct.getSize());
    }

    public String getNameId() {
        return nameId;
    }

    public void setNameId(String nameId) {
        this.nameId = nameId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public float getPrice() {
        return price;
    }

    public void setPrice(float price) {
        this.price = price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public List<String> getColor() {
        return color;
    }

    public void setColor(List<String> color) {
        this.color = color;
    }

    public List<String> getSize() {
        return size;
    }

    public void setSize(List<String> size) {
        this.size = size;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    @Override
    public String toString() {
        return "Product{" +
                "id='" + id + '\'' +
                ", nameId='" + nameId + '\'' +
                ", name='" + name + '\'' +
                ", price=" + price +
                ", imageUrl='" + imageUrl + '\'' +
                ", color=" + color +
                ", size=" + size +
                ", description='" + description + '\'' +
                '}';
    }


}
