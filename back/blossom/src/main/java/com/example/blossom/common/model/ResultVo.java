package com.example.blossom.common.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResultVo<T> {
    private int success;
    private String message;
    private T data;

    // get成功，带数据
    public static <T> ResultVo<T> success(T data) {
        return new ResultVo<>(1, "success", data);
    }

    // get失败，带数据
    public static <T> ResultVo<T> failure() {
        return new ResultVo<>(0, "failure", null);
    }

    // post成功，带数据
    public static <T> ResultVo<T> success(String msg, T data) {
        return new ResultVo<>(1, msg, data);
    }

    // post成功，不带数据
    public static <T> ResultVo<T> success(String msg) {
        return new ResultVo<>(1, msg, null);
    }

    // post失败，不带数据
    public static <T> ResultVo<T> failure(String msg) {
        return new ResultVo<>(0, msg, null);
    }
}
