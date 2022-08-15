package com.myshop.roles;

import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoleService {
    private final RoleRepository roleRepository;
    public Role addRole(String name) {
        return null;
    }

    public void saveRole(Role role) {
        roleRepository.save(role);
    }
}
