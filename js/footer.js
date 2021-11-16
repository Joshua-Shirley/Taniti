function updateCopyRight() {
    var d = new Date();
    document.querySelector("#copyrightYear").innerHTML = d.getFullYear();
}

updateCopyRight();