# ProjBender
Проект масштабируемая CRM системы
## Структура проекта
1. [Client folder](https://github.com/AdAstra-Team/ProjBender/tree/main/client) Содержит реализацию Frondend на фреймворке React
2. [Server folder](https://github.com/AdAstra-Team/ProjBender/tree/main/server/CRM_hack) Содержит микросервисы Backend части системы + конфигурацию Nginx
3. [Intergations folder](https://github.com/AdAstra-Team/ProjBender/tree/main/examples_of_integrations) Содержит примеры того, как можно использовать наше API конфигурации.
## Инструкция по экспулотации
1. Авторизация/регистрация []()
2. Frontend системы [https://ad-4stra.ru](https://ad-4stra.ru)
3. General API системы [https://ad-4stra.ru/api/swagger-ui/index.html](https://ad-4stra.ru/api/swagger-ui/index.html)
4. Integrations API системы [https://ad-4stra.ru/integrations/swagger-ui/index.html](https://ad-4stra.ru/integrations/swagger-ui/index.html)


## Инструкция по запуску
1. (Опционально) Изменить наши хосты баз данных для микросервисов и изменить наши данные сервиса авторизации.
2. Запуск оркестра контейнеров
   ```
   sudo docker compose up -d 
   ```
3. (Опционально) Запуск Телеграм бота
   ```
   cd examples_of_integrations/
   sudo bash tg_bot_project_manager.sh
   ```
