package com.example.blossom.service.impl;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.blossom.common.model.ResultVo;
import com.example.blossom.common.model.users.UsersLoginRequest;
import com.example.blossom.common.model.users.UsersRegisterRequest;
import com.example.blossom.entity.Users;
import com.example.blossom.mapper.UsersMapper;
import com.example.blossom.service.UsersService;

@Service

public class UsersServiceImpl extends ServiceImpl<UsersMapper, Users> implements UsersService {

    @Override
    public ResultVo<Users> login(UsersLoginRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();

        LambdaQueryWrapper<Users> qw = new LambdaQueryWrapper<>();
        qw.eq(Users::getUsername, username).eq(Users::getPassword, password);

        Users user = getOne(qw);

        if (user == null) {
            return ResultVo.failure("用户名或密码错误");
        } else {
            return ResultVo.success("登录成功", user);
        }
    }

    @Override
    public ResultVo<Void> register(UsersRegisterRequest request) {
        String username = request.getUsername();
        String password = request.getPassword();

        LambdaQueryWrapper<Users> qw = new LambdaQueryWrapper<>();
        qw.eq(Users::getUsername, username);

        if (getOne(qw) != null) {
            return ResultVo.failure("用户名已存在");
        }

        Users user = new Users();
        user.setUsername(username);
        user.setPassword(password);

        save(user);

        return ResultVo.success("注册成功");
    }

}
