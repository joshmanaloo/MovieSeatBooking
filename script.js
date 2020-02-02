//select elements by using DOM
const container = document.querySelector('.container');
const seats = document.querySelectorAll('.row .seat:not(.occupied)');
const count = document.getElementById('count');
const total = document.getElementById('total');
const movieSelect = document.getElementById('movie');

//calling to populate saved storage
populateUI();

let ticketPrice = +movieSelect.value; //adding a plus sign turns it into an integer
//console.log(ticketPrice);

//Function to update the total and the count of selected seats
function updateSelectedCount(){
  const selectedSeats = document.querySelectorAll('.row .seat.selected'); /*Takes all selected seats*/
  const selectedSeatsCount = selectedSeats.length; /*Takes the number of selected seats*/

  //copy selected seats into array
  //map through array
  //return a new array of indexes
  const seatsIndex=[...selectedSeats].map(seat => [...seats].indexOf(seat));
  //console.log(seatsIndex);

  //save in local storage built into the browser
  localStorage.setItem('selectedSeats', JSON.stringify(seatsIndex));

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;
}

//save selected movie data
function setMovieData(movieIndex, moviePrice){
  localStorage.setItem('selectedMovieIndex', movieIndex);
  localStorage.setItem('selectedMoviePrice', moviePrice);
}

//function to populate the UI with saved data
function populateUI(){
  const selectedSeats = JSON.parse(localStorage.getItem('selectedSeats'));

  if(selectedSeats !== null && selectedSeats.length > 0){
    seats.forEach((seat, index) => { //for loop each seats and if index Of.. change the class
      if(selectedSeats.indexOf(index) > -1){
        seat.classList.add('selected');
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem('selectedMovieIndex');
  if(selectedMovieIndex !== null){
    movieSelect.selectedIndex = selectedMovieIndex; //fetching the selectedIndex from movie that is stored in locale storage
  }
}

//event listener that changes it into selected class
container.addEventListener('click', (e) => {
  if(e.target.classList.contains('seat') && !e.target.classList.contains('occupied')){
    e.target.classList.toggle('selected');
    updateSelectedCount();
  }
});

//event listener that listens when movie is changed
movieSelect.addEventListener('change', (e) =>{
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

updateSelectedCount();
