package com.example.blossom.service.impl;

import java.util.Collection;
import java.util.Collections;
import java.util.List;

import org.springframework.stereotype.Service;

import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.blossom.common.model.ResultVo;
import com.example.blossom.common.model.bills.BillsAddBillsRequest;
import com.example.blossom.entity.Bills;
import com.example.blossom.mapper.BillsMapper;
import com.example.blossom.service.BillsService;

import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.TimeZone;

@Service

public class BillsServiceImpl extends ServiceImpl<BillsMapper, Bills> implements BillsService {

    @Override
    public ResultVo<List<Bills>> getBills(Integer userId, String type, String useFor, String begin, String end) {
        if (userId == null) {
            return ResultVo.success(Collections.emptyList());
        }

        LambdaQueryWrapper<Bills> qw = new LambdaQueryWrapper<>();
        qw.eq(Bills::getUserId, userId);
        if (type != null) {
            qw.eq(Bills::getType, type);
        }
        if (useFor != null) {
            qw.eq(Bills::getUseFor, useFor);
        }
        if (begin != null && end != null) {
            try {
                SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
                sdf.setTimeZone(TimeZone.getTimeZone("GMT+8"));
                Date beginDate = sdf.parse(begin);
                Date endDate = sdf.parse(end);
                qw.between(Bills::getDate, beginDate, endDate);
            } catch (Exception e) {
                log.error("日期解析错误", e);
                return ResultVo.failure("日期格式不正确，请使用yyyy-MM-dd格式");
            }
        }

        return ResultVo.success(list(qw));
    }

    @Override
    public ResultVo<Void> addBills(BillsAddBillsRequest request) {
        Date date = request.getDate();
        Double money = request.getMoney();
        String note = request.getNote();
        String type = request.getType();
        String useFor = request.getUseFor();
        Integer userId = request.getUserId();

        LambdaQueryWrapper<Bills> qw = new LambdaQueryWrapper<>();

        Bills bills = new Bills();
        bills.setDate(date);
        bills.setMoney(money);
        bills.setNote(note);
        bills.setType(type);
        bills.setUseFor(useFor);
        bills.setUserId(userId);

        save(bills);

        return ResultVo.success("添加成功");
    }

    @Override
    public ResultVo<Void> deleteBill(Long id) {
        if (id == null) {
            return ResultVo.failure("账单ID不能为空");
        }

        Bills bill = getById(id);
        if (bill == null) {
            return ResultVo.failure("账单不存在");
        }

        removeById(id);
        return ResultVo.success("删除成功");
    }

}
