package com.daengdaeng.domain.pet.dto.request;import java.util.Date;import lombok.AllArgsConstructor;import lombok.Data;import lombok.NoArgsConstructor;@NoArgsConstructor@AllArgsConstructor@Datapublic class PetRequest {	private String name;	private Date birth;	private int gender;	private float weight;	private String image;}