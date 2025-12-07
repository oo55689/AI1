CREATE TABLE IF NOT EXISTS song
(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    artist TEXT NOT NULL,
    album TEXT NOT NULL,
    genre TEXT NOT NULL,
    year INTEGER NOT NULL,
    description TEXT
);
