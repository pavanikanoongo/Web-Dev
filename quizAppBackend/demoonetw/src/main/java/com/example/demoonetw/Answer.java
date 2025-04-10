package com.example.demoonetw;

import jakarta.persistence.*;

@Entity
@Table(name="answers")
public class Answer {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name="question_id",referencedColumnName="id")
    private Question question;

    @Column(nullable=false)
    private String answerText;

    @Column(nullable=false)
    private Boolean isCorrect;

    public Answer() {}

    public Answer(Question question, String answerText, Boolean isCorrect) {
        this.question = question;
        this.answerText = answerText;
        this.isCorrect = isCorrect;
    }

    public Long getId() {
        return id;
    }

    public Question getQuestion() {
        return question;
    }

    public String getAnswerText() {
        return answerText;
    }

    public Boolean getIsCorrect() {
        return isCorrect;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setQuestion(Question question) {
        this.question = question;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }

    public void setCorrect(Boolean correct) {
        isCorrect = correct;
    }
}
