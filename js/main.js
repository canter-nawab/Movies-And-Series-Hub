$(document).ready(function() {
    var text;
        $(".default_option").click(function(){
            $(".dropdown ul").toggleClass("active");
        });
        $(".dropdown ul li").click(function(){
             text=$(this).text();
            $(".default_option").text(text);
            $(".dropdown ul").removeClass("active");
            
        });
  

    $('#movieform').on('submit',(e) => {
        let searchMovie=$('#input').val();
            getMovies(searchMovie,text);
        
        e.preventDefault();
    }); 

    // $("#search_field button").on('submit',(e) => {
    //     let searchText=$(".input").val();
    //     getMovies(searchText);
    //     e.preventDefault();
    // }); 

});
function getMovies(searchMovie,text){
    // axios.get('http://www.omdbapi.com/?&apikey='+c629e2a8+'&')
    // axios.get('http://www.omdbapi.com/?apikey='+c629e2a8+'&s='+searchText)
    axios.get('http://www.omdbapi.com/?s='+searchMovie+'&apikey=c629e2a8&')
    .then((response) => {
        console.log(response);
        let movies=response.data.Search;
        let output='';

        $.each(movies,(index,item) => {
            if(text==='Movie'){
                item.Type="movie";
            }
            else if(text==='Series'){
                item.Type="series";
            }
            output+=`
                <div class="col-md-3">
                    <div class="well text-center">
                        <img src="${item.Poster}">
                        <h5>${item.Title}</h5>
                        <a onclick="movieSelected('$(item.imdbID)')" class="btn btn-primary" href="#">Details</a>
                    </div>
                </div>
            `;
        });
        $('#hub').html(output);
    })
    .catch((error) => {
        console.log(error);
    });
}


function selector(text){
    // axios.get('http://www.omdbapi.com/?&apikey='+c629e2a8+'&')
    // axios.get('http://www.omdbapi.com/?apikey='+c629e2a8+'&s='+text)
    // axios.get('http://www.omdbapi.com/?type='+text+'&apikey=c629e2a8')

    // .then((response) => {
    //     console.log(response);
    //     let movies=response.data.Search;
    //     let output='';
    //     $.each(movies,(index,item) => {
    //         output+=`
    //             <div class="col-md-3">
    //                 <div class="well text-center">
    //                     <img src="${item.Poster}">
    //                     <h3>${item.Title}</h3>
    //                     <a onclick="movieSelected('$(item.imdbID)')" class="btn btn-primary" href="#">Details</a>
    //                 </div>
    //             </div>
    //         `;
    //     });
    //     $('#hub').html(output);
    // })
    // .catch((error) => {
    //     console.log(error);
    // });

}

function movieSelected(id){
    sessionStorage.setItem('movieId',id);
    window.location='movie.html';
    return false;
}


var year = 1950;
var till = 2020;
var options = "";
for(var y=year; y<=till; y++){
options += "<option>"+ y +"</option>";
}
document.getElementById("year").innerHTML = options;

function getMovie(){
    let itemId=sessionStorage.getItem('movieId');
    axios.get('http://www.omdbapi.com/?i='+itemId+'&apikey=c629e2a8&')
    .then((response) => {
        console.log(response);
        let item=response.data;
        let output=`
        <div class="row">
            <div class="col-md-4">
                <img src="${item.Poster}" class="thumbnail">
            </div>
            <div class="col-md-8">
            <h2>${item.Title}</h2>
            <ul class="list-group">
              <li class="list-group-item"><strong>Genre:</strong> ${item.Genre}</li>
              <li class="list-group-item"><strong>Released:</strong> ${item.Released}</li>
              <li class="list-group-item"><strong>IMDB Rating:</strong> ${item.imdbRating}</li>
              <li class="list-group-item"><strong>Actors:</strong> ${item.Actors}</li>
              <li class="list-group-item"><strong>Director:</strong> ${item.Director}</li>
            </ul>
            </div>

        </div>
        <div class="row">
        <div class="well">
          <h3>Plot</h3>
          ${item.Plot}
          <hr>
          <a href="http://imdb.com/title/${item.imdbID}" target="_blank" class="btn btn-success">View IMDB</a>
          <a href="index.html" class="btn btn-default">Go Back To Search</a>
        </div>
      </div>
        `;
        $('#movie').html(output);
    })
    .catch((error) => {
        console.log(error);
    });
}