package com.myshop.utils.responseUtils;

import java.util.List;

public class SuccessfulResponse<T> extends ResponseData{
    private int result;
    private List<T> data;



    private int totalPage;
    private int currentPage;

    public SuccessfulResponse(int result, List data) {
        super("success");
        this.result = result;
        this.data= data;

    }
    public SuccessfulResponse(int result, List data,int currentPage, int totalPage) {
        super("success");
        this.result = result;
        this.data= data;
        this.currentPage = currentPage;
        this.totalPage = totalPage;
    }

    public int getResult() {
        return result;
    }

    public void setResult(int result) {
        this.result = result;
    }

    public List<T> getData() {
        return data;
    }

    public void setData(List<T> data) {
        this.data = data;
    }

    public int getTotalPage() {
        return totalPage;
    }

    public void setTotalPage(int totalPage) {
        this.totalPage = totalPage;
    }

    public int getCurrentPage() {
        return currentPage;
    }

    public void setCurrentPage(int currentPage) {
        this.currentPage = currentPage;
    }
}
