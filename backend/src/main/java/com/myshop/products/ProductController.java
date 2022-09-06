package com.myshop.products;

import com.myshop.utils.CustomPagable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.Map;

import static com.myshop.utils.variable.ConfigurationVariable.*;

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

    @GetMapping(path = "/search")
    public ResponseEntity<List<Product>> getAllProductByName(@RequestParam String name,
                                                             @RequestParam(defaultValue = DEFAULT_PAGE) Integer page,
                                                             @RequestParam(defaultValue = DEFAULT_SIZE) Integer size,
                                                             @RequestParam(defaultValue = DEFAULT_KEY) String key,
                                                             @RequestParam(defaultValue = DEFAULT_ORDER) String order) {
        List<Product> products = productService.getAllProductWithCriteria(name, page, size, key, order);
        return ResponseEntity.ok(products);
    }

    @GetMapping(path = "/new-arrival")
    public ResponseEntity<List<Product>> getAllProductNewArrival() {
        List<Product> products = productService.getAllProductNewArrival();
        return ResponseEntity.ok(products);
    }

    @GetMapping(path = "/filter")
    public ResponseEntity<List<Product>> getAllProductByCategory(@RequestParam Map<String, String> filerParams,
                                                                 @RequestParam(defaultValue = DEFAULT_PAGE) Integer page,
                                                                 @RequestParam(defaultValue = DEFAULT_SIZE) Integer size,
                                                                 @RequestParam(defaultValue = DEFAULT_KEY) String key,
                                                                 @RequestParam(defaultValue = DEFAULT_ORDER) ORDER order) {
        Pageable customPagable = new CustomPagable().setup(page, size,key,order.toString());
        List<Product> products = productService.getAllProductByFilter(filerParams, customPagable);
        return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<Product> createProduct(@RequestBody @Valid Product product) {
        Product createdProduct = productService.addNewProduct(product);
        return ResponseEntity.ok(createdProduct);
    }

    @DeleteMapping
    public ResponseEntity<Product> deleteAllProducts() {
        productService.deleteAllProducts();
        return ResponseEntity.accepted().body(null);
    }

    @GetMapping(path = "/{id}")
    public ResponseEntity<Product> getProductById(@PathVariable Long id) {
        Product products = productService.findProductById(id);
        return ResponseEntity.ok(products);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Product> updateProduct(@PathVariable("id") Long id, @RequestBody Product product) {
        Product updatedProduct = productService.findAndUpdateProduct(id, product);
        return ResponseEntity.ok(updatedProduct);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteProductByNameId(@PathVariable("id") Long id) {
        productService.findAndDeleteProduct(id);
        return ResponseEntity.ok("Product deleted successfully");
    }


}
