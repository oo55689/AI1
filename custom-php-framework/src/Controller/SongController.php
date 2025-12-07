<?php
namespace App\Controller;

use App\Model\Song;
use App\Exception\NotFoundException;
use App\Service\Templating;
use App\Service\Router;

class SongController
{
    public function indexAction(Templating $templating, Router $router): ?string
    {
        $songs = Song::findAll();

        return $templating->render('song/index.php', [
            'songs' => $songs,
            'router' => $router,
        ]);
    }

    public function createAction(?array $requestSong, Templating $templating, Router $router): ?string
    {
        if ($requestSong) {
            $song = Song::fromArray($requestSong);
            $song->save();

            $path = $router->generatePath('song-index');
            $router->redirect($path);
            return null;
        }

        $song = new Song();

        return $templating->render('song/create.php', [
            'song' => $song,
            'router' => $router,
        ]);
    }

    public function editAction(int $songId, ?array $requestSong, Templating $templating, Router $router): ?string
    {
        $song = Song::find($songId);

        if (!$song) {
            throw new NotFoundException("Song not found: $songId");
        }

        if ($requestSong) {
            $song->fill($requestSong);
            $song->save();

            $path = $router->generatePath('song-index');
            $router->redirect($path);
            return null;
        }

        return $templating->render('song/edit.php', [
            'song' => $song,
            'router' => $router,
        ]);
    }

    public function showAction(int $songId, Templating $templating, Router $router): ?string
    {
        $song = Song::find($songId);

        if (!$song) {
            throw new NotFoundException("Song not found: $songId");
        }

        return $templating->render('song/show.php', [
            'song' => $song,
            'router' => $router,
        ]);
    }

    public function deleteAction(int $songId, Router $router): ?string
    {
        $song = Song::find($songId);

        if (!$song) {
            throw new NotFoundException("Song not found: $songId");
        }

        $song->delete();

        $path = $router->generatePath('song-index');
        $router->redirect($path);
        return null;
    }
}
