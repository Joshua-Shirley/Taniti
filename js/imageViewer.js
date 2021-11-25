// the imageGallery should build the gallery HTML and insert into DOM

// the imageViewer will respond to the users interactions
//      imageViewer should work without the imageGalley

const imageViewer = {
    elementIds: {
        parentId: "images",
        mainImage: "mainImage",
        overlay: "overlay",
        thumbs: "thumbnails"
    },
    list: [],
    divGallery: "",
    divMain: "",
    divThumbs: "",
    imageMain: "",

    init: function() {

        // set up the target element
        this.divGallery = document.getElementById(this.elementIds.parentId);
        this.divMain = this.divGallery.querySelector("." + this.elementIds.mainImage);
        this.divThumbs = this.divGallery.querySelector("." + this.elementIds.thumbs);

        // set the mainImage property
        this.imageMain = this.divMain.querySelector("img");

        // get the images from the gallery and save to LIST
        this.divThumbs.querySelectorAll("img").forEach(image => {
            if (image.tagName == "IMG") {
                this.list.push(image);
            }
        });

        // thumbnails
        this.list.forEach(img => {
            img.addEventListener("click",
                function(e) {
                    imageViewer.selectThumb(img.cloneNode(true));
                })
        });

        // Add an overlay
        document.querySelector('#' + this.elementIds.parentId).prepend(imageViewer.createOverlay());

        // click left / click right
        var clickables = document.querySelectorAll('#' + this.elementIds.parentId + " .overlay .icon");
        clickables.forEach(div => {
            div.addEventListener("click", function(e) {
                var e = div.getAttribute("data-button-type");
                if (e == "scrollForward") {
                    // Scroll Forward
                    imageViewer.scrollForward();
                } else if (e == "scrollBack") {
                    // Scroll Back
                    imageViewer.scrollBack();
                } else if (e == "enlarge") {
                    // enlarge main image
                    imageViewer.enlarge();
                }
            });
        });

    },
    changeMain: function() {
        this.divMain.innerHTML = "";
        this.divMain.appendChild(this.imageMain);
    },
    selectThumb: function(img) {
        this.imageMain = img;
        this.changeMain();
    },
    scrollForward: function() {
        var i = this.list.findIndex(img => img.src == this.imageMain.src) + 1;
        var m = i % this.list.length;
        this.imageMain = this.list[m].cloneNode(true);
        this.changeMain();
    },
    scrollBack: function() {
        var i = this.list.findIndex(img => img.src == this.imageMain.src) - 1;
        if (i == 0) {
            var m = this.list.length - 1;
        } else {
            var m = i;
        }
        this.imageMain = this.list[m].cloneNode(true);
        this.changeMain();
    },
    enlarge: function() {
        console.log("enlarge");
        // enlarge main image
        var lg = document.querySelector(".enlarged");
        lg.appendChild(this.imageMain.cloneNode(true));
    },
    createOverlay: function() {
        var div = document.createElement("div");
        div.classList.add("overlay");

        // create the right icon
        //<div class="icon" data-button-type="scrollBack"></div>
        var divR = document.createElement("div");
        divR.classList.add("icon");
        divR.setAttribute("data-button-type", "scrollBack");
        divR.appendChild(icon.svg("chevron-right"));

        div.appendChild(divR);

        // setup the middle space
        //<div class="icon" date-button-type="enlarge"></div>
        var divE = document.createElement("div");
        divE.classList.add("icon");
        divE.classList.add("enlarge");
        divE.setAttribute("data-button-type", "enlarge");
        divE.appendChild(icon.svg("search-plus"));

        div.appendChild(divE);


        // create the left icon
        //<div class="icon" data-button-type="scrollForward"></div>
        var divL = document.createElement("div");
        divL.classList.add("icon");
        divL.setAttribute("data-button-type", "scrollForward");
        divL.appendChild(icon.svg("chevron-left"));

        div.appendChild(divL);

        return div;
    },
    createEnlargedDiv: function() {
        var div = document.createElement("div");
        div.classList.add("enlarged");


    }

};