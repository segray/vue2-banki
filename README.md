# Установка

### через системный node.js
```
npm install
npm run dev
```

приложение будет доступно по адресу localhost:9000


### docker
Для тестирования на node 16 версии, в каталоге .cicd есть необходимый конфиг
```
cd .cicd
docker compose up
```
Установится контейнер с node:16-alpine и приложение в dev режиме. Минимально рабочая конфигурация.
