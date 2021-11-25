const imageGallery = {
    // data image list
    array = [],
    targetElementID = "images",

    // create the main image div


    // 
    init: function() {

    },


    build: function() {
        // data array
        var el = document.getElementById(this.targetElementID);
        el.innerHTML = "";

        var main = document.createElement("div");


        var thumbs = document.createElement("div");


        el.appendChild(main);
        el.appendChild(thumbs);

    }

}


imageGallery.init();