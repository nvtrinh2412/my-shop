package com.myshop.products;

import com.myshop.utils.SLUGIFY;
import com.myshop.utils.responseUtils.FailureResponse;
import com.myshop.utils.responseUtils.ResponseData;
import com.myshop.utils.responseUtils.SuccessfulResponse;
import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Min;
import java.util.List;


@RestController
@RequestMapping("api/v1/products")
@AllArgsConstructor
@Validated
public class ProductController {

    final int UNIQUE_RESULT = 1;
    private final ProductService productService;

    @GetMapping
    public ResponseEntity<ResponseData> getAllProduct() {
        try {
            List<Product> products = productService.getAllProduct();
            return new ResponseEntity<>(new SuccessfulResponse<>(products.size(), products), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(new FailureResponse("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(params = {"name"})
    public ResponseEntity<ResponseData> getAllProductByName(@RequestParam String name) {
        try {
            List<Product> products;
            String formattedSearchName = SLUGIFY.toSlug(name);
            products = productService.findProductByName(formattedSearchName);

            if (products == null || products.isEmpty())
                return new ResponseEntity<>(new FailureResponse("Not found"), HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(new SuccessfulResponse<>(products.size(), products), HttpStatus.OK);

        } catch (Exception e) {
            return new ResponseEntity<>(new FailureResponse("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping(params = {"page","size","sort"})
    public ResponseEntity<List<Product>> getAllProductWithSortAndPagination(@RequestParam @Min(0)Integer page, @RequestParam @Min(20) Integer size,@RequestParam String sort) {
            List<Product> products = productService.getAllProductWithSortAndPagination(page, size,sort);
            return ResponseEntity.ok(products);
    }

    @PostMapping
    public ResponseEntity<ResponseData> createProduct(@RequestBody Product newProduct) {
        try {
            Product product = productService.addNewProduct(newProduct);
            return new ResponseEntity<>(new SuccessfulResponse<>(UNIQUE_RESULT, List.of(product)), HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>(new FailureResponse("Product's name is already exist "), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @DeleteMapping
    public ResponseEntity<ResponseData> deleteAllProducts() {
        try {
            productService.deleteAllProducts();
            return new ResponseEntity<>(new SuccessfulResponse<>(UNIQUE_RESULT, null), HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(new FailureResponse("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<ResponseData> findProductByNameId(@PathVariable("id") String nameId) {
        Product product = productService.findProductByNameId(nameId);

        if (product != null) {
            return new ResponseEntity<>(new SuccessfulResponse<>(UNIQUE_RESULT, List.of(product)), HttpStatus.OK);
        } else return new ResponseEntity<>(new FailureResponse("Product not found"), HttpStatus.NOT_FOUND);
    }

    @PutMapping("/{id}")
    public ResponseEntity<ResponseData> updateProduct(@PathVariable("id") String nameId, @RequestBody Product updatedProduct) {
        Product product = productService.findAndUpdateProduct(nameId, updatedProduct);
        if (product != null) {
            return new ResponseEntity<>(new SuccessfulResponse<>(UNIQUE_RESULT, List.of(product)), HttpStatus.OK);
        }
        return new ResponseEntity<>(new FailureResponse("Product not found"), HttpStatus.NOT_FOUND);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<ResponseData> deleteProductByNameId(@PathVariable("id") String nameID) {
        Product deletedProduct = productService.findProductByNameId(nameID);
        if (deletedProduct != null) {
            try {
                productService.deleteProduct(deletedProduct);
                return new ResponseEntity<>(new SuccessfulResponse<>(UNIQUE_RESULT, null), HttpStatus.NO_CONTENT);
            } catch (Exception e) {
                return new ResponseEntity<>(new FailureResponse("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
            }
        }

        return new ResponseEntity<>(new FailureResponse("Product not found"), HttpStatus.NOT_FOUND);
    }


}
