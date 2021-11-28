function updateCopyRight() {
    var d = new Date();
    document.querySelector("#copyrightYear").innerHTML = d.getFullYear();
}

document.addEventListener('readystatechange', event => {
    if (event.target.readyState == "interactive") {
        updateCopyRight();
    }
});