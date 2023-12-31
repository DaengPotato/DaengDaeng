package com.daengdaeng.domain.member.domain;

import com.daengdaeng.domain.place.domain.Place;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Persistable;

import javax.persistence.*;

@Entity
@Table(name = "heart")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Heart implements Persistable<HeartId> {

    @EmbeddedId
    private HeartId id;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "member_id", insertable = false, updatable = false, nullable = false)
    private Member member;

    @ManyToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "place_id", insertable = false, updatable = false, nullable = false)
    private Place place;

    @Override
    public boolean isNew() {
        return this.id == null;
    }

    @Builder
    public Heart(HeartId heartId) {
        this.id = heartId;
    }

}
