<h1>Song List</h1>

<p><a href="?action=song-create">Add New Song</a></p>

<ul>
    <?php foreach ($songs as $s): ?>
        <li>
            <strong><?= htmlspecialchars($s->title) ?></strong>
            — <?= htmlspecialchars($s->artist) ?>
            — <i><?= htmlspecialchars($s->album) ?></i>
            (<?= htmlspecialchars($s->year) ?>)

            <br>
            <a href="?action=song-show&id=<?= $s->id ?>">Show</a> |
            <a href="?action=song-edit&id=<?= $s->id ?>">Edit</a> |
            <a href="?action=song-delete&id=<?= (int)$s->id ?>">Delete</a>
        </li>
    <?php endforeach; ?>
</ul>
