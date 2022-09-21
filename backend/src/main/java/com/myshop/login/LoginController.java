package com.myshop.login;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("api/v1/login")
public class LoginController {
    private final LoginService loginService;

    @PostMapping
    public boolean login(@RequestBody LoginRequest request) {
        return loginService.login(request);
    }


}
