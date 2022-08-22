package com.myshop.products;

import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import javax.transaction.Transactional;
import java.sql.Date;
import java.util.List;
import java.util.Optional;

@Service
@Transactional
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProduct() {
        return productRepository.getAllProducts();
    }

    public Product addNewProduct(Product product) throws DataAccessException {
        product.setCreatedAt(new Date(System.currentTimeMillis()));
        return productRepository.save(product);
    }

    public Product findProductById(Long id) throws ResponseStatusException {
        Optional<Product> productData = productRepository.findProductById(id);
        if (productData.isPresent()) {
            return productData.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product with nameID \"" + id + "\" not found");
        }
    }

    public Product findAndUpdateProduct(Long id, Product newProduct) {
        Product product = findProductById(id);
        product.updateWith(newProduct);
        productRepository.save(product);
        return product;
    }

    public void deleteAllProducts() {
        try {
            List<Product> products = productRepository.getAllProducts();
            for (Product product : products) {
                product.setDeletedAt(new Date(System.currentTimeMillis()));
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot delete all products");
        }
    }

    public List<Product> findProductByName(String name) {
        Optional<List<Product>> products = productRepository.findProductByName(name);
        return products.orElse(null);
    }

    public void deleteProduct(Product product) {
        product.setDeletedAt(new Date(System.currentTimeMillis()));
    }

    public void findAndDeleteProduct(Long id) {
        Product product = findProductById(id);
        deleteProduct(product);
    }
    public List<Product> getAllProductWithCreteria(String name,
                                                   Integer page,
                                                   Integer size,
                                                   String key,
                                                   String order) {
        Sort sort;
        if (order.equals("desc")) {
            sort = Sort.by(Sort.Direction.DESC, key);
        } else {
            sort = Sort.by(Sort.Direction.ASC, key);
        }
        Pageable pageable = PageRequest.of(page, size, sort);
        return productRepository.findByNameContaining(name, pageable);
    }

}