package com.example.chat.web.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class ChatController {

    @GetMapping("/index")
    public String index() {
        String name = "test";
        return name;
    }
}