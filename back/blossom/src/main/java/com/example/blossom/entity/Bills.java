package com.example.blossom.entity;

import java.util.Date;

import com.baomidou.mybatisplus.annotation.IdType;
import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.fasterxml.jackson.annotation.JsonFormat;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Bills {
    @TableField("date")
    @JsonFormat(pattern = "yyyy-MM-dd", timezone = "GMT+8")
    private Date date;
    @TableId(value = "id", type = IdType.AUTO)
    @TableField("id")
    private Long id;
    @TableField("money")
    private double money;
    @TableField("note")
    private String note;
    @TableField("type")
    private String type;
    @TableField("use_for")
    private String useFor;
    @TableField("user_id")
    private long userId;
}
