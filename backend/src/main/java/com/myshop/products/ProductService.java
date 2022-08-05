package com.myshop.products;

import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.TextCriteria;
import org.springframework.data.mongodb.core.query.TextQuery;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;
//    private final MongoTemplate mongoTemplate;
    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    public Product addNewProduct(Product newProduct) {
        productRepository.save(newProduct);
        return newProduct;
    }

    public Product findProductByNameId(String nameId) {
        Optional productData = productRepository.findProductByNameId(nameId);
        if (productData.isPresent()) {
            return (Product) productData.get();
        } else {
            return null;
        }
    }

    public Product findAndUpdateProduct(String nameId, Product newProduct) {
        Product product = findProductByNameId(nameId);
        if (product != null) {
            product.updateWith(newProduct);
            productRepository.save(product);
            return product;
        } else {
            return null;
        }

    }


    public void deleteAllProducts() {
        productRepository.deleteAll();
    }

    public void deleteProduct(Product product){
        productRepository.delete(product);
    }

    public List<Product> findProductByName(String name){
        Optional<List<Product>> products = productRepository.findProductByName(name);
        if(products.isPresent()){
            return products.get();
        }
        return null;
    }

    public Page<Product> paginate(Pageable page){
        return productRepository.findAll(page);
    }

}
