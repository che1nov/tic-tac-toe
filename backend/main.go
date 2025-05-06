package main

import (
	"log"
	"net/http"
)

func main() {
	// Маршрут для статических файлов (используем папку frontend)
	fs := http.FileServer(http.Dir("./frontend"))
	http.Handle("/", fs)

	log.Println("Сервер запущен на порту :8080")
	err := http.ListenAndServe("0.0.0.0:8080", nil)
	if err != nil {
		log.Fatal("Ошибка запуска сервера:", err)
	}
}
