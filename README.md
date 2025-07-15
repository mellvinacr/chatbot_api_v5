# Chatbot API (AdonisJS v5)

Ini adalah REST API sederhana untuk sistem chatbot yang dibuat menggunakan AdonisJS v5 dan PostgreSQL.

---

## Cara Menjalankan Proyek

1.  **Install dependensi:**
    ```bash
    npm install
    ```
2.  **Jalankan migrasi database:**
    ```bash
    node ace migration:run
    ```
3.  **Jalankan server pengembangan:**
    ```bash
    npm run dev
    ```
    Server akan berjalan di `http://localhost:3333`.

---

## Dokumentasi API

### 1. Kirim Pertanyaan

Mengirim pertanyaan baru ke chatbot, menyimpannya, dan mendapatkan jawaban.

-   **URL**: `/questions`
-   **Method**: `POST`
-   **Body (raw/json)**:
    ```json
    {
        "question": "Halo, apa itu Singhasari?"
    }
    ```
-   **Respons Sukses (200 OK)**:
    ```json
    {
        "answer": "Halo! Terima kasih atas pertanyaannya. Untuk informasi lebih lanjut..."
    }
    ```

### 2. Ambil Semua Percakapan

Mengambil daftar semua percakapan yang pernah terjadi.

-   **URL**: `/conversations`
-   **Method**: `GET`
-   **Respons Sukses (200 OK)**:
    ```json
    [
        {
            "id": 1,
            "sessionId": "a1b2c3d4-...",
            "lastMessage": "Jawaban dari bot...",
            "messages": [
                {
                    "id": 1,
                    "conversationId": 1,
                    "senderType": "user",
                    "message": "Halo, apa itu Singhasari?",
                    // ...
                },
                {
                    "id": 2,
                    "conversationId": 1,
                    "senderType": "bot",
                    "message": "Jawaban dari bot...",
                    // ...
                }
            ],
            // ...
        }
    ]
    ```

### 3. Ambil Detail Percakapan

Mengambil detail pesan dari satu percakapan spesifik berdasarkan ID-nya.

-   **URL**: `/conversations/:id`
-   **Method**: `GET`
-   **Contoh URL**: `http://localhost:3333/conversations/1`
-   **Respons Sukses (200 OK)**:
    ```json
    {
        "id": 1,
        "sessionId": "a1b2c3d4-...",
        "lastMessage": "Jawaban dari bot...",
        "messages": [
            // ... daftar pesan ...
        ]
    }
    ```