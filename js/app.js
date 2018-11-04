import $ from 'jquery';
import _ from 'lodash';
window.$ = $;

const baseURL = "https://app.ticketmaster.com/discovery/v2/events.json";
const API_KEY = "kYJ5ZzCU2vrEybvUuEA0Av4cIhpHALCK";


function renderEvents (json) {
  $('.events').html('');

  var eventData = _.get(json, '_embedded.events', [])

  if (eventData.length > 0) {

    eventData.forEach(function(data) {
      $(".events").append(
        `
          <article class='results-table'>
            <p class="text"> <a href=${data.url}><img src="${data.images[8].url}"/></a></p>
            <p class="text">${data.name}</p>
            <p class="text">${data.dates.start.localDate}</p>
          </article>
        `);
      })

  } else {
    $(".events").append(
      `<article class='results-table'>
          <p>Make sure to type in a valid city or zip code</p>
      </article>`
  )}
}

function checkData(inputData) {
  var myData = {
    apikey: API_KEY,
    city: '',
    postalCode: ''
  }

  if ($.isNumeric(inputData)) {
    myData.postalCode = inputData
  } else {
    myData.city = inputData

  }
  return myData;
}

var getAPI = function(inputData) {
  $.ajax({
    type: "GET",
    url: baseURL,
    data: checkData(inputData),
    dataType: "json",
    success: function (json) {
        renderEvents(json);
     },
    error: function(xhr, status, err) {
        // This time, we do not end up here!
        console.log(err)
    }
  });
}

function searchValue(e) {
  var userInput = $(".city-input");
  var inputValue = userInput.val();

  e.preventDefault();

  getAPI(inputValue);
  userInput.val("");
  $("body").removeClass("gif");
}

$(document).ready(function(){

    $(".search-button").on('click', function(e){
      searchValue(e);
    })

    $(".search-button").on('keypress', function(e){
      if (e.which === 13) {
        searchValue(e);
      }
    })
});
