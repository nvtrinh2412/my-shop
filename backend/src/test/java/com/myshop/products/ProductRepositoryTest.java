package com.myshop.products;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.assertNotNull;

@DataJpaTest
@ExtendWith(MockitoExtension.class)
class ProductRepositoryTest {


    @Autowired
    private ProductRepository productRepository;

    @BeforeEach
    void setUp() {

    }

    @Test
    void findProductByNameId() {
        Product product = new Product("Testing", 100, "image", List.of("red", "blue", "green"), "This is a test product");
        productRepository.save(product);
        Optional<Product> result = productRepository.findProductByNameId("testing");
        System.out.println(productRepository.findAll());
        assertNotNull(result);
    }

    @Test
    void findProductByName() {
        Product product = new Product("Test-find-by-name", 100, "image", List.of("red", "blue", "green"), "This is a test product");
        productRepository.save(product);
        Optional<List<Product>> results = productRepository.findProductByName("Test");
        assertNotNull(results);
    }

}