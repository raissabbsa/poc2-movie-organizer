#movies
Back-end to organize the movies you want to see

POST: /movie
Body: {
  "name": "A dama de ferro",
  "platform_id": 3,
  "user_id": 4,
  "genre_id": 4,
  "status": "waiting"
}

PUT: /movie
Body: { "id": 1, "note": "Muito bom" }

POST: /user
Body: {
  "name": "Ana",
  "cpf": "04422222222",
  "phone": "85999990000"
}

GET: /platforms

GET: /genre/:id

DELETE: /movie
Body: { "id": 6 }