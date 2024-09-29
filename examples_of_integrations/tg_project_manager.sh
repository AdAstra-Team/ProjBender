#!/bin/bash

BOT_TOKEN="7613747402:AAEOSZsgmleO39O3FjMmUKNK58Xa6P8KH94"
API_URL="https://api.telegram.org/bot$BOT_TOKEN"

USER_TOKEN=""
USER_MESSAGE=""

send_message() {
    local chat_id=$1
    local text=$2
    curl -s -X POST "$API_URL/sendMessage" -d chat_id="$chat_id" -d text="$text"
}

while true; do
    UPDATES=$(curl -s "$API_URL/getUpdates")

    MESSAGE_TEXT=$(echo "$UPDATES" | jq -r '.result[-1].message.text')
    CHAT_ID=$(echo "$UPDATES" | jq -r '.result[-1].message.chat.id')

    if [[ $USER_TOKEN == "" ]]; then
        if [[ $MESSAGE_TEXT =~ [0-9a-fA-F-]{36} ]]; then
            USER_TOKEN=$MESSAGE_TEXT
            send_message "$CHAT_ID" "Токен сохранён: $USER_TOKEN"
        else
            send_message "$CHAT_ID" "Пожалуйста, отправьте токен в формате UUID."
        fi
    else
        if [[ $MESSAGE_TEXT == "/getproject" ]]; then
            RESPONSE=$(curl -s -X 'GET' \
                "http://localhost:8083/integrations/integrations/projects/project?token=$USER_TOKEN" \
                -H 'accept: */*')
            send_message "$CHAT_ID" "Ответ от API: $RESPONSE"
        
        else
            USER_MESSAGE="$MESSAGE_TEXT"
            RESPONSE=$(curl -s -X 'POST' \
                "http://localhost:8083/integrations/integrations/projects/project/add_task?token=$USER_TOKEN&description=${USER_MESSAGE}%20desc&name=tg_Task%20name" \
                -H 'accept: */*')
            send_message "$CHAT_ID" "Задача добавлена. Ответ от API: $RESPONSE"
        fi
    fi

    sleep 2
done
