let Menu = {
    init: function() {
        var m = document.getElementById("mainMenu");
        m.innerHTML = "";
        m.appendChild(this.build());
    },
    links: [
        { href: "taniti-map.html", text: "Map", icon: "map" },
        { href: "taniti-hotels.html", text: "Hotels", icon: "hotel" },
        { href: "taniti-beaches.html", text: "Beaches", icon: "beach" },
        /*{ href: "taniti-transit.html", text: "Transit", icon: "bus" },*/
        { href: "taniti-laws.html", text: "Laws", icon: "gavel" },
        { href: "search.html", text: "Search", icon: "search" }
    ],
    build: function() {
        var ul = document.createElement("ul");
        this.links.forEach(link => {
            var li = document.createElement("li");
            var el = document.createElement("a");
            el.href = link.href;
            var text = document.createTextNode(link.text);
            el.appendChild(this.icon(link.icon));
            el.appendChild(text);
            li.appendChild(el);
            ul.appendChild(li);
        });
        return ul;
    },
    icon: function(src) {
        return icon.insert(src);
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
document.addEventListener('readystatechange', event => {
    if (event.target.readyState == "interactive") {
        Menu.init();
    }
});