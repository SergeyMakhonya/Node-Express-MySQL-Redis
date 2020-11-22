# Сервер заметок
Тестовое задание в котором нужно создать многопользовательский сервис для работы с заметками.

Необходимый функционал в API
 - Регистрация пользователя
 - Авторизация пользователя
 - Разлогин пользователя со сбросом всех сессий пользователя
 - Создание заметки
 - Получение списка заметок (учесть, что заметок может быть сколь угодно много у каждого пользователя)
 - Редактирование заметки
 - Удаление заметки
 - Расшаривание заметки для неавторизованного пользователя
 - Отображение текста заметки неавторизованному пользователю по ссылке

# Перед запуском сервера или тестов
Для работы тестов и самого сервера, нужно поднять базу данных MySQL и Redis через докер-контейнеры командой:

```
docker-compose up -d
```

После чего установить все необходимые пакеты:

```
npm ci
```

# Запуск тестов
Для запуска тестов нужно выполнить команду:

```
npm test
```

# Запуск сервера
## Перед запуском
Сперва нужно убедиться что в файле `.env` указаны верные параметры.

> Пример конфигурационного файла для разработки `.env.dev`.

> Пример конфигурационного файла для продакшена `.env.prod`.

| Параметр | Описание |
| ------ | ------ |
| NODE_ENV | Режим работы сервера `development` или `production` |
| DB_HOST | Адрес сервера БД MySQL |
| DB_DATABASE | Имя БД MySQL |
| DB_USER | Имя пользователя БД MySQL |
| DB_PASSWORD | Пароль пользователя БД MySQL |
| HASH_SALT | Соль для генерации хэша для публичных ссылок |
| JWT_SECRET | Соль для генерации JWT токена |
| JWT_EXPIRES_SECONDS | Время жизни JWT токена в секундах |

## Режим разработки `development`
> В режиме разработки, при вызове любого API-метода, текст ошибки будет приходить в теле ответа.

Для запуска сервера нужно выполнить команду:

```
npm run watch
```

В случае успеха в терминале появится сообщение `Server started!`.

## Режим продакшена
Для запуска сервера в режиме продакшена нужно выполнить последовательность каманд:

```
npm run build
npm start
```

В случае успеха в терминале появится сообщение `Server started!`.

# Postman
Для ручного тестирования в корне проекта вы найдёте
- Postman-коллекцию `notes.postman_collection.json`
- Postman-окружение `notes-environment.postman_environment.json`

После импорта коллекции и окружения, нужно выбрать окружение `notes-environment` в качестве текущего.

Все методы разложены по папкам.

> При вызове метода `/auth/signup`, полученный токен будет автоматически записан в Postman-окружение. Тем самым ненужно каждому методу указывать новый токен.

# MySQL и Redis
- Для хранения основных данных используется база данных MySQL.
- Для хранения сессий используется Redis.

# Завершение
После проверки тестового задания, нужно положить базу MySQL и Redis командой:
```
docker-compose down
```