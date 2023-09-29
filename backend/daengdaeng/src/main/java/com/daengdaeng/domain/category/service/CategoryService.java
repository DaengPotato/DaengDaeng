package com.daengdaeng.domain.category.service;

import java.util.List;

import com.daengdaeng.domain.place.dto.response.FindCategoryResponse;

public interface CategoryService {
	List<FindCategoryResponse> getCategory();
}
