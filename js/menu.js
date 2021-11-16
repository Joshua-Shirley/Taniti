let Menu = {
    init: function() {
        var m = document.getElementById("mainMenu");
        m.innerHTML = "";
        m.appendChild(this.build());
    },
    links: [
        { href: "taniti-map.html", text: "Map" },
        { href: "taniti-hotels.html", text: "Hotels" },
        { href: "taniti-beaches.html", text: "Beaches" },
        { href: "taniti-transit.html", text: "Transit" },
        { href: "taniti-laws.html", text: "Laws" },
        { href: "search.html", text: "Search" }
    ],
    build: function() {
        var ul = document.createElement("ul");
        this.links.forEach(link => {
            var li = document.createElement("li");
            var el = document.createElement("a");
            el.href = link.href;
            el.innerHTML = link.text;
            li.appendChild(el);
            ul.appendChild(li);
        });
        return ul;
    },
    toggle: function() {
        var m = document.getElementById("mainMenu");
        var h = document.querySelector(".hamburger");
        if (m.classList.contains("open")) {
            m.classList.remove("open");
            h.classList.remove("checked");
        } else {
            h.classList.add("checked");
            m.classList.add("open");

        }
    }
}

Menu.init();