package com.example.demoonetw.Repository;

import com.example.demoonetw.Answer;
import com.example.demoonetw.Question;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AnswerRepository extends JpaRepository<Answer,Long> {
    List<Answer> findByQuestion(Question question);
}
