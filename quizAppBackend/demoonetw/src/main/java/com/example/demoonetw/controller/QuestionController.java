package com.example.demoonetw.controller;

import com.example.demoonetw.Category;
import com.example.demoonetw.Repository.CategoryRepository;
import com.example.demoonetw.Question;
import com.example.demoonetw.Repository.QuestionRepository;
import com.example.demoonetw.Services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/questions")
public class QuestionController {

    @Autowired
    private QuestionRepository questionRepository;

    @Autowired
    private CategoryRepository categoryRepository;

    @Autowired
    private QuizService quizService;

    // Add a new question
    @PostMapping("/add")
    public ResponseEntity<Question> addQuestion(@RequestBody Question question) {
        Question savedQuestion = questionRepository.save(question);
        return ResponseEntity.ok(savedQuestion);
    }

    // Get questions by category, difficulty, and language
    @GetMapping("/filter")
    public ResponseEntity<List<Question>> getFilteredQuestions(

            @RequestParam String category,
            @RequestParam String difficulty,
            @RequestParam String language) {
        System.out.println("Received filter request: category=" + category + ", difficulty=" + difficulty + ", language=" + language);
        Category categoryObj = categoryRepository.findByName(category);
        if (categoryObj == null) {
            return ResponseEntity.badRequest().build();
        }

        List<Question> questions = questionRepository.findByCategoryAndDifficultyAndLanguage(categoryObj, difficulty, language);
        return ResponseEntity.ok(questions);
    }

    @GetMapping("/")
    public List<Question> getQuestion(){
        return quizService.getAllQuestions();
    }
}

