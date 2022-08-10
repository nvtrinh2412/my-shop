package com.myshop.products;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {


    @Query(value = "SELECT * FROM products WHERE name_id = :nameId", nativeQuery = true)
    Optional<Product> findProductByNameId(String nameId);


    @Query(value = "SELECT * FROM products WHERE name_id LIKE %:name%", nativeQuery = true)
    Optional<List<Product>> findProductByName(String name);
}
