package com.daengdaeng.global.domain;

import org.springframework.data.repository.CrudRepository;

public interface LoginAccessTokenRedisRepository extends CrudRepository<LoginAccessToken, String> {

}
