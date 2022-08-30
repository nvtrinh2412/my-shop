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

    public List<Product> findByCreatedAtYear(int currentYear) {
        String query = "SELECT * FROM products WHERE extract(year from created_at) = :currentYear AND deleted_at IS NULL ";
        Query nativeQuery = entityManager.createNativeQuery(query, Product.class);
        nativeQuery.setParameter("currentYear", currentYear);
        List<Product> products = nativeQuery.getResultList();
        return products;
    }




}
