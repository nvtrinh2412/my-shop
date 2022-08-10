package com.myshop.products;

import lombok.AllArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ProductService {
    final int DEFAULT_PAGE = 0;
    final int DEFAULT_PAGE_SIZE = 7;
    private final ProductRepository productRepository;

    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    public Product addNewProduct(Product newProduct) {
        try {
            return productRepository.save(newProduct);
        } catch (Exception e) {
            return null;
        }
    }

    public Product findProductByNameId(String nameId) {
        Optional<Product> productData = productRepository.findProductByNameId(nameId);
        return (Product) productData.orElse(null);
    }

    public Product findAndUpdateProduct(String nameId, Product newProduct) {
        Product product = findProductByNameId(nameId);
        if (product != null) {
            product.updateWith(newProduct);
            productRepository.save(product);
            return product;
        } else {
            return null;
        }

    }

    public void deleteAllProducts() {
        productRepository.deleteAll();
    }

    public void deleteProduct(Product product) {
        productRepository.delete(product);
    }

    public List<Product> findProductByName(String name) {
        Optional<List<Product>> products = productRepository.findProductByName(name);
        return products.orElse(null);
    }

    public Page<Product> findPaginated(String page, String size) {
        int pageNumber;
        int pageSize;
        try {
            pageNumber = Integer.parseInt(page);
            pageSize = Integer.parseInt(size);
        } catch (Exception e) {
            pageNumber = DEFAULT_PAGE;
            pageSize = DEFAULT_PAGE_SIZE;
        }
        return productRepository.findAll(PageRequest.of(pageNumber, pageSize));
    }

    public List<Product> getAllProductWithSort(String sortCriteria, String sortOrder) {
        Sort sort;
        if (sortOrder.equals("asc")) {
            sort = Sort.by(sortCriteria).ascending();
        } else {
            sort = Sort.by(sortCriteria).descending();
        }
        Pageable pageable =  PageRequest.of(DEFAULT_PAGE, DEFAULT_PAGE_SIZE, sort);
        return productRepository.findAll(pageable).getContent();
    }
}
