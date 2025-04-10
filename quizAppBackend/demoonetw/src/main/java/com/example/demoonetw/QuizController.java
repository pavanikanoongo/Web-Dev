package com.example.demoonetw;

import com.example.demoonetw.Services.QuizService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/quiz")
public class QuizController {
    @Autowired
    private QuizService quizService;
    @GetMapping("/questions")
    public ResponseEntity<List<Question>> getQuestions(
            @RequestParam String category,
            @RequestParam String difficulty,
            @RequestParam String language){
                List<Question> questions=quizService.getQuestions(category,difficulty,language);
                return ResponseEntity.ok(questions);
    }
    @GetMapping("/answers")
    public ResponseEntity<List<Answer>> getAnswers(@RequestParam Long questionId){
        Question question=new Question();
        question.setId(questionId);
        List<Answer> answers=quizService.getAnswers(question);
        return ResponseEntity.ok(answers);
    }
}
