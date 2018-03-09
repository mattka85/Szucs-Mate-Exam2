let moviesArr = new Array();
let allTime = 0;
let kateg4 = '';


function done(data) {
    let moviesData = JSON.parse(data.responseText);
    objToArr(moviesData);

    createCat(moviesArr);
    console.log(moviesArr);
    getAllMov(moviesArr);
    getActors(moviesArr);
    console.log(allTime);
    console.log(moviesArr[0].timeInMinutes)
    document.getElementById("search").addEventListener("click", function () {
        let input = document.getElementById("keyword").nodeValue;
        for (var i = 0; i < moviesArr.length; i++) {
            if (input == moviesArr[i].title) {
                console.log(moviesArr[i].title);
            } else if (input == moviesArr[i].cast.name) {
                console.log(moviesArr[i].title);
            } else if (input == moviesArr[i].directors) {
                console.log(moviesArr[i].title);
            }
        }
    }
)
}


function xhr(method, url, done) {
    let xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function () { //anonym függvény
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
            done(xmlHttp);
        }
    }
    xmlHttp.open(method, url);
    xmlHttp.send();
}

xhr("GET", "/json/movies.json", done);

function objToArr(data) {
    for (let i in data.movies) {
        moviesArr.push(data.movies[i]);
    }
}

function sortByName(data) {
    moviesArr = data.sort(function (a, b) {
        if (a.title < b.title) return -1;
        if (a.title > b.title) return 1;
        return 0;
    });
}

function removeShites(s) {
    var chars = {
        ',': '',
        '.': '',
        'á': 'a',
        '?': '',
        ' ': '-',
        'é': 'e',
        'í': 'i',
        'ó': 'o',
        'ö': 'o',
        'ú': 'u',
        'ü': 'u',
        'ű': 'u',
        'ő': 'o',
        '?': '',
        ':': '',
        ';': '',
        ',': '',
        '.': '',
        '+': '',
        '*': '',
        ' ': '-',
        '&': '',
        '-': '',
        "'": ''
    };
    s = s.toLowerCase().replace(/[,.á? éíóöúúüűő\?:;,\.\+\*/ +/&-']/g, m => chars[m]);
    s = s.replace(/---/g, '-');
    s = s.replace(/--/g, '-')
    return s;
}



function createCat(data) {
    for (let i = 0; i < data.length; i++) {
        let present = document.getElementById('colstok');
        present.innerHTML += `<div class="">
        <img src="/img/covers/${removeShites(data[i].title)}.jpg" alt=""><p>Cím: ${data[i].title}</p>
        <p>Hossz: ${data[i].timeInMinutes} perc</p>
        <p>Premier: ${data[i].premierYear}</p>
        <p>Kategóriák: ${data[i].categories}</p>
        <p>Rendező: ${data[i].directors}</p>
        <p>Szereplő: ${data[i].cast.name}</p>
        <p></p>
        </div>`;
    }
}


function getActors(data) {
    for (let i = 0; i < data.length; i++) {
        document.getElementById("colstock").innerHTML = `<p>${data[i].cast.name} (${data[i].cast.characterName})</p>
            <p>${data[i].cast.birthYear}, ${data[i].cast.birthCoutry} ${data[i].cast.birthCity}</p> `;
    }
}

function getAllMov(data) {
    for (let i = 0; i < data.length; i++) {
        allTime += data[i].timeInMinute;
    }
}


