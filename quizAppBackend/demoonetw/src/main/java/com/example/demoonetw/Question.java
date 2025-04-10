package com.example.demoonetw;

import jakarta.persistence.*;

@Entity
@Table(name="questions")
public class Question {
    @Id
    @GeneratedValue(strategy= GenerationType.IDENTITY)
    private Long id;

    @Column(nullable=false)
    private String questionText;

    @ManyToOne
    @JoinColumn(name="category_id",referencedColumnName="id")
    private Category category;

    @Column(nullable=false)
    private String difficulty;

    @Column(nullable=false)
    private String language;

    public Question() {
    }

    public Question(Long id, String questionText, Category category, String difficulty, String language) {
        this.id = id;
        this.questionText = questionText;
        this.category = category;
        this.difficulty = difficulty;
        this.language = language;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getId() {
        return id;
    }

    public String getQuestionText() {
        return questionText;
    }

    public Category getCategory() {
        return category;
    }

    public String getDifficulty() {
        return difficulty;
    }

    public String getLanguage() {
        return language;
    }
}
