package com.myshop.products;

import com.myshop.utils.SLUGIFY;
import com.myshop.utils.responseUtils.FailureResponse;
import com.myshop.utils.responseUtils.ResponseData;
import com.myshop.utils.responseUtils.SuccessfulResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("api/v1/products")
@AllArgsConstructor
public class ProductController {

    final int UNIQUE_RESULT = 1;
    final String DEFAULT_PAGE = "0";
    final String DEFAULT_PAGE_SIZE = "7";
    private final ProductService productService;

    @GetMapping
//    @ResponseBody
    public ResponseEntity<ResponseData> getAllProduct(@RequestParam(required = false) String name, @RequestParam(defaultValue = DEFAULT_PAGE) int page, @RequestParam(defaultValue = DEFAULT_PAGE_SIZE) int size) {
        try {
            //Get product by searching name
            List<Product> products;
            if (name != null) {
                //change name into nameId format
                String formattedSearchName = SLUGIFY.toSlug(name);
                products = productService.findProductByName(formattedSearchName);

            } else {
                // get all product
                products = productService.getAllProduct();
            }

            if (products == null || products.size() == 0)
                return new ResponseEntity<>(new FailureResponse("Not found"), HttpStatus.NOT_FOUND);

            return new ResponseEntity<>(new SuccessfulResponse<>(products.size(), products), HttpStatus.OK);


        } catch (Exception e) {
            return new ResponseEntity<>(new FailureResponse("Internal Server Error"), HttpStatus.INTERNAL_SERVER_ERROR);
        }
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
