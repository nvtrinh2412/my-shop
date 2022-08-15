package com.myshop.utils.responseUtils;

import java.util.List;

public class SuccessfulResponse<T> extends ResponseData{

    int DEFAULT_TOTAL_PAGE = 1;
    int DEFAULT_CURRENT_PAGE = 1;
    private int result;
    private List<T> data;

    private int totalPage = DEFAULT_TOTAL_PAGE;
    private int currentPage = DEFAULT_CURRENT_PAGE;

    public SuccessfulResponse(int result, List<T> data) {
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
