package com.example.daengdaeng.domain.pet.domain;import java.util.Date;import javax.persistence.Column;import javax.persistence.Entity;import javax.persistence.GeneratedValue;import javax.persistence.GenerationType;import javax.persistence.Id;import javax.persistence.Table;import org.springframework.data.annotation.CreatedDate;import lombok.AllArgsConstructor;import lombok.Data;import lombok.NoArgsConstructor;@NoArgsConstructor@AllArgsConstructor@Data@Entity@Table(name = "mbti")public class Mbti {	@Id	@GeneratedValue(strategy = GenerationType.IDENTITY)	@Column(name = "mbti_id")	private int mbtiId;	@Column(name = "mbti", nullable = false)	private String mbti;	@Column(name = "content", nullable = false)	private String content;}