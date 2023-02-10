const name = document.getElementById("name");
const photo = document.getElementById("photos");
const comics = document.getElementById("comics");
const series = document.getElementById("series");
const events = document.getElementById("events");

// fetching the api
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        let response = JSON.parse(xhttp.responseText);
        if(response.response === "error"){
            console.log("error fetching data");
            return;
        }

        //showing the data on screen
        response = response.data.results[0];
        console.log(response); // this data will show on console

        // For Name and Image of the SuperHero
        name.innerHTML = response.name;
        photo.setAttribute("src", response.thumbnail.path+"."+response.thumbnail.extension);

        // Fetching Comics of the selected SuperHero
        const comicsList = response.comics.items;
        const len = response.comics.items.length;
        comics.innerHTML = '<h2 class="bio-heading">COMICS</h2>';
        for(let i in comicsList){
            var li = document.createElement("li");
            li.innerHTML = '<div class ="Comics-List">'+comicsList[i].name+'</div>';
            // li.style.listStyleType = 'none';
            li.style.fontSize = '17.5px';
            comics.appendChild(li);
        }
        if(len == 0){
            comics.innerHTML = '<h2 class="bio-heading">No COMICS Available</h2>';
        }

        // Fetching Series of the selected SuperHero
        const seriesList = response.series.items;
        const len1 = response.series.items.length;
        series.innerHTML = '<h2 class="bio-heading">SERIES</h2>';
        for(let i in seriesList){
            var li = document.createElement("li");
            li.innerHTML = '<div class ="Series-List">'+seriesList[i].name+'</div>';
            // li.style.listStyleType = 'none';
            li.style.fontSize = '17.5px';
            series.appendChild(li);
        }
        if(len1 == 0){
            series.innerHTML = '<h2 class="bio-heading">No SERIES Available</h2>';
        }

        // Fetching Events of the selected SuperHero
        const eventsList = response.events.items;
        const len2 = response.series.items.length;
        events.innerHTML = '<h2 class="bio-heading">EVENTS</h2>';
        for(let i in eventsList){
            var li = document.createElement("li");
            li.innerHTML = '<div class ="Events-List">'+eventsList[i].name+'</div>';
            // li.style.listStyleType = 'none';
            li.style.fontSize = '17.5px';
            events.appendChild(li);
        }
        if(len1 == 0){
            events.innerHTML = '<h2 class="bio-heading">No EVENTS Available</h2>';
        }
        
    }
};

xhttp.open("GET", "https://gateway.marvel.com/v1/public/characters/"+localStorage.getItem("heroSelected")+"?ts=1&apikey=c4fcf3ccf21d8d08d286047c49b1a56e&hash=da8a13de87467939206f03f345e3c23c", true);
xhttp.send();