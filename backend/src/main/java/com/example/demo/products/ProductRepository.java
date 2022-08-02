package com.example.demo.products;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface ProductRepository extends MongoRepository<Product, String> {

    @Query("{'nameId': ?0 }")
    Optional<Product> findProductByNameId(String nameId);
}
