"use strict";

class PuzzlePiece {
    constructor(id, url) 
    {
        this.id = id;
        this.url = url;
        this.el = this.create();
    }

    create() 
    {
        const img = document.createElement("img");
        img.src = this.url;
        img.id = `piece-${this.id}`;
        img.classList.add("piece");
        img.draggable = true;

        img.addEventListener("dragstart", e => {
            e.dataTransfer.setData("text", img.id);
        });

        return img;
    }
}

class MapPuzzleApp 
{
    constructor() 
    {
        this.map = L.map("map").setView([52.2, 21.0], 14);
        L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png").addTo(this.map);

        this.tray = document.getElementById("tray");
        this.board = document.getElementById("board");

        document.getElementById("locBtn").onclick = () => this.locate();
        document.getElementById("snapBtn").onclick = () => this.makePuzzle();

        this.enableSlotDrop();
        this.enableNotifications();
    }

    enableNotifications() {
        if (Notification.permission !== "granted") 
          {
            Notification.requestPermission();
        }
    }

    locate() {
        navigator.geolocation.getCurrentPosition(pos => {
            const lat = pos.coords.latitude;
            const lng = pos.coords.longitude;
            this.map.setView([lat, lng], 15);
        });
    }

    makePuzzle() {
        this.tray.innerHTML = "";

        const zoom = this.map.getZoom();
        const c = this.map.getCenter();

        const tileX = Math.floor((c.lng + 180) / 360 * Math.pow(2, zoom));
        const tileY = Math.floor(
            (1 - Math.log(Math.tan(c.lat * Math.PI/180) +
            1/Math.cos(c.lat*Math.PI/180)) / Math.PI) / 2 * Math.pow(2, zoom)
        );

        const pieces = [];
        let id = 0;

        for (let y = 0; y < 4; y++) 
          {
            for (let x = 0; x < 4; x++) 
              {
                const url = `https://tile.openstreetmap.org/${zoom}/${tileX + x}/${tileY + y}.png`;
                pieces.push(new PuzzlePiece(id++, url));
            }
        }

        pieces.sort(() => Math.random() - 0.5);
        pieces.forEach(p => this.tray.appendChild(p.el));
    }

    enableSlotDrop() 
    {
        const slots = document.querySelectorAll(".slot");

        slots.forEach(slot => {
            slot.addEventListener("dragover", e => e.preventDefault());
            slot.addEventListener("drop", e => {
                const id = e.dataTransfer.getData("text");
                const piece = document.getElementById(id);

                if (slot.firstChild) return;

                slot.appendChild(piece);
                this.checkWin();
            });
        });
    }

    checkWin() 
    {
        const slots = Array.from(document.querySelectorAll(".slot"));

        for (let i = 0; i < 16; i++) 
          {
            if (!slots[i].firstChild) return;
            if (slots[i].firstChild.id !== `piece-${i}`) return;
        }

        console.log("Puzzle poprawnie ułożone!");

        if (Notification.permission === "granted") 
          {
            new Notification("Puzzle", {
                body: "Puzzle zostały poprawnie ułożone!",
                icon: "https://cdn-icons-png.flaticon.com/512/992/992634.png"
            });
        } else {
            Notification.requestPermission().then(state => 
              {
                if (state === "granted") 
                  {
                    new Notification("Puzzle", {
                        body: "Puzzle zostały poprawnie ułożone!",
                        icon: "https://cdn-icons-png.flaticon.com/512/992/992634.png"
                    });
                }
            });
        }
    }
}

window.onload = () => new MapPuzzleApp();
