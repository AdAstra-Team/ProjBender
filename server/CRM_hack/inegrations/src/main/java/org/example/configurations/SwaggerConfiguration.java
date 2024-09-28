package org.example.configurations;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfiguration {

    @Value("${swagger.server.url:#{null}}") // Значение по умолчанию будет взято с адреса запроса
    private String swaggerServerUrl;

    @Bean
    public OpenAPI customOpenAPI() {
        OpenAPI openAPI = new OpenAPI()
                .servers(List.of(
                        new Server().url("https://ad-4stra.ru/api/").description("Production Server"),
                        new Server().url("http://localhost:8082/api/").description("Local Development Server")
                ))
                .addSecurityItem(new SecurityRequirement().addList("bearerAuth"))
                .components(new Components()
                        .addSecuritySchemes("bearerAuth", new SecurityScheme()
                                .type(SecurityScheme.Type.HTTP)
                                .scheme("bearer")
                                .bearerFormat("JWT")
                                .in(SecurityScheme.In.HEADER)
                                .name("Authorization")))
                .info(new Info()
                        .title("General API ProjBender ")
                        .version("1.0")
                        .description("From Ad Astra"));

        // Если серверный URL определён в properties, добавляем его
        if (swaggerServerUrl != null) {
            openAPI.addServersItem(new Server().url(swaggerServerUrl));
        }

        return openAPI;
    }
}
