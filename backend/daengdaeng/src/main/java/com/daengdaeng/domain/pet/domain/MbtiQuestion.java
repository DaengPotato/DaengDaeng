package com.daengdaeng.domain.pet.domain;import javax.persistence.Column;import javax.persistence.Entity;import javax.persistence.FetchType;import javax.persistence.GeneratedValue;import javax.persistence.GenerationType;import javax.persistence.Id;import javax.persistence.JoinColumn;import javax.persistence.OneToOne;import javax.persistence.Table;import lombok.AccessLevel;import lombok.Builder;import lombok.Getter;import lombok.NoArgsConstructor;@NoArgsConstructor(access = AccessLevel.PROTECTED)@Getter@Entity@Table(name = "mbti_question")public class MbtiQuestion {	@Id	@GeneratedValue(strategy = GenerationType.IDENTITY)	@Column(name = "question_id")	private int questionId;	@Column(name = "question", nullable = false)	private String question;	@Column(name = "answerA", nullable = false)	private String answerA;	@Column(name = "answerB", nullable = false)	private String answerB;	@OneToOne(fetch = FetchType.LAZY)	@JoinColumn(name = "type_id")	private MbtiType typeId;	@Builder	public MbtiQuestion(int questionId, String question, String answerA, String answerB, MbtiType typeId) {		this.questionId = questionId;		this.question = question;		this.answerA = answerA;		this.answerB = answerB;		this.typeId = typeId;	}}