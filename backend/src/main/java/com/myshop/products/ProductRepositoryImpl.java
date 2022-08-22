package com.myshop.products;

import org.springframework.stereotype.Component;
import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;
import java.util.Optional;

@Component
public class ProductRepositoryImpl {
    @PersistenceContext
    private EntityManager entityManager;

    public Optional<List<Product>> findProductByName(String name) {
        String query = "SELECT * FROM products WHERE name LIKE :name";
        Query nativeQuery = entityManager.createNativeQuery(query, Product.class);
        nativeQuery.setParameter("name", "%" + name + "%");
        List<Product> products = nativeQuery.getResultList();
        return Optional.ofNullable(products);
    }

    public List<Product> getAllProducts() {
        String query = "SELECT * FROM products WHERE deletedAt IS NULL";
        Query nativeQuery = entityManager.createNativeQuery(query, Product.class);
        List<Product> products = nativeQuery.getResultList();
        return products;
    }

}