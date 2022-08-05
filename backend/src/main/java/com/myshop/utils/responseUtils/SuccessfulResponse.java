package com.myshop.utils.responseUtils;

import java.util.List;

public class SuccessfulResponse<T> extends ResponseData{
    private int result;
    private List<T> data;

    public SuccessfulResponse(int result, List data) {
        super("success");
        this.result = result;
        this.data= data;

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
}
