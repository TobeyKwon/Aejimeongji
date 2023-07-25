package com.ssafy.aejimeongji.domain.walking.domain.repository;

import com.querydsl.jpa.JPQLQueryFactory;
import com.ssafy.aejimeongji.domain.walking.application.dto.QWalkingDistanceResponse;
import com.ssafy.aejimeongji.domain.walking.application.dto.QWalkingInfoReponse;
import com.ssafy.aejimeongji.domain.walking.application.dto.WalkingDistanceResponse;
import com.ssafy.aejimeongji.domain.walking.application.dto.WalkingInfoReponse;
import com.ssafy.aejimeongji.domain.walking.domain.repository.WalkingDogRepositoryCustom;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.util.Calendar;
import java.util.Date;
import java.util.Locale;

import static com.ssafy.aejimeongji.domain.dog.domain.QDog.dog;
import static com.ssafy.aejimeongji.domain.walking.domain.QWalking.walking;
import static com.ssafy.aejimeongji.domain.walking.domain.QWalkingDog.walkingDog;


@Repository
@RequiredArgsConstructor
public class WalkingDogRepositoryCustomImpl implements WalkingDogRepositoryCustom {

    private final JPQLQueryFactory queryFactory;

    @Override
    public WalkingInfoReponse getCurWeekWalkingInfo(Long dogId) {
        return queryFactory
                .select(new QWalkingInfoReponse(walkingDog.count().intValue(), walking.distance.sum().doubleValue(), walking.walkingTime.sum().intValue()))
                .from(walkingDog)
                .join(walkingDog.walking, walking)
                .join(walkingDog.dog, dog)
                .where(walkingDog.dog.id.eq(dogId), walking.walkingDate.goe(getCurWeekMondayLocaldateTime()))
                .fetchOne();
    }

    @Override
    public WalkingDistanceResponse getLastWeekWalkingDistance(Long dogId) {
        return queryFactory
                .select(new QWalkingDistanceResponse(walking.distance.sum()))
                .from(walkingDog)
                .join(walkingDog.walking, walking)
                .join(walkingDog.dog, dog)
                .where(walkingDog.dog.id.eq(dogId), walking.walkingDate.goe(getLastWeekMondayLocaldate()), walking.walkingDate.lt(getCurWeekMondayLocaldateTime()))
                .fetchOne();
    }

    private LocalDateTime getCurWeekMondayLocaldateTime() {
        Calendar cal = Calendar.getInstance(Locale.KOREA);
        cal.setTime(new Date());
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        return cal.getTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atTime(0, 0, 0);
    }

    private LocalDateTime getLastWeekMondayLocaldate() {
        Calendar cal = Calendar.getInstance(Locale.KOREA);
        cal.setTime(new Date());
        cal.add(Calendar.DATE, -7);
        cal.set(Calendar.DAY_OF_WEEK, Calendar.MONDAY);
        return cal.getTime().toInstant().atZone(ZoneId.systemDefault()).toLocalDate().atTime(0, 0, 0);
    }
}
