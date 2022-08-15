//package com.myshop.users;
//
//import com.myshop.utils.responseUtils.ResponseData;
//import com.myshop.utils.responseUtils.SuccessfulResponse;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.GetMapping;
//import org.springframework.web.bind.annotation.PostMapping;
//import org.springframework.web.bind.annotation.RequestMapping;
//import org.springframework.web.bind.annotation.RestController;
//import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
//
//import java.net.URI;
//import java.util.List;
//
//@RestController @RequiredArgsConstructor
//@RequestMapping("api/v1/users")
//public class UserController {
//    final int UNIQUE_RESULT = 1;
//    private final UserService userService;
//
//    @PostMapping
//    public ResponseEntity<ResponseData> saveUser(User user) {
//        URI uri = URI.create(ServletUriComponentsBuilder.fromCurrentRequest().path("").toUriString());
//         User newUser = userService.saveUser(user);
//         return new ResponseEntity<>(new SuccessfulResponse<>(UNIQUE_RESULT, List.of(newUser)), HttpStatus.OK);
//    }
//    @GetMapping
//    public ResponseEntity<ResponseData> getUsers() {
//        User user = userService.getUser("justin");
//        return new ResponseEntity<>(new SuccessfulResponse<>(UNIQUE_RESULT, List.of(user)), HttpStatus.OK);
//    }
//
//}
