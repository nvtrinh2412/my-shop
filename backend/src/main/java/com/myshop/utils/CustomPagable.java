package com.myshop.utils;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
public class CustomPagable {
    public Pageable setup(Integer page, Integer size, String key,  String order) {
        Sort sort = Sort.by(Sort.Direction.fromString(order), key);
        return PageRequest.of(page, size, sort);
    }

}
