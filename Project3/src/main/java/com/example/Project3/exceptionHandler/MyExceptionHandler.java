package com.example.Project3.exceptionHandler;

import com.example.Project3.exceptions.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

/**
 * This class is an Exception handler for the program.
 * If an exception is being thrown in the server this class will catch and handle it.
 */
@ControllerAdvice
public class MyExceptionHandler {

    @ExceptionHandler({IdDoesNotExistException.class, CouponAmountIsZeroException.class,
            CouponDateIsExpiredException.class, PurchaseDoesntExistException.class})
    public ResponseEntity<?> ExceptionHandler(Exception e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler({EmailAlreadyExistsException.class, NameOrEmailAlreadyExistsException.class,
            PurchaseAlreadyExistException.class, TitleAlreadyExistException.class})
    public ResponseEntity<?> ExceptionHandler2(Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }

    @ExceptionHandler({EmailOrPasswordAreWrongException.class, UnauthorizedException.class})
    public ResponseEntity<?> ExceptionHandler3(Exception e) {
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
    }

    @ExceptionHandler({Exception.class})
    public ResponseEntity<?> ExceptionHandler4(Exception e) {
        return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
    }
}
