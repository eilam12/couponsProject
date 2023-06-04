package com.example.Project3.exceptions;

public class EmailOrPasswordAreWrongException extends Exception {
    public EmailOrPasswordAreWrongException() {
        super("Email or password are wrong");
    }
}

