package com.myshop.login;

import com.myshop.registration.token.ConfirmationToken;
import com.myshop.registration.token.ConfirmationTokenService;
import com.myshop.roles.Role;
import com.myshop.users.User;
import com.myshop.users.UserService;
import com.myshop.utils.email.EmailSender;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.time.LocalDateTime;

@Service
@AllArgsConstructor
@Transactional
public class LoginService {

    public final UserService userService;
    public boolean login(LoginRequest request) {
        return false;
    }
}
