package com.myshop.utils.responseUtils;

public class FailureResponse extends ResponseData{
    private String message;

    public FailureResponse(String message) {
        super("fail");
        this.message = message;
    }
    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

}
