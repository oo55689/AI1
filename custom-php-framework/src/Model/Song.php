<?php
namespace App\Model;

use App\Service\Config;
use PDO;

class Song
{
    public ?int $id = null;
    public string $title = '';
    public string $artist = '';
    public string $album = '';
    public string $genre = '';
    public int $year = 0;
    public string $description = '';

    private static function getDb(): PDO
    {
        $config = new Config();
        return new PDO($config->get('db_dsn'));
    }

    public static function findAll(): array
    {
        $db = self::getDb();
        $stmt = $db->query("SELECT * FROM song ORDER BY id DESC");
        $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
        return array_map(fn($row) => self::fromArray($row), $rows);
    }

    public static function find(int $id): ?Song
    {
        $db = self::getDb();
        $stmt = $db->prepare("SELECT * FROM song WHERE id = :id");
        $stmt->execute(['id' => $id]);
        $row = $stmt->fetch(PDO::FETCH_ASSOC);
        return $row ? self::fromArray($row) : null;
    }

    public static function fromArray(array $data): Song
    {
        $song = new Song();
        if (isset($data['id'])) {
            $song->id = (int)$data['id'];
        }
        $song->fill($data);
        return $song;
    }

    public function fill(array $data): void
    {
        $this->title = $data['title'] ?? $this->title;
        $this->artist = $data['artist'] ?? $this->artist;
        $this->album = $data['album'] ?? $this->album;
        $this->genre = $data['genre'] ?? $this->genre;
        $this->year = isset($data['year']) ? (int)$data['year'] : $this->year;
        $this->description = $data['description'] ?? $this->description;
    }

    public function save(): void
    {
        $db = self::getDb();

        if ($this->id === null) {
            $stmt = $db->prepare("
                INSERT INTO song (title, artist, album, genre, year, description)
                VALUES (:title, :artist, :album, :genre, :year, :description)
            ");

            $stmt->execute([
                'title' => $this->title,
                'artist' => $this->artist,
                'album' => $this->album,
                'genre' => $this->genre,
                'year' => $this->year,
                'description' => $this->description
            ]);

            $this->id = (int)$db->lastInsertId();
        } else {
            $stmt = $db->prepare("
                UPDATE song
                SET title = :title,
                    artist = :artist,
                    album = :album,
                    genre = :genre,
                    year = :year,
                    description = :description
                WHERE id = :id
            ");

            $stmt->execute([
                'id' => $this->id,
                'title' => $this->title,
                'artist' => $this->artist,
                'album' => $this->album,
                'genre' => $this->genre,
                'year' => $this->year,
                'description' => $this->description
            ]);
        }
    }

    public function delete(): void
    {
        if ($this->id === null) return;

        $db = self::getDb();
        $stmt = $db->prepare("DELETE FROM song WHERE id = :id");
        $stmt->execute(['id' => $this->id]);
    }
}
