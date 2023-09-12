package com.daengdaeng.domain.member.domain;

import javax.persistence.*;

import lombok.*;

import javax.validation.constraints.Email;

@Entity
@Table(name = "member")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private int memberId;

    @Email
    @Column(length = 320, unique = true, nullable = false)
    private String email;

    @Column(length = 20, unique = true, nullable = false)
    private String nickname;

    @Enumerated(value = EnumType.STRING)
    @Column(length = 10, nullable = false)
    private LoginType loginType;

    @Builder
    public Member( String email, String nickname, LoginType loginType) {
        this.email = email;
        this.nickname = nickname;
        this.loginType = loginType;
    }


    public void updateEmail(String email) {
        this.email = email;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }


}
