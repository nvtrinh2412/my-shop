package com.myshop.products;

import com.myshop.common.SLUGIFY;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "products")
public class Product {

    @Id
    private String id;
    @Indexed(unique = true)
    private String nameId;
    private String name;
    private Integer price;
    private String imageUrl;
    private List<String> color;
    private List<String> size;



    private String description;




    public Product(String name, Integer price, String imageUrl, List<String> color, String description) {
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.color = color;
        this.description = description;
        this.nameId = SLUGIFY.toSlug(name);
    }
    public void updateWith(Product newProduct){
        this.setName(newProduct.getName());
        this.setNameId(newProduct.getNameId());
        this.setPrice(newProduct.getPrice());
        this.setDescription(newProduct.getDescription());
        this.setColor(newProduct.getColor());
        this.setSize(newProduct.getSize());
    }

    public void setId(String id) {
        this.id = id;
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
    public List<String> getSize() {
        return size;
    }

    public void setSize(List<String> size) {
        this.size = size;
    }

    public String getId() {
        return id;
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
        return nameId;
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
