package com.myshop.products;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    List<Product> getAllProducts();

    Optional<Product> findProductById(Long id);

    Optional<List<Product>> findProductByName(String name);

    List<Product> findByNameContaining(String name, Pageable pageable);

}
