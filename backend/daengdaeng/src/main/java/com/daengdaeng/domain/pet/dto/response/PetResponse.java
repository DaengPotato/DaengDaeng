package com.daengdaeng.domain.pet.dto.response;import java.util.Date;import javax.validation.constraints.NotBlank;import javax.validation.constraints.NotNull;import lombok.AllArgsConstructor;import lombok.NoArgsConstructor;@NoArgsConstructor@AllArgsConstructorpublic class PetResponse {	@NotNull	private int petId;	@NotBlank	private String name;	@NotNull	private Date birth;	@NotNull	private int gender;	@NotNull	private float weight;	private String image;	private Integer mbtiId;}