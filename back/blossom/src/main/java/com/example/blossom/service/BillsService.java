package com.example.blossom.service;

import java.util.List;

import com.example.blossom.common.model.ResultVo;
import com.example.blossom.common.model.bills.BillsAddBillsRequest;
import com.example.blossom.entity.Bills;

public interface BillsService {

    ResultVo<List<Bills>> getBills(Integer userId, String type, String useFor, String begin, String end);

    ResultVo<Void> addBills(BillsAddBillsRequest request);

    ResultVo<Void> deleteBill(Long id);

}
