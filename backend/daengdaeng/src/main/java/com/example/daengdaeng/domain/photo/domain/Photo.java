package com.example.daengdaeng.domain.photo.domain;

import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.lang.reflect.Member;

@Getter
@NoArgsConstructor
@Entity
public class Photo {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long photoId;

    private String imageUrl;

    @ManyToOne
    @JoinColumn(name = "member_id")
    private Member member;

}
