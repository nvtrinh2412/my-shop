package com.myshop.users;

import com.myshop.roles.Role;
import com.myshop.roles.RoleRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import javax.validation.UnexpectedTypeException;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;


@Service @RequiredArgsConstructor @Slf4j @Transactional
public class UserService  implements UserDetailsService {
    private final UserRepository userRepository;
    private final RoleRepository roleRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = userRepository.findByUsername(username);
        if(user == null) {
            log.error("User with name {} not found", username);
            throw new UsernameNotFoundException("User not found");
        }
        else{
            log.info("User with name {} found", username);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        user.getRoles().forEach(role ->
            authorities.add(new SimpleGrantedAuthority(role.getName()))
        );

        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
    }

    public User saveUser(User user) {
        log.info("Saving new user to the database: {}", user.getName());
       try{
           user.setPassword(passwordEncoder.encode(user.getPassword()));
           return userRepository.save(user);
       }
       catch (UnexpectedTypeException e ){
           log.error("Error saving user to the database: {}", user.getName());
           return null;
       }
    }


    public void addRoleToUser(String username, String roleName) {
        log.info("Adding role {} to user {}",roleName, username );
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
        userRepository.deleteByUsername(username);
    }
    public void deleteUserById(Long id) {
        userRepository.deleteById(id);
    }
}
