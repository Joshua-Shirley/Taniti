const ratings = {
    type: "stars",
    total: 5,
    build: function(rate, total) {
        if (total != null) {
            this.total = total;
        }
        var div = document.createElement("div");
        div.classList.add("rating");

        var stars = rate;
        for (var i = 0; i < total; i++) {
            if (stars > 1) {
                div.appendChild(icon.insert("star-full"));
                stars -= 1;
            } else if (stars > 0) {
                div.appendChild(icon.insert("star-half"));
                stars = 0;
            } else {
                div.appendChild(icon.insert("star-empty"));
            }
        }
        return div;
    },
    starFull: function() {
        return icon.insert("star-full");
    },
    starEmpty: function() {
        return icon.insert("star-empty");
    },
    starHalf: function() {
        return icon.insert("star-half");
    }
}