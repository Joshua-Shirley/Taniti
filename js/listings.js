const hotelListings = {
    activeFilters: [],
    target: "hotels",
    init: function() {
        this.sort("price");
        this.locationDisplay();
        this.buttons();
        this.target = document.querySelector("#hotels .container");
    },
    sort: function(key) {
        if (Object.keys(hotels[0]).includes(key)) {
            if (key == "name") {
                hotels.sort((a, b) => (a.name > b.name ? 1 : -1));
            } else if (key == "price") {
                hotels.sort((a, b) => (a.price < b.price ? 1 : -1));
            } else if (key == "location") {
                hotels.sort((a, b) => (a.location > b.location ? 1 : -1));
            } else if (key == "rating") {
                hotels.sort((a, b) => (a.rating < b.rating ? 1 : -1));
            }
            this.load();
        }
    },
    reverse: function(key) {
        if (Object.keys(hotels[0]).includes(key)) {
            if (key == "name") {
                hotels.sort((a, b) => (a.name < b.name ? 1 : -1));
            } else if (key == "price") {
                hotels.sort((a, b) => (a.price > b.price) ? 1 : -1);
            } else if (key == "location") {
                hotels.sort((a, b) => (a.location < b.location ? 1 : -1));
            } else if (key == "rating") {
                hotels.sort((a, b) => (a.rating > b.rating ? 1 : -1));
            }
            this.load();
        }
    },
    load: function() {
        //document.querySelector("#" + this.target + " .container").innerHTML = "";
        this.target.innerHTML = "";
        // filter the hotel list
        if (this.activeFilters.length > 0) {
            var arr = hotels.filter(hotel => this.activeFilters.includes(hotel.location));
        } else {
            var arr = hotels;
        }

        arr.forEach(hotel => {
            this.hotelBlock(hotel.id);
        });
    },
    index: function(id) {
        return hotels.findIndex(hotel => hotel.id == id);
    },
    hotelBlock: function(id) {
        //var target = document.getElementById(this.target);
        //var target = document.querySelector("#" + this.target + " .container");
        var target = this.target;

        var index = this.index(id);
        var hotel = hotels[index];

        // create the row element
        var row = document.createElement("div");
        row.setAttribute("id", "hotel-" + hotel.id);
        row.classList.add("row");
        row.classList.add("mb-3");

        // create the two columns
        // col one
        var col1 = document.createElement("div");
        col1.classList.add("col");
        col1.classList.add("one");
        // append the hotel image

        var max = hotel.images.length;
        var ran = Math.floor(Math.random() * max);

        col1.appendChild(this.mainImage(hotel.images[ran].url, hotel.images[ran].alt));
        row.appendChild(col1);

        // col two
        var col2 = document.createElement("div");
        col2.classList.add("col");
        col2.classList.add("two");
        col2.appendChild(this.hotelName(hotel.name));
        col2.appendChild(this.location(hotel.location));
        row.appendChild(col2);

        // col two row
        var col2row = document.createElement("div");
        col2row.classList.add("row");
        // Add the user ratings
        col2row.appendChild(this.rating(hotel.rating));
        // Add the nightly price
        col2row.appendChild(this.prices(hotel.price));
        // Add the booking link
        col2row.appendChild(this.book());
        // 
        col2.appendChild(col2row);

        // Add a link
        //<a href="taniti-hotel.html?id=0001" class="blank"></a>
        var link = document.createElement("a");
        link.href = "taniti-hotel.html?id=" + hotel.id;
        link.classList.add("blank");
        link.appendChild(row);

        // Push to the DOM        
        target.appendChild(link);
    },

    mainImage: function(URL, ALT) {
        var div = document.createElement("div");
        var img = document.createElement("img");
        div.classList.add("imageHolder");
        div.classList.add("small");
        img.src = URL;
        img.alt = ALT;
        img.style.height = "-webkit-fill-available";
        div.appendChild(img);
        return div;
    },
    hotelName: function(name) {
        var div = document.createElement("div");
        div.classList.add("hotelName");
        div.innerHTML = name;
        return div;
    },
    location: function(location) {
        var div = document.createElement("div");
        div.classList.add("location");
        div.innerHTML = location;
        return div;
    },
    prices: function(nightlyPrice) {
        var div = document.createElement("div");
        div.classList.add("col");
        div.classList.add("prices");
        var span1 = document.createElement("span");
        span1.classList.add("text");
        span1.innerHTML = "From";
        var span2 = document.createElement("span");
        span2.classList.add("price");

        var formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
        span2.innerHTML = formatter.format(nightlyPrice);

        div.appendChild(span1);
        div.appendChild(span2);
        return div;
    },
    book: function() {
        var div = document.createElement("div");
        div.classList.add("col");
        div.classList.add("linkDetails");
        var span = document.createElement("span");
        span.innerHTML = "Book";
        div.appendChild(span);
        return div;
    },
    rating: function(userRating) {
        var div = document.createElement("div");
        div.classList.add("col");
        div.classList.add("rating");
        var a = document.createElement("a");
        a.classList.add("score");
        a.id = "score";
        if (userRating != undefined) {
            a.innerHTML = userRating.toFixed(1);
        } else {
            a.innerHTML = "5.0";
        }
        div.appendChild(a);
        return div;
    },
    sorts: function(key, direction) {
        var t = document.getElementsByName(key)[0];
        if (direction == "ascending") {
            this.sort(key);
            t.value = "descending";
            t.classList.remove("up");
            t.classList.add("down");
        } else {
            this.reverse(key);
            t.value = "ascending";
            t.classList.remove("down");
            t.classList.add("up");
        }
    },
    filters: function(key, status) {
        var t = document.getElementsByName(key)[0];
        var d = document.getElementsByName("hotelFilters")[0].querySelector(".filterList");
        if (status == "open") {
            t.classList.remove("open");
            t.classList.add("closed");
            t.value = "closed";
            d.classList.remove("show");
            d.classList.add("hide");
        } else {
            t.classList.remove("closed");
            t.classList.add("open");
            t.value = "open";
            d.classList.remove("hide");
            d.classList.add("show");
        }
    },
    filterLocation: function(value) {
        this.activeFilters = [];
        var d = document.getElementsByName("hotelFilters")[0].querySelector(".filterList");
        d.classList.remove("show");
        d.classList.add("hide");
        var inputs = document.querySelectorAll(".filterList input:checked");
        inputs.forEach(input => this.activeFilters.push(input.value));
        this.load();
    },
    buttons: function() {
        var sorts = document.querySelectorAll(".filters button.sort");
        sorts.forEach(button => {
            button.addEventListener("click", event => {
                this.sorts(button.name, button.value);
            });
        });
        var filters = document.querySelectorAll(".filters button.filter");
        filters.forEach(button => {
            button.addEventListener("click", event => {
                this.filters(button.name, button.value);
            });
        });
        var loc = document.querySelectorAll(".filterList input[name='locations']");
        loc.forEach(input => {
            input.addEventListener("change", event => {
                this.filterLocation();
                var t = document.getElementsByName("location")[0];
                t.classList.remove("open");
                t.classList.add("closed");
                t.value = "closed";
            });
        });
    },
    locationDisplay: function() {
        const distinct = new Set(hotels.map(hotel => hotel.location));
        const form = document.getElementsByName("hotelFilters")[0];

        var dd = document.createElement("div");
        dd.classList.add("hide");
        dd.classList.add("filterList");

        distinct.forEach(location => {
            var id = "loc" + location.replaceAll(" ", "");

            var input = document.createElement("input");
            input.type = "checkbox";
            input.name = "locations";
            input.value = location;
            input.id = id;

            var label = document.createElement("label");
            label.setAttribute("for", id);
            label.appendChild(input);

            label.appendChild(document.createTextNode(location));

            dd.appendChild(label);
        });

        form.appendChild(dd);
    }
}