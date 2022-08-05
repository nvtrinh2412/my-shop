package com.myshop.products;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;

@DataMongoTest
class ProductRepositoryTest {
    @Autowired
    ProductRepository productRepository;
    @Test
    void findProductByNameId() {
        Product product = new Product("Testing", 100, "image", List.of("red", "blue", "green"), "This is a test product");
        productRepository.save(product);
        Optional<Product> product1 = productRepository.findProductByNameId("Testing");
        assertEquals(product1.get().getName(), "Testing");
    }

    @Test
    void findProductByName() {
        Product product = new Product("Testing", 100, "image", List.of("red", "blue", "green"), "This is a test product");
        productRepository.save(product);
        Optional<List<Product>> product1 = productRepository.findProductByName("Testing");
        assertEquals(product1.get().get(0).getName(), "Testing");
    }
}