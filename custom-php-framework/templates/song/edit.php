<h1>Edit Song</h1>

<form method="POST">
    <label>Title:</label><br>
    <input name="title" value="<?= htmlspecialchars($song->title) ?>"><br><br>

    <label>Artist:</label><br>
    <input name="artist" value="<?= htmlspecialchars($song->artist) ?>"><br><br>

    <label>Album:</label><br>
    <input name="album" value="<?= htmlspecialchars($song->album) ?>"><br><br>

    <label>Genre:</label><br>
    <input name="genre" value="<?= htmlspecialchars($song->genre) ?>"><br><br>

    <label>Year:</label><br>
    <input type="number" name="year" value="<?= htmlspecialchars($song->year) ?>"><br><br>

    <label>Description:</label><br>
    <textarea name="description"><?= htmlspecialchars($song->description) ?></textarea><br><br>

    <button type="submit">Save</button>
</form>

<br>
<a href="?action=song-index">Back to list</a>
