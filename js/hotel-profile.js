const profile = {
    index: 0,
    hotel: {},
    init: function() {
        // Get the ID reference
        const queryString = window.location.search;

        if (queryString == null || queryString == undefined) {
            location.href = "taniti-hotels.html";
        }

        const urlParams = new URLSearchParams(queryString);
        const id = parseInt(urlParams.get("id"));

        if (isNaN(id)) {
            location.href = "taniti-hotels.html";
        }

        // ID to Array Index
        this.index = hotels.findIndex(hotel => hotel.id == id);

        // load the hotel object with the hotel object
        this.hotel = Object.assign(hotels[this.index]);

    },
    build: function() {
        this.init();

        this.head();

        this.images();

        this.shortDesc();

        this.stars();

        this.price();

        this.address();
    },
    head: function() {
        var h1 = document.createElement("h1");
        h1.innerText = this.hotel.name;

        var title = document.getElementById("title");
        title.appendChild(h1);
    },
    shortDesc: function() {
        var p = document.createElement("p");
        p.innerText = this.hotel.description;

        var title = document.getElementById("title");
        title.appendChild(p);
    },
    stars: function() {
        var product = document.getElementById("product");
        var rating = ratings.build(this.hotel.stars, 5);

        product.appendChild(rating);
    },
    price: function() {
        var div = document.createElement("div");
        div.classList.add("price")
        var span = document.createElement("span");
        span.classList.add("nightlyPrice");

        var formatter = new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" });
        span.innerHTML = formatter.format(this.hotel.price);
        div.appendChild(span);

        var product = document.getElementById("product");
        product.appendChild(div);
    },
    images: function() {
        imageGallery.init(this.hotel.images);
    },
    address: function() {
        var div = document.querySelector("#hotelMap .address");

        var span1 = document.createElement("span");
        span1.classList.add("street");
        span1.innerText = "12 Sapnis Street";

        var span2 = document.createElement("span");
        span2.classList.add("city");
        span2.innerText = "Chompu Beach";

        var span3 = document.createElement("span");
        span3.classList.add("zip");
        span3.classList.add("country");
        span3.innerText = "00134, Taniti";

        div.appendChild(span1);
        div.appendChild(span2);
        div.appendChild(span3);
    },
    ammenities: function() {
        var div = document.querySelector("#ammenities");

        var ammenities = [
            { icon: "pool", text: "Pool" },
            { icon: "hot-tub", text: "Hot Tub" },
            { icon: "cocktail", text: "Hotel Bar" },
            { icon: "cocktail", text: "Nightclimb" },
            { icon: "food", text: "Restaruant" },
            { icon: "coffee", text: "Morning Roast" },
            { icon: "WiFi", text: "WiFi Fast Internet" }
        ]

    }


}