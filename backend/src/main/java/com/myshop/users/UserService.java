//package com.myshop.users;
//
//import com.myshop.roles.Role;
//import com.myshop.roles.RoleRepository;
//import lombok.RequiredArgsConstructor;
//import lombok.extern.slf4j.Slf4j;
//import org.springframework.security.core.authority.SimpleGrantedAuthority;
//import org.springframework.security.core.userdetails.UserDetails;
//import org.springframework.security.core.userdetails.UsernameNotFoundException;
//import org.springframework.stereotype.Service;
//
//import javax.transaction.Transactional;
//import java.util.ArrayList;
//import java.util.Collection;
//
//
//@Service @RequiredArgsConstructor @Slf4j @Transactional
//public class UserService  {
//    private final UserRepository userRepository;
//    private final RoleRepository roleRepository;
//
//    public User saveUser(User user) {
//        log.info("Saving new user to the database: {}", user.getName());
//        return userRepository.save(user);
//    }
//
//
//    public void addRoleToUser(String username, String roleName) {
//        log.info("Adding role {} to user {}",roleName, username );
//        User user = userRepository.findByUsername(username);
//        Role roles = roleRepository.findByName(roleName);
//        user.getRoles().add(roles);
//    }
//
//    public UserDetails getUserByName(String username) throws UsernameNotFoundException {
//        User user = userRepository.findByUsername(username);
//       if(user == null) {
//           log.error("User with name {} not found", username);
//           throw new UsernameNotFoundException("User not found");
//         }
//       else{
//           log.info("User with name {} found", username);
//       }
//        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
//        user.getRoles().forEach(role -> {
//            authorities.add(new SimpleGrantedAuthority(role.getName()));
//        });
//
//        return new org.springframework.security.core.userdetails.User(user.getUsername(), user.getPassword(), authorities);
//    }
//
//    public User getUser(String username) {
//        return userRepository.findByUsername(username);
//    }
//}
