package com.myshop.products;

import com.myshop.utils.SLUGIFY;
import org.apache.commons.lang3.StringUtils;
import org.hibernate.engine.jdbc.spi.SqlExceptionHelper;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import javax.persistence.NoResultException;
import javax.validation.ConstraintViolationException;
import java.sql.SQLException;
import java.util.List;
import java.util.Optional;

@Service
public class ProductService {
    static final int DEFAULT_PAGE = 0;
    static final int DEFAULT_PAGE_SIZE = 20;
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    public Product addNewProduct(Product newProduct) throws ConstraintViolationException {
            return productRepository.save(newProduct);

    }

    public Product findProductByNameId(String nameId)  {
        Optional<Product> productData = productRepository.findProductByNameId(nameId);
        return productData.orElse(null);
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
    public void findAndDeleteProduct(String nameId)  {
        Product product = findProductByNameId(nameId);
        if (product != null) {
            deleteProduct(product);
        }
    }

    public List<Product> findProductByName(String name) {
        String formattedSearchName = SLUGIFY.toSlug(name);
        Optional<List<Product>> products = productRepository.findProductByName(formattedSearchName);
        return products.orElse(null);
    }
    public List<Product> getAllProductWithSortAndPagination(Integer page, Integer size,String sortString){
        String sortCriteria = sortString.split("-")[0];
        String sortOrder = sortString.split("-")[1];
        Sort sort;
        if (sortOrder.equals("asc")) {
            sort = Sort.by(sortCriteria).ascending();
        } else {
            sort = Sort.by(sortCriteria).descending();
        }
        Pageable pageable =  PageRequest.of(page, size, sort);
        return productRepository.findAll(pageable).getContent();
    }

}
