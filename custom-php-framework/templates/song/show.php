<h1><?= htmlspecialchars($song->title) ?></h1>

<p><b>Artist:</b> <?= htmlspecialchars($song->artist) ?></p>
<p><b>Album:</b> <?= htmlspecialchars($song->album) ?></p>
<p><b>Genre:</b> <?= htmlspecialchars($song->genre) ?></p>
<p><b>Year:</b> <?= htmlspecialchars($song->year) ?></p>
<p><b>Description:</b><br><?= nl2br(htmlspecialchars($song->description)) ?></p>

<a href="?action=song-index">Back</a>

