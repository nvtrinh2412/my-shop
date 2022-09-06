package com.myshop.products;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface ProductRepository extends JpaRepository<Product, String> {

    Optional<Product> findProductById(Long id);

    Optional<List<Product>> findProductByNameContainingIgnoreCase(String name);

    List<Product> findByNameContaining(String name, Pageable pageable);

    List<Product> findByCreatedAtYear(int currentYear);

    List<Product> findByCategoryId(Long categoryId);
    List<Product> findByDesignerContainingAndNameIgnoreCaseContaining(String designer, String name,  Pageable pageable);

    List<Product> findByCategoryIdAndDesignerContainingAndNameIgnoreCaseContaining( Long categoryId, String designer, String name,  Pageable pageable);
}
