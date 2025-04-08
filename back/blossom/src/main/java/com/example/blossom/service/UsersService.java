package com.example.blossom.service;

import com.example.blossom.common.model.ResultVo;
import com.example.blossom.common.model.users.UsersLoginRequest;
import com.example.blossom.common.model.users.UsersRegisterRequest;
import com.example.blossom.entity.Users;

public interface UsersService {

    ResultVo<Users> login(UsersLoginRequest request);

    ResultVo<Void> register(UsersRegisterRequest request);

}
