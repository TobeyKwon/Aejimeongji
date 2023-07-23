package com.ssafy.aejimeongji.dto.walking;

import lombok.Data;
import org.springframework.format.annotation.DateTimeFormat;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PositiveOrZero;
import java.time.LocalDateTime;

@Data
public class CreateWalkingRequest {
    @NotNull(message = "산책날짜를 입력해주세요.")
    @DateTimeFormat(pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime walkingDate;

    @NotNull(message = "총 산책시간을 입력해주세요.")
    private Double walkingTime;

    @NotNull(message = "산책거리를 입력해주세요.")
    @PositiveOrZero(message = "산책거리를 정확히 입력해주세요.")
    private double walkingDistance;
}
