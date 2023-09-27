package com.daengdaeng.domain.category.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.stereotype.Service;

import com.daengdaeng.domain.category.domain.Category;
import com.daengdaeng.domain.category.repository.CategoryRepository;
import com.daengdaeng.domain.place.dto.response.FindCategoryResponse;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CategoryServiceImpl implements CategoryService {

	private final CategoryRepository categoryRepository;
	@Override
	public List<FindCategoryResponse> getCategory() {
		List<Category> categoryList = categoryRepository.findAll();
		List<FindCategoryResponse> findCategoryResponseList = new ArrayList<>();
		for(Category category: categoryList){
			FindCategoryResponse findCategoryResponse = new FindCategoryResponse(category.getCategoryId(), category.getCategory());
			findCategoryResponseList.add(findCategoryResponse);
		}
		return findCategoryResponseList;
	}
}
