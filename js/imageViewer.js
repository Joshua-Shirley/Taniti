// the imageGalley should build the gallery HTML and insert into DOM

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
    divOverlay: "",
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

        // click left / click right
        var clickables = document.querySelectorAll("#images div.overlay div.icon")
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
    }
};