package com.ssafy.aejimeongji.domain.common.presentation.handler;

import com.ssafy.aejimeongji.domain.common.application.dto.ValidationResponse;
import com.ssafy.aejimeongji.domain.common.exception.MethodArgumentNotValidException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
@Slf4j
public class ValicationAdvice {

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ValidationResponse> methodArgumentNotValidEx(MethodArgumentNotValidException ex) {
        log.debug("validation error 발생");
        return ResponseEntity.badRequest().body(new ValidationResponse(ex));
    }
}
