package com.daengdaeng.domain.member.domain;

import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

import com.daengdaeng.domain.member.domain.HeartId;
import org.springframework.data.domain.Persistable;

@Entity
@Table(name = "heart")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Heart implements Persistable<HeartId>
{

    @EmbeddedId
    private HeartId id;

    @Builder
    public Heart(Member member, Place place) {
        this.id = new HeartId(member, place);
    }

    @Override
    public boolean isNew() {
        return this.id == null || (this.id.getMember() == null && this.id.getPlace() == null);
    }
}
