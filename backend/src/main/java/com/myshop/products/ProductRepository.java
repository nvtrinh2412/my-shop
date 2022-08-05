package com.myshop.products;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import javax.swing.text.html.Option;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends MongoRepository<Product, String> {

    @Query("{'nameId': ?0 }")
    Optional<Product> findProductByNameId(String nameId);

    @Query("{'nameId': { $regex : ?0} }")
    Optional<List<Product>> findProductByName(String name);
}
