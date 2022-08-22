package com.myshop.categories;

import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import java.util.List;
import java.util.Optional;

@Service
public class CategoryService {
    static final int DEFAULT_PAGE = 0;
    static final int DEFAULT_PAGE_SIZE = 20;
    private final CategoryRepository categoryRepository;

    public CategoryService(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    public List<Category> getAllCategory() {
        return categoryRepository.findAll();
    }

    public Category addNewCategory(Category category) throws DataAccessException {
        return categoryRepository.save(category);
    }


    public Category findCategoryById(Long id) throws ResponseStatusException {
        Optional<Category> category = categoryRepository.findCategoryById(id);
        if (category.isPresent()) {
            return category.get();
        } else {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Product with nameID \"" + id + "\" not found");
        }
    }

}