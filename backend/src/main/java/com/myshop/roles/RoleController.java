package com.myshop.roles;

import org.springframework.http.ResponseEntity;

public class RoleController {

    public ResponseEntity<Role> saveRole(Role role) {
        return ResponseEntity.ok(role);
    }
}

