package com.example.daengdaeng.domain.photo.domain;

import com.example.daengdaeng.domain.place.domain.Place;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
public class ImageList {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long imageId;

    @ManyToOne
    @JoinColumn(name = "place_id")
    private Place place;


}
