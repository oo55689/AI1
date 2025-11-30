const msg: string = "Hello!";
alert(msg);

type StyleDefinition = 
{
    id: string;
    label: string;
    file: string;
};

const styles: StyleDefinition[] = 
[
    { id: "style-1", label: "Styl jasny", file: "style-1.css" },
    { id: "style-2", label: "Styl futurystyczny", file: "style-2.css" },
    { id: "style-3", label: "Styl czerwony", file: "style-3.css" },
];

let currentStyleId = "style-1";

function setStyle(styleId: string) 
{
    const def = styles.find(s => s.id === styleId);
    if (!def) return;

    const old = document.querySelector('link[data-current-style="true"]');
    if (old) old.remove();

    const link = document.createElement("link");
    link.rel = "stylesheet";
    link.href = def.file;
    link.dataset.currentStyle = "true";
    document.head.appendChild(link);
}

function createMenu() 
{
    const header = document.querySelector("header");
    if (!header) return;

    const section = document.createElement("section");
    section.id = "style-switcher";
    section.innerHTML = "<h2>Wybierz styl:</h2>";

    const ul = document.createElement("ul");
    ul.style.display = "flex";
    ul.style.gap = "10px";
    ul.style.listStyle = "none";

    styles.forEach(s => {
        const li = document.createElement("li");
        const a = document.createElement("a");
        a.href = "#";
        a.textContent = s.label;
        a.addEventListener("click", e => {
            e.preventDefault();
            setStyle(s.id);
        });

        li.appendChild(a);
        ul.appendChild(li);
    });

    section.appendChild(ul);
    header.appendChild(section);
}

document.addEventListener("DOMContentLoaded", () => {
    setStyle(currentStyleId);
    createMenu();
});
