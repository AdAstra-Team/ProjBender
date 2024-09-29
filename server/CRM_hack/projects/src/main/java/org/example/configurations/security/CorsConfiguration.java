package org.example.configurations.security;

import org.springframework.context.annotation.Bean;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfiguration implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")  // Настройка для всех путей
                .allowedOrigins("https://ad-4stra.ru")  // Разрешить запросы с вашего домена
                .allowedOrigins("https://localhost")  // Разрешить запросы с вашего домена
                .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")  // Разрешенные HTTP-методы
                .allowedHeaders("*")  // Разрешить все заголовки
                .allowCredentials(true);  // Разрешить отправку куков и других учетных данных
    }
}
