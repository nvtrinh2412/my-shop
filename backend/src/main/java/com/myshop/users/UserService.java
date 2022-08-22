package com.myshop.users;

import com.myshop.roles.Role;
import com.myshop.roles.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.dao.DataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;
import javax.transaction.Transactional;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService implements UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new UsernameNotFoundException("User not found");
        } else {
            log.info("User with name {} found", username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role ->
                authorities.add(new SimpleGrantedAuthority(role.getName()))
        );

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    public User saveUser(User user) throws DataAccessException {
        log.info("Saving new user to the database: {}", user.getName());
        Collection<Role> roles = user.getRoles();
        for (Role role : roles) {
            if (role.getName().equals("ROLE_ADMIN") || role.getName().equals("ROLE_SUPER_ADMIN")) {
                throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Admin role is not allowed");
            }
        }

        User existedUser = userRepository.findByUsername(user.getUsername());
        if (existedUser != null) {
            throw new ResponseStatusException(HttpStatus.CONFLICT, "User already exists");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        user.setCreatedAt(new Date(System.currentTimeMillis()));
        user.setRoles(List.of(roleRepository.findByName("ROLE_USER")));
        return userRepository.save(user);
    }

    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role {} to user {}", roleName, username);
        User user = userRepository.findByUsername(username);
        Role roles = roleRepository.findByName(roleName);
        user.getRoles().add(roles);
    }

    public User getUser(String username) {
        return userRepository.findByUsername(username);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUserByUsername(String username) {
        User user = userRepository.findByUsername(username);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with name " + username + " does not exist");
        }
        user.setDeletedAt(new Date(System.currentTimeMillis()));
    }

    public void deleteUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "User with id " + id + " does not exist"));
        user.setDeletedAt(new Date(System.currentTimeMillis()));
    }

}
