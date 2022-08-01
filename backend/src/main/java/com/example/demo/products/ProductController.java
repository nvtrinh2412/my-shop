package com.example.demo.products;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("api/v1/products")
@AllArgsConstructor
public class ProductController {
    private final ProductService productService;

    @GetMapping
    public List<Product> fetchAllProduct(){
        return productService.getAllProduct();
    }

    @PostMapping
    public ResponseEntity<Product> addNewProduct(@RequestBody Product newProduct){
        Product product = productService.addNewProduct(newProduct);
        return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
    }

}
