// zhetic
var layoutCurrent;
var pageNo = 0;
var pageCurrent = 1;
var title;
var cid;
var fitCurrent;
var url = new URL(window.location.href);
var manga = 0;
var chapter = 0;

// ---------------------------------------------------------
// Functions
// ---------------------------------------------------------

//set page to pageCurrent and changer the counter
function loadPage() {
    if(pageCurrent <= pageNo && pageCurrent > 0){
        for(var i = 1; i <= pageNo; i++){
            document.getElementById(`image${i}`).style.visibility = "hidden";
        }
        if(layoutCurrent == "double"){
            if(pageCurrent%2==0){
                pageCurrent--;
            }
            var pagePair = pageCurrent+1;
            document.getElementById(`image${pagePair}`).style.visibility = "visible";
        }
        document.querySelector("#footer #counter").textContent = `${pageCurrent}/${pageNo}`;
        document.getElementById(`image${pageCurrent}`).style.visibility = "visible";
    }
}

// Goto next page or previous page. Left is next page by default.
var rightPage = function () {
    if(layoutCurrent == "double"){
        if(pageCurrent+2 <= pageNo){
            pageCurrent += 2;
        }
    }
    else{
        if(pageCurrent+1 <= pageNo){
            pageCurrent++;
        }
    }
    loadPage();
}

var leftPage = function () {
    if(layoutCurrent == "double"){
        if(pageCurrent-2 >= 1){
            pageCurrent -= 2;
        }
    }
    else{
        if(pageCurrent-1 >= 1){
            pageCurrent--;
        }
    }
    loadPage();
}

// Inversion between left-to-right and right-to-left
function invertPage() {
    [leftPage, rightPage] = [rightPage, leftPage];
}

function layoutSingle(){
    layoutCurrent = "single";
    fitHeight();
    for (let i = 1; i <= pageNo; i++) {
        document.getElementById(`image${i}`).className = "image_fill";
    }
    document.querySelector("#titlebar img.layout").src = "img/single.png";
}

function layoutDouble(){
    fitHeight();
    layoutCurrent = "double";
    for (let i = 1; i <= pageNo; i++) {
        let side = "right";
        if(i%2==0){
            side = "left";
        }
        document.getElementById(`image${i}`).className = `image_${side}`;
    }
    document.querySelector("#titlebar img.layout").src = "img/double.png";
}

function fitWidth(){
    if(layoutCurrent == "single"){
        fitCurrent = "width";
        var items = document.getElementsByClassName("image_fill");
        for(var i = 0; i < items.length; i++){
            items.item(i).style.width = "100%";
            items.item(i).style.height = "auto";
        }
        document.querySelector("#titlebar img.fit").src =  "img/width.png";
    }
}

function fitHeight(){
    if(layoutCurrent == "single"){
        fitCurrent = "height";
        var items = document.getElementsByClassName("image_fill");
        for(var i = 0; i < items.length; i++){
            items.item(i).style.width = "auto";
            items.item(i).style.height = "100%";
        }
        document.querySelector("#titlebar img.fit").src = "img/height.png";
    }
}

// ---------------------------------------------------------
// Event handlers
// ---------------------------------------------------------

document.addEventListener("keydown", function (e) {
    e = e || window.event;
    switch (e.keyCode) {
        case 39:
        case 76:
            rightPage();
            break;
        case 37:
        case 72:
            leftPage();
            break;
        case 73:
            invertPage();
        default: return;
    }
    e.preventDefault();
});

document.querySelector("#page_left").addEventListener("click", function (e) {
    leftPage();
});

document.querySelector("#page_right").addEventListener("click", function (e) {
    rightPage();
});

document.querySelector("#titlebar button.download").addEventListener("click", function (e) {
    //document.getElementById("downloadButton").style.background-color = "rgb(0, 0, 0, 0.2)";
});

document.querySelector("#titlebar button.layout").addEventListener("click", function (e) {
    if(layoutCurrent == "single"){
        layoutDouble();
    }
    else{
        layoutSingle();
    }
    loadPage();
});

document.querySelector("#titlebar button.fit").addEventListener("click", function (e) {
    if(fitCurrent == "height"){
        fitWidth();
    }
    else{
        fitHeight();

    }
    loadPage();
});

document.querySelector("#titlebar button.invert").addEventListener("click", function (e) {
    invertPage();
});

document.querySelector("#titlebar_container").addEventListener("mouseenter", function () {
    document.querySelector("#titlebar").style.visibility = "visible";
});

document.querySelector("#titlebar_container").addEventListener("mouseleave", function () {
    document.querySelector("#titlebar").style.visibility = "hidden";
});

// ---------------------------------------------------------
// parse metadata
// ---------------------------------------------------------

function load_pages() {
    if(url.searchParams.has("cid")){
        cid = url.searchParams.get("cid");
        if(cid == ""){
            return;
        }
        pageNo = url.searchParams.get("pages");
        title = url.searchParams.get("title");

        // "https://ipfs.io/api/v0/ls/"+res[manga][chapter]["cid"];

        // --------------------------------------------------------
        // Initialize
        // --------------------------------------------------------

        document.querySelector("#titlebar").style.visibility = "hidden";
        document.querySelector("#footer #counter").textContent = `${pageCurrent}/${pageNo}`;
        document.querySelector("#titlebar .text").textContent = `${title}`;

        var pageView = document.querySelector("#page_view");
        for (var i = 1; i <= pageNo; i++) {
            pageView.appendChild(Object.assign(
                document.createElement("img"),
                {draggable: "false", src: `https://ipfs.cynic.moe/ipfs/${cid}/${i}.jpg`, id: `image${i}`, visibility: "hidden"}
            ));
        }

        if(pageNo > 0){
            layoutSingle();
            fitHeight();
            loadPage();
        }
        else{
            document.querySelector("#titlebar #text").textContent = "Nothing to load";
        }
    }
}