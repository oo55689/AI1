<h1>Song List</h1>

<a href="?controller=song&action=create">Add new song</a>

<ul>
    <?php foreach ($songs as $s): ?>
        <li>
            <strong><?= $s->title ?></strong>
            — <?= $s->artist ?>
            — <i><?= $s->album ?></i>
            (<?= $s->year ?>)

            <br>
            <a href="?controller=song&action=show&id=<?= $s->id ?>">Show</a>
            |
            <a href="?controller=song&action=edit&id=<?= $s->id ?>">Edit</a>
            |
            <a href="?controller=song&action=delete&id=<?= $s->id ?>">Delete</a>
        </li>
    <?php endforeach; ?>
</ul>
