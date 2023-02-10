const searchHero = document.getElementById("search-hero");
const searchResults = document.getElementById("search-results");

var fav_buttons = [];
// for fetching the api thorugh xhr request
searchHero.addEventListener("keyup", function(){

    var xhrRequest = new XMLHttpRequest();
    var searchValue = this.value;
    if(searchValue.length <= 2){
        searchResults.innerHTML = "";
        searchResults.style.border = "none";
        return;
    }
    xhrRequest.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(xhrRequest.responseText);
            console.log(response.data.results);
            if(response.response === "error"){
                searchResults.innerHTML = "";
                return;
            }
            const results = response.data.results;
            searchResults.innerHTML = "";

            for(let i of results){
                var li = document.createElement("li");
                li.classList.add("search-item");
                searchResults.style.border = "2px solid cyan";
                searchResults.style.borderRadius = "8px"; 
                li.innerHTML = '<a href="" class="search-Results" id="'+i.id+'">'+i.name+'<img src="'+i.thumbnail.path+'.'+i.thumbnail.extension+'" alt="" class="image-size"></a></><div class ="add" id="'+i.id+'" data-name="'+i.name+'" data-photo="'+i.thumbnail.path+'.'+i.thumbnail.extension+'"><i id="addFav" class="fa fa-heart"></i></div>';
                searchResults.appendChild(li);
            }

            let resultHeros = document.getElementsByClassName("search-Results");
                for(let j of resultHeros){
                    j.addEventListener("click", function(event){
                        event.preventDefault();
                        localStorage.setItem('heroSelected', this.id);
                        location.replace("hero_info.html");
                    });
                }

                // adding superhero to the fav list
            fav_buttons = document.getElementsByClassName("add");
            for(let i of fav_buttons){
                i.addEventListener("click", function(){
                    if(i.innerHTML == '<i id="delFav" class="fa fa-heart"></i>'){
                        i.innerHTML = '<i id="addFav" class="fa fa-heart"></i>'
                        function remove(value){
                            return this.id != value.id;
                        }
                        // saving the data in local storage
                        let oldItems = JSON.parse(localStorage.getItem("favHeroes")) || [];
                        newItems = oldItems.filter(remove.bind(i));
                        localStorage.setItem('favHeroes', JSON.stringify(newItems));
                        return;
                    }
                    i.innerHTML = '<i id="delFav" class="fa fa-heart"></i>';
                    let favItem = {
                        id: this.id,
                        name: this.dataset.name,
                        photoUrl: this.dataset.photo
                    }
                    let oldItems = JSON.parse(localStorage.getItem("favHeroes")) || [];
                    oldItems.push(favItem);
                    localStorage.setItem('favHeroes', JSON.stringify(oldItems));
                });
            }
            
        }
    };
    xhrRequest.open("GET", "https://gateway.marvel.com/v1/public/characters?ts=1&apikey=c4fcf3ccf21d8d08d286047c49b1a56e&hash=da8a13de87467939206f03f345e3c23c&nameStartsWith="+searchValue, true);
    xhrRequest.send();
});