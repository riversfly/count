package com.example.blossom.controller;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.blossom.common.model.ResultVo;
import com.example.blossom.common.model.users.UsersLoginRequest;
import com.example.blossom.common.model.users.UsersRegisterRequest;
import com.example.blossom.entity.Users;
import com.example.blossom.service.UsersService;

@RestController
@RequestMapping("/users")
public class UsersController {
    private final UsersService usersService;

    public UsersController(UsersService usersService) {
        this.usersService = usersService;
    }

    @PostMapping("/login")
    public ResultVo<Users> login(@RequestBody UsersLoginRequest request) {
        return usersService.login(request);
    }

    @PostMapping("/register")
    public ResultVo<Void> register(@RequestBody UsersRegisterRequest request) {
        return usersService.register(request);
    }
}
