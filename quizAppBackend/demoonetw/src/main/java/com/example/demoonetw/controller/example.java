package com.example.demoonetw.controller;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api")
public class example {

    @GetMapping("/data")
    public List<String> getData() {
        return List.of("Spring Boot", "Backend API", "No Frontend Needed");
    }
}
