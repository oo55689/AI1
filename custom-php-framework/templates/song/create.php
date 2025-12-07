<h1>Add Song</h1>

<form method="POST" action="?action=song-create">
    Title: <input name="song[title]"><br>
    Artist: <input name="song[artist]"><br>
    Album: <input name="song[album]"><br>
    Genre: <input name="song[genre]"><br>
    Year: <input type="number" name="song[year]"><br>
    Description:<br>
    <textarea name="song[description]"></textarea><br>
    <button type="submit">Save</button>
</form>
