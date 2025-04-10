package com.example.demoonetw.controller;

import com.example.demoonetw.Answer;
import com.example.demoonetw.Repository.AnswerRepository;
import com.example.demoonetw.Question;
import com.example.demoonetw.Repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answers")
public class AnswerController {

    @Autowired
    private AnswerRepository answerRepository;

    @Autowired
    private QuestionRepository questionRepository;

    // Add a new answer
    @PostMapping("/add")
    public ResponseEntity<Answer> addAnswer(@RequestBody Answer answer) {
        Answer savedAnswer = answerRepository.save(answer);
        return ResponseEntity.ok(savedAnswer);
    }

    // Get answers for a question
    @GetMapping("/by-question")
    public ResponseEntity<List<Answer>> getAnswersByQuestion(@RequestParam Long questionId) {
        Question question = questionRepository.findById(questionId).orElse(null);
        if (question == null) {
            return ResponseEntity.badRequest().build();
        }

        List<Answer> answers = answerRepository.findByQuestion(question);
        return ResponseEntity.ok(answers);
    }
}
