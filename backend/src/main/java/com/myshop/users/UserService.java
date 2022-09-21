package com.myshop.users;

import com.myshop.registration.token.ConfirmationToken;
import com.myshop.registration.token.ConfirmationTokenService;
import com.myshop.roles.Role;
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
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.Collection;
import java.util.List;
import java.util.UUID;


@Service
@RequiredArgsConstructor
@Slf4j
@Transactional
public class UserService implements UserDetailsService {
    private final static String USER_NOT_FOUND_MSG =
            "User with email %s not found";
    private final static String USER_ID_NOT_FOUND_MSG =
            "User with id %s not found";
    private final int EXPRIED_TOKEN_MINUTE = 15;
    private final UserRepository userRepository;
    private final ConfirmationTokenService confirmationTokenService;
    private final PasswordEncoder passwordEncoder;


    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new UsernameNotFoundException(String.format(USER_NOT_FOUND_MSG, email));
        } else {
            log.info("User with email {} found", email);
        }
        Collection<SimpleGrantedAuthority> authorities = new ArrayList<>();
        authorities.add(new SimpleGrantedAuthority(user.getRole().name()));

        return new org.springframework.security.core.userdetails.User(user.getEmail(), user.getPassword(), authorities);
    }

    public String signUpUser(User user) throws DataAccessException {
        log.info("Saving new user to the database: {}", user.getFirstName());
        if (user.getRole().name().equals("ROLE_ADMIN")) {
            throw new ResponseStatusException(HttpStatus.FORBIDDEN, "Admin role is not allowed");
        }

        User existedUser = userRepository.findByEmail(user.getEmail());
        if (existedUser != null) {
            if(!existedUser.isEnabled()){
                throw new ResponseStatusException(HttpStatus.FOUND, "Please confirm your registered account in your Email");
            }

            throw new ResponseStatusException(HttpStatus.CONFLICT, "Email is already taken");
        }

        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        String token = UUID.randomUUID().toString();
        ConfirmationToken confirmationToken = new ConfirmationToken(
                token,
                LocalDateTime.now(),
                LocalDateTime.now().plusMinutes(EXPRIED_TOKEN_MINUTE),
                user
        );

        confirmationTokenService.saveConfirmationToken(
                confirmationToken);
        return token;
    }

    public User getUser(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public void deleteUserByEmail(String email) {
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,  String.format(USER_NOT_FOUND_MSG, email));
        }
    }

    public void deleteUserById(Long id) {
        User user = userRepository.findById(id).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND,  String.format(USER_NOT_FOUND_MSG, id)));
        user.setLocked(true);
    }

    public void enableUser(String email){
        User user = userRepository.findByEmail(email);
        if (user == null) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,  String.format(USER_NOT_FOUND_MSG, email));
        }
        user.setEnabled(true);
    }
}

