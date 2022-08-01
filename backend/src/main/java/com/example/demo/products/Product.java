package com.example.demo.products;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document("products")
public class Product {
    @Id
    String Id;
    @Indexed(unique = true)
    String name;
    Integer price;
    String imageUrl;
    List<String> color;
    String description;


    public Product(String name, Integer price, String imageUrl, List<String> color, String description) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.color = color;
        this.description = description;
    }

    public void setId(String id) {
        Id = id;
    }


    public void setName(String name) {
        this.name = name;
    }

    public void setPrice(Integer price) {
        this.price = price;
    }

    public void setImageUrl(String imageUrl) {
        this.imageUrl = imageUrl;
    }

    public void setColor(List<String> color) {
        this.color = color;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public String getId() {
        return Id;
    }

    public String getName() {
        return name;
    }

    public Integer getPrice() {
        return price;
    }

    public String getImageUrl() {
        return imageUrl;
    }

    public List<String> getColor() {
        return color;
    }

    public String getDescription() {
        return description;
    }
    public String getNameId(){
        return name.trim().toLowerCase().replace(" ","-");
    }
}
