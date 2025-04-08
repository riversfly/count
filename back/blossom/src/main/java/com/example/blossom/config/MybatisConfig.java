package com.example.blossom.config;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.context.annotation.Configuration;

@Configuration
@MapperScan("com.example.blossom.mapper")
public class MybatisConfig {

}
