package com.example.demoonetw.Services;

import com.example.demoonetw.Answer;
import com.example.demoonetw.Category;
import com.example.demoonetw.Question;
import com.example.demoonetw.Repository.AnswerRepository;
import com.example.demoonetw.Repository.CategoryRepository;
import com.example.demoonetw.Repository.QuestionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {
    @Autowired
    private QuestionRepository questionRepository;
    @Autowired
    private AnswerRepository answerRepository;
    @Autowired
    private CategoryRepository categoryRepository;

    public List<Question> getQuestions(String category, String difficulty, String language){
        Category categoryObj=categoryRepository.findByName(category);
        return questionRepository.findByCategoryAndDifficultyAndLanguage(categoryObj,difficulty,language);
    }
    public List<Answer> getAnswers(Question question){
        return answerRepository.findByQuestion(question);
    }


    public List<Category> getCat() {
        return categoryRepository.findAll();
    }

    public List<Question> getAllQuestions() {
        return questionRepository.findAll();
    }
}
