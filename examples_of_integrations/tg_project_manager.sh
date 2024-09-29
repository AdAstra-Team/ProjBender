#!/bin/bash

# Установите токен вашего бота
BOT_TOKEN="7613747402:AAEOSZsgmleO39O3FjMmUKNK58Xa6P8KH94"
API_URL="https://api.telegram.org/bot$BOT_TOKEN"

# Переменные для хранения токена и сообщений от пользователя
USER_TOKEN=""
USER_MESSAGE=""
OFFSET=0  # Переменная для хранения последнего обработанного сообщения

# Функция для отправки сообщения пользователю
send_message() {
    local chat_id=$1
    local text=$2
    curl -s -X POST "$API_URL/sendMessage" -d chat_id="$chat_id" -d text="$text"
}

while true; do
    # Получаем обновления от Telegram, начиная с последнего обработанного сообщения
    UPDATES=$(curl -s "$API_URL/getUpdates?offset=$OFFSET")

    # Проверяем, есть ли новые сообщения
    RESULT_COUNT=$(echo "$UPDATES" | jq '.result | length')

    if [[ $RESULT_COUNT -gt 0 ]]; then
        # Парсим входящие сообщения
        MESSAGE_TEXT=$(echo "$UPDATES" | jq -r '.result[-1].message.text')
        CHAT_ID=$(echo "$UPDATES" | jq -r '.result[-1].message.chat.id')
        UPDATE_ID=$(echo "$UPDATES" | jq -r '.result[-1].update_id')

        # Обновляем offset, чтобы больше не обрабатывать это сообщение
        OFFSET=$((UPDATE_ID + 1))

        if [[ $USER_TOKEN == "" ]]; then
            # Первое сообщение от пользователя должно содержать токен (UUID)
            if [[ $MESSAGE_TEXT =~ [0-9a-fA-F-]{36} ]]; then
                USER_TOKEN=$MESSAGE_TEXT
                send_message "$CHAT_ID" "Токен сохранён: $USER_TOKEN"
            else
                send_message "$CHAT_ID" "Пожалуйста, отправьте токен в формате UUID."
            fi
        else
            # Команда "get project" для GET-запроса
            if [[ $MESSAGE_TEXT == "/getproject" ]]; then
                RESPONSE=$(curl -s -X 'GET' \
                    "http://localhost:8083/integrations/integrations/projects/project?token=$USER_TOKEN" \
                    -H 'accept: */*')
                send_message "$CHAT_ID" "Ответ от API: $RESPONSE"
            
            # Все остальные сообщения отправляются как POST-запрос
            else
                USER_MESSAGE="$MESSAGE_TEXT"
                RESPONSE=$(curl -s -X 'POST' \
                    "http://localhost:8083/integrations/integrations/projects/project/add_task?token=$USER_TOKEN&description=${USER_MESSAGE}%20desc&name=tg_Task%20name" \
                    -H 'accept: */*')
                send_message "$CHAT_ID" "Задача добавлена. Ответ от API: $RESPONSE"
            fi
        fi
    fi

    # Устанавливаем задержку для повторного запроса обновлений
    sleep 2
done

