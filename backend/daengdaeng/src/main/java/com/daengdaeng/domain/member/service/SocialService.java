package com.daengdaeng.domain.member.service;


import java.util.Map;

public interface SocialService {

    Map<String,String> login(String code, String loginType);

    void logout(String email);

    void removeMember(String email);

}
