<?php
require_once __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'autoload.php';

$config = new \App\Service\Config();
$templating = new \App\Service\Templating();
$router = new \App\Service\Router();

$view = null;

$action = $_GET['action'] ?? null;
$id = isset($_GET['id']) ? (int)$_GET['id'] : null;

switch ($action) {

    //
    // POST
    //
    case 'post-index':
    case null:
        $controller = new \App\Controller\PostController();
        $view = $controller->indexAction($templating, $router);
        break;

    case 'post-create':
        $controller = new \App\Controller\PostController();
        $view = $controller->createAction($_POST['post'] ?? null, $templating, $router);
        break;

    case 'post-edit':
        if (!$id) break;
        $controller = new \App\Controller\PostController();
        $view = $controller->editAction($id, $_POST['post'] ?? null, $templating, $router);
        break;

    case 'post-show':
        if (!$id) break;
        $controller = new \App\Controller\PostController();
        $view = $controller->showAction($id, $templating, $router);
        break;

    case 'post-delete':
        if (!$id) break;
        $controller = new \App\Controller\PostController();
        $view = $controller->deleteAction($id, $router);
        break;



    //
    // SONG
    //

    case 'song-index':
        $controller = new \App\Controller\SongController();
        $view = $controller->indexAction($templating, $router);
        break;

    case 'song-create':
        $controller = new \App\Controller\SongController();
        $view = $controller->createAction($_POST ?? null, $templating, $router);
        break;


    case 'song-edit':
        if (!$id) break;
        $controller = new \App\Controller\SongController();
        $view = $controller->editAction($id, $_POST ?? null, $templating, $router);
        break;

    case 'song-show':
        if (!$id) break;
        $controller = new \App\Controller\SongController();
        $view = $controller->showAction($id, $templating, $router);
        break;

    case 'song-delete':
        if (!$id) break;
        $controller = new \App\Controller\SongController();
        $view = $controller->deleteAction($id, $router);
        break;



    //
    // INFO
    //
    case 'info':
        $controller = new \App\Controller\InfoController();
        $view = $controller->infoAction();
        break;

    default:
        $view = "Not found";
        break;
}

if ($view !== null) {
    echo $view;
}
