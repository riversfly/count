package com.example.blossom.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.example.blossom.common.model.ResultVo;
import com.example.blossom.common.model.bills.BillsAddBillsRequest;
import com.example.blossom.entity.Bills;
import com.example.blossom.service.BillsService;

@RestController
@RequestMapping("/bills")
public class BillsController {
    private final BillsService billsService;

    public BillsController(BillsService billsService) {
        this.billsService = billsService;
    }

    @GetMapping("")
    public ResultVo<List<Bills>> getBills(Integer userId, String type, String useFor, String begin, String end) {
        return billsService.getBills(userId, type, useFor, begin, end);
    }

    @PostMapping("")
    public ResultVo<Void> addBills(@RequestBody BillsAddBillsRequest request) {
        return billsService.addBills(request);
    }
}
