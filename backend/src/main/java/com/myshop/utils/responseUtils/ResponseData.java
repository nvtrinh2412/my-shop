package com.myshop.utils.responseUtils;

import java.util.List;

public class ResponseData {

    private String status;



    public ResponseData(String status) {
        this.status = status;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}
