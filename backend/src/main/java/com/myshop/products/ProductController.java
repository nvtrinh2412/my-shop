package com.myshop.products;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import java.util.List;


@RestController
@RequestMapping("api/v1/products")
@Validated
public class ProductController {
    private final ProductService productService;

    @Autowired
    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProduct() {
        List<Product> products = productService.getAllProduct();
        return ResponseEntity.ok(products);
    }

    @GetMapping(params = {"name"})
    public ResponseEntity<List<Product>> getAllProductByName(@RequestParam String name) {
        List<Product> products = productService.findProductByName(name);
        return ResponseEntity.ok(products);
    }

    @GetMapping(params = {"page", "size", "sort"})
    public ResponseEntity<List<Product>> getAllProductWithSortAndPagination(@RequestParam @Min(0) Integer page, @RequestParam @Min(20) Integer size, @RequestParam String sort) {
        List<Product> products = productService.getAllProductWithSortAndPagination(page, size, sort);
        return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product product) {
        try {
            Product createdProduct = productService.addNewProduct(product);
            return ResponseEntity.ok(createdProduct);
        } catch (Exception e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @DeleteMapping
    public ResponseEntity<Product> deleteAllProducts() {
        productService.deleteAllProducts();
        return ResponseEntity.accepted().body(null);
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findProductByNameId(@PathVariable("id") String nameId) {
        Product product = productService.findProductByNameId(nameId);
        return ResponseEntity.ok(product);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") String nameId, @RequestBody Product product) {
        Product updatedProduct = productService.findAndUpdateProduct(nameId, product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProductByNameId(@PathVariable("id") String nameID) {
        try {
            productService.findAndDeleteProduct(nameID);
            return ResponseEntity.ok("Product deleted successfully");
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Product not found");
        }
    }

}