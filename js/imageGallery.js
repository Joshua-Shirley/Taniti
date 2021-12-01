const imageGallery = {
    // data image list
    array: [],
    targetElementID: "images",

    // create the main image div     
    init: function(imageArray) {
        this.array = [...imageArray];
        this.build();
    },
    build: function() {
        // data array
        var el = document.getElementById(this.targetElementID);
        el.innerHTML = "";
        el.appendChild(this.mainImage());
        el.appendChild(this.thumbNails());
    },
    mainImage: function() {
        var main = document.createElement("div");
        main.classList.add("mainImage");

        // random image
        //var max = hotels[4].images.length;
        //var ran = Math.floor(Math.random() * max);

        main.appendChild(this.img(0));

        return main;
    },
    thumbNails: function() {
        var thumbs = document.createElement("div");
        thumbs.classList.add("thumbnails");

        var container = document.createElement("div");
        container.classList.add("container");

        var thumbDiv = document.createElement("div");
        thumbDiv.classList.add("center");

        for (var i = 0; i < this.array.length; i++) {
            thumbDiv.appendChild(this.img(i));
        }
        //thumbs.appendChild(thumbDiv);
        container.appendChild(thumbDiv);
        thumbs.appendChild(container);

        return thumbs;
    },
    img: function(index) {
        var img = document.createElement("img");
        img.src = this.array[index].url;
        img.alt = this.array[index].alt;
        return img;
    }

}