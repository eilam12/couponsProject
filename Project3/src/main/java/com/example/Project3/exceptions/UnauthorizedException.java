package com.example.Project3.exceptions;

public class UnauthorizedException extends Exception {
    public UnauthorizedException() {
        super("Unauthorized, please log in!");
    }
}
