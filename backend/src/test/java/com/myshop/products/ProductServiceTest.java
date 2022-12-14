package com.myshop.products;

import com.myshop.categories.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.ArgumentCaptor;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.boot.test.context.SpringBootTest;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertNull;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;


@ExtendWith(MockitoExtension.class)
@SpringBootTest
class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;
    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private ProductService productService;


    @BeforeEach
    void setUp() {
        productService = new ProductService(productRepository, categoryRepository);
    }

    @Test
    void canGetAllProduct() {

        List<Product> productsList = new ArrayList<>();
        productsList.add(new Product("Product1", 100, List.of("image"), List.of("red", "blue", "green"), "This is a test product"));
        productsList.add(new Product("Product2", 100, List.of("image"), List.of("red", "blue", "green"), "This is a test product"));
        productsList.add(new Product("Product3", 100, List.of("image"), List.of("red", "blue", "green"), "This is a test product"));
        productsList.add(new Product("Product4", 100, List.of("image"), List.of("red", "blue", "green"), "This is a test product"));
        productsList.add(new Product("Product5", 100, List.of("image"), List.of("red", "blue", "green"), "This is a test product"));

        when(productRepository.findAll()).thenReturn(productsList);

        List<Product> result = productService.getAllProduct();

        assertThat(result.size()).isEqualTo(productsList.size());

        verify(productRepository).findAll();
    }

    @Test
    void addNewProduct() {
        Product product = new Product("Testing", 100, List.of("image"), List.of("red", "blue", "green"), "This is a test product");
        Product addedProduct = productRepository.save(product);

        ArgumentCaptor<Product> argument = ArgumentCaptor.forClass(Product.class);
        verify(productRepository).save(argument.capture());
        Product capturedProduct = argument.getValue();

        assertEquals(product, capturedProduct);
    }

    @Test
    void findAndUpdateProduct() {

        float testPrice = 200;
        Product product = new Product("Long T-shirt", 100, List.of("image"), List.of("red", "blue", "green"), "This is a test product");
        Product updatedProduct = new Product("Long T-shirt", testPrice, List.of("image"), List.of("red", "blue", "green"), "Product updated");
        when(productRepository.findProductById(product.getId())).thenReturn(Optional.of(product));
        when(productRepository.save(any(Product.class))).thenReturn(product);

        Product result = productService.findAndUpdateProduct(product.getId(), updatedProduct);

        assertThat(result.getPrice()).isEqualTo(testPrice);


        verify(productRepository).findProductById(any(Long.class));
        verify(productRepository).save(any(Product.class));
    }

    @Test
    void deleteAllProducts() {

        List<Product> productsList = new ArrayList<>();

        when(productRepository.findAll()).thenReturn(productsList);
        productService.deleteAllProducts();

        assertThat(productRepository.findAll().isEmpty());

        verify(productRepository).deleteAll();
        verify(productRepository).findAll();
    }

    @Test
    void deleteProduct() {

        Product product = new Product("Long T-shirt", 100, List.of("image"), List.of("red", "blue", "green"), "This is a test product");
        Long id = product.getId();

        when(productRepository.findProductById(product.getId())).thenReturn(null);

        productService.deleteProduct(product);

        assertNull(productRepository.findProductById(id));

        verify(productRepository).findProductById(any(Long.class));
        verify(productRepository).delete(any(Product.class));
    }
    @Test
    void findProductByName() {
        Product product1 = new Product("Long T-shirt", 100, List.of("image"), List.of("red", "blue", "green"), "This is a test product");
        Product product2 = new Product("Short T-shirt", 100, List.of("image"), List.of("red", "blue", "green"), "This is a test product");
        List<Product> productsList = new ArrayList<>();
        productsList.add(product1);
        productsList.add(product2);
        String searchName = "T-shirt";
        when(productRepository.findProductByNameContainingIgnoreCase("T-shirt")).thenReturn(Optional.of(productsList));
        List<Product> result = productService.findProductByName(searchName);

        assertThat(result.size()).isEqualTo(productsList.size());
        verify(productRepository).findProductByNameContainingIgnoreCase(any(String.class));
    }
}

