package com.example.demo.products;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@AllArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getAllProduct(){
        return productRepository.findAll();
    }

    public Product addNewProduct(Product newProduct){
        productRepository.save(newProduct);
        return newProduct;
    }

    public void deleteAllProducts(){
        productRepository.deleteAll();
    }


}
