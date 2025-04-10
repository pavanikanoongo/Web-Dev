package com.example.demoonetw.Repository;

import com.example.demoonetw.Category;
import com.example.demoonetw.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface QuestionRepository extends JpaRepository<Question,Long> {
    List<Question> findByCategoryAndDifficultyAndLanguage(Category category, String difficulty, String language);
}
