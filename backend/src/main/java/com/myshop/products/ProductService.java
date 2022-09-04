package com.myshop.products;

import com.myshop.categories.Category;
import com.myshop.categories.CategoryRepository;
import org.springframework.dao.DataAccessException;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import javax.transaction.Transactional;
import java.sql.Date;
import java.util.Calendar;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@Service
@Transactional
public class ProductService {
    private final ProductRepository productRepository;
    private final CategoryRepository categoryRepository;


    public ProductService(ProductRepository productRepository, CategoryRepository categoryRepository) {
        this.productRepository = productRepository;
        this.categoryRepository = categoryRepository;
    }

    public List<Product> getAllProduct() {
        return productRepository.findAll();
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
            List<Product> products = productRepository.findAll();
            for (Product product : products) {
                product.setDeletedAt(new Date(System.currentTimeMillis()));
            }
        } catch (Exception e) {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Cannot delete all products");
        }
    }

    public List<Product> findProductByName(String name) {
        Optional<List<Product>> products = productRepository.findProductByNameContainingIgnoreCase(name);
        return products.orElse(null);
    }

    public void deleteProduct(Product product) {
        product.setDeletedAt(new Date(System.currentTimeMillis()));
    }

    public void findAndDeleteProduct(Long id) {
        Product product = findProductById(id);
        deleteProduct(product);
    }
    public List<Product> getAllProductWithCriteria(String name,
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

    public List<Product> getAllProductNewArrival() {
        int currentYear = Calendar.getInstance().get(Calendar.YEAR);
        return productRepository.findByCreatedAtYear(currentYear);
    }
    public List<Product> getAllProductByCategory(String name) {
        Optional<Category> category = categoryRepository.findCategoryByNameIgnoreCase(name);
        if (category.isPresent()) {
            return productRepository.findByCategoryId(category.get().getId());
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Category with name \"" + name + "\" not found");
        }
    }

    public List<Product> getAllProductByFilter(Map<String, String> filerParams,Pageable pageable) {
        String name = filerParams.get("name") != null ? filerParams.get("name") : "";
        String category = filerParams.get("category") != null ? filerParams.get("category") : "";
        String designer = filerParams.get("designer") != null ? filerParams.get("designer") : "";

        Optional<Category> categoryData = categoryRepository.findCategoryByNameIgnoreCase(category);
        if (categoryData.isPresent()) {
            return productRepository.findByCategoryIdAndDesignerContainingAndNameIgnoreCaseContaining(categoryData.get().getId(), designer,name, pageable);
        }
        return productRepository.findByDesignerContainingAndNameIgnoreCaseContaining(designer,name, pageable);

    }
}

