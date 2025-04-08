package com.example.blossom.entity;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Users {
    @TableId(value = "id", type = IdType.AUTO)
    @TableField("id")
    private Long id;
    @TableField("password")
    private String password;
    @TableField("username")
    private String username;
}
