package com.example.demoonetw;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.ComponentScan;

//		(basePackages = "com.example.demoonetw.controller") //		(scanBasePackages = "com.example.demoonetw")
@SpringBootApplication
@ComponentScan
public class DemoonetwApplication {

	public static void main(String[] args) {
		SpringApplication.run(DemoonetwApplication.class, args);
	}

}
