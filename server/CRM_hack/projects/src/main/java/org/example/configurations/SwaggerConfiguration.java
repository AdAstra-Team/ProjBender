package org.example.configurations;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfiguration {

    @Value("${swagger.server.url:#{null}}") // Значение по умолчанию будет взято с адреса запроса
    private String swaggerServerUrl;

    @Bean
    public OpenAPI customOpenAPI() {
        OpenAPI openAPI = new OpenAPI()
                .info(new Info()
                        .title("API Documentation")
                        .version("1.0")
                        .description("Описание вашего API"));

        // Если серверный URL определён в properties, добавляем его
        if (swaggerServerUrl != null) {
            openAPI.addServersItem(new Server().url(swaggerServerUrl));
        }

        return openAPI;
    }
}
