package com.daengdaeng.domain.pet.domain;import java.util.Date;import javax.persistence.Column;import javax.persistence.Entity;import javax.persistence.FetchType;import javax.persistence.GeneratedValue;import javax.persistence.GenerationType;import javax.persistence.Id;import javax.persistence.JoinColumn;import javax.persistence.ManyToOne;import javax.persistence.Table;import org.springframework.data.annotation.CreatedDate;import lombok.AccessLevel;import lombok.Builder;import lombok.Getter;import lombok.NoArgsConstructor;@NoArgsConstructor(access = AccessLevel.PROTECTED)@Getter@Entity@Table(name = "pet")public class Pet {	@Id	@GeneratedValue(strategy = GenerationType.IDENTITY)	@Column(name = "pet_id")	private int petId;	@Column(name = "name", nullable = false, length = 20)	private String name;	@CreatedDate	@Column(name = "birth", nullable = false)	private Date birth;	@Column(name = "gender", length = 1, nullable = false)	private int gender;	@Column(name = "weight", nullable = false)	private float weight;	@Column(name = "image", length = 2048)	private String image;	@ManyToOne(fetch = FetchType.LAZY)	@JoinColumn(name = "member_id")	private Member memberId;	@ManyToOne(fetch = FetchType.LAZY)	@JoinColumn(name = "mbti_id")	private Mbti mbtiId;	@Builder	public Pet(String name, Date birth, int gender, float weight, String image, Member memberId, Mbti mbtiId) {		this.name = name;		this.birth = birth;		this.gender = gender;		this.weight = weight;		this.image = image;		this.memberId = memberId;		this.mbtiId = mbtiId;	}}