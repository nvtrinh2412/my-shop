package com.myshop.products;

import com.myshop.MyShopApplication;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.junit.jupiter.api.*;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.data.mongo.DataMongoTest;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.stereotype.Service;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.context.junit4.SpringRunner;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@DataMongoTest
@TestInstance(TestInstance.Lifecycle.PER_CLASS)
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;
    private AutoCloseable autoCloseable;
    private ProductService productService;




    @BeforeAll
    void setUp() {
        autoCloseable = MockitoAnnotations.openMocks(this);
        productService = new ProductService(productRepository);

        Product product = new Product("Testing", 100, "image", List.of("red", "blue", "green"), "This is a test product");
        Product product2 = productService.addNewProduct(product);
    }

    @AfterEach
    void tearDown() throws Exception {
        autoCloseable.close();
    }


    @Test
    void getAllProduct() {
        Product product = new Product("Testing 2", 100, "image", List.of("red", "blue", "green"), "This is a test product");

        productRepository.save(product);

        List<Product> products = productService.getAllProduct();
        List<Product> products2 = productRepository.findAll();
        System.out.println(products);
        System.out.println(products2);
        assertNotEquals(products.size(), 0);

    }

    @Test
    void addNewProduct() {
        Product product = productService.addNewProduct(new Product("Testing", 100, "image", List.of("red", "blue", "green"), "This is a test product"));

    }

    @Test
    void findProductByNameId() {
        Product product = productService.findProductByNameId("testing");
        System.out.println(product);
        assertNotEquals(product, null);
    }

    @Test
    void findAndUpdateProduct() {

    }

    @Test
    void deleteAllProducts() {
    }

    @Test
    void deleteProduct() {
    }

    @Test
    void findProductByName() {
    }

    @Test
    void paginate() {
    }
}