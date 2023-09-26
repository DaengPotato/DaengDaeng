package com.daengdaeng.global.exception;

public class S3Exception extends RuntimeException{
    public S3Exception() {};

    public S3Exception(String msg) {
        super(msg);
    }
}
