package com.myshop.products;

import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@AllArgsConstructor
@Service
public class ProductService {
    private final ProductRepository productRepository;

    public List<Product> getAllProduct() {
        return productRepository.findAll();
    }

    public Product addNewProduct(Product newProduct) {
        productRepository.save(newProduct);
        return newProduct;
    }

    public void deleteAllProducts() {
        productRepository.deleteAll();
    }


    public Product findProductByNameId(String nameId) {
        Optional productData = productRepository.findProductByNameId(nameId);
        if (productData.isPresent()) {
            return (Product) productData.get();
        } else {
            return null;
        }
    }

    public Product findAndUpdateProduct(String nameId, Product newProduct) {
        Product product = findProductByNameId(nameId);
        if (product != null) {
            product.setName(newProduct.getName());
            product.setNameId(newProduct.getNameId());
            product.setPrice(newProduct.getPrice());
            product.setDescription(newProduct.getDescription());
            product.setColor(newProduct.getColor());

            productRepository.save(product);
            return product;
        } else {
            return null;
        }

    }

    public void deleteProduct(Product product){
        productRepository.delete(product);
    }
}
