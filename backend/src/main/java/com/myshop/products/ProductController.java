package com.myshop.products;

import com.myshop.common.SLUGIFY;
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
    @ResponseBody
    public ResponseEntity<List<Product>> getAllProduct(@RequestParam(required = false) String name) {
        if(name != null){
            String formattedSearchName = SLUGIFY.toSlug(name);
            System.out.println("name: " +  formattedSearchName);
            List<Product> filteredProducts =  productService.findProductByName(formattedSearchName);
            System.out.println(filteredProducts);
            return new ResponseEntity<>(filteredProducts, HttpStatus.OK);
        }
        try {
            List<Product> products = productService.getAllProduct();
            return new ResponseEntity<>(products, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody Product newProduct) {
        try {
            Product product = productService.addNewProduct(newProduct);
            return new ResponseEntity<>(newProduct, HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping
    public ResponseEntity<HttpStatus> deleteAllProducts() {
        try {
            productService.deleteAllProducts();
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<Product> findProductByNameId(@PathVariable("id") String nameId) {
        Product product = productService.findProductByNameId(nameId);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        } else
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") String nameId, @RequestBody Product updatedProduct) {
        Product product = productService.findAndUpdateProduct(nameId, updatedProduct);
        if (product != null) {
            return new ResponseEntity<>(product, HttpStatus.OK);
        }
        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteProductByNameId(@PathVariable("id") String nameID) {
        Product deletedProduct = productService.findProductByNameId(nameID);
        if (deletedProduct != null) {
            try {
                productService.deleteProduct(deletedProduct);
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            } catch (Exception e) {
                return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
}
