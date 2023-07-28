package com.ssafy.aejimeongji.domain.walking.presentation;

import com.ssafy.aejimeongji.domain.common.application.dto.ResponseDTO;
import com.ssafy.aejimeongji.domain.common.application.dto.ScrollResponse;
import com.ssafy.aejimeongji.domain.common.exception.CustomMethodArgumentNotValidException;
import com.ssafy.aejimeongji.domain.dog.application.service.WalkingDogService;
import com.ssafy.aejimeongji.domain.walking.application.dto.*;
import com.ssafy.aejimeongji.domain.walking.domain.Walking;
import com.ssafy.aejimeongji.domain.walking.domain.WalkingDog;
import com.ssafy.aejimeongji.domain.walking.domain.repository.WalkingDogRepositoryCustomImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class WalkingApiController {

    private final WalkingDogService walkingDogService;
    private final WalkingDogRepositoryCustomImpl walkingDogRepository;

    @GetMapping("/dog/{dogId}/walkingdog")
    public ResponseEntity<ScrollResponse<?>> getWalkingData(@PathVariable Long dogId, @ModelAttribute WalkingDogCondition condition) {
        log.debug("condition {}", condition);
        ScrollResponse<WalkingDog> walkingDogList = walkingDogService.getWalkingDogList(dogId, condition);
        List<WalkingResponse> data = walkingDogList.getData().stream().map(WalkingResponse::new).collect(Collectors.toList());
        return ResponseEntity.ok().body(new ScrollResponse<>(data, walkingDogList.getHasNext(), walkingDogList.getCurLastIdx(), walkingDogList.getLimit()));
    }

    @GetMapping("/dog/{dogId}/walkingdog/{walkingDogId}")
    public ResponseEntity<WalkingDto> getWalkingDetail(@PathVariable Long walkingDogId) {
        return ResponseEntity.ok().body(new WalkingDto(walkingDogService.walkingDogDetail(walkingDogId)));
    }

    @GetMapping("/walking")
    public ResponseEntity<?> getWalkingDate(@ModelAttribute WalkingSearchCondition condition) {
        if (condition.getLastweek() != null && condition.getLastweek().equals(true)) {
            return ResponseEntity.ok().body(walkingDogRepository.getLastWeekWalkingDistance(condition.getDog()));
        } else {
            return ResponseEntity.ok().body(walkingDogRepository.getCurWeekWalkingInfo(condition.getDog()));
        }
    }

    @PostMapping("/walking")
    public ResponseEntity<CreateWalkingResponse> createWalking(@Valid @RequestBody CreateWalkingRequest request, BindingResult bindingResult) {
        validateRequest(bindingResult);
        Walking walking = new Walking(request.getWalkingDistance(), request.getWalkingTime(), request.getWalkingDate());
        Long walkingId = walkingDogService.saveWalking(walking);
        return ResponseEntity.ok().body(new CreateWalkingResponse(walkingId, "산책 정보가 등록되었습니다."));
    }

    @PostMapping("/walkingdog")
    public ResponseEntity<ResponseDTO> mappingWalkingDog(@RequestBody MappingWalkingDogRequest request) {
        walkingDogService.saveWalkingDog(request.getDogId(), request.getWalkingId(), request.getCalories());
        return ResponseEntity.ok().body(new ResponseDTO("산책 정보가 등록되었습니다."));
    }

    @DeleteMapping("/walkingdog/{walkingDogId}")
    public ResponseEntity<ResponseDTO> deleteWalkingDog(@PathVariable Long walkingDogId) {
        walkingDogService.deleteWalkingDog(walkingDogId);
        return ResponseEntity.ok().body(new ResponseDTO("산책 정보가 삭제되었습니다."));
    }

    private void validateRequest(BindingResult bindingResult) {
        if (bindingResult.hasErrors())
            throw new CustomMethodArgumentNotValidException(bindingResult);
    }
}
