import $ from 'jquery';
import _ from 'lodash';

const baseURL = "https://app.ticketmaster.com/discovery/v2/events.json";
const API_KEY = "kYJ5ZzCU2vrEybvUuEA0Av4cIhpHALCK";

var eventData = [];

var getAPI = function(inputData) {

  $.ajax({
    type: "GET",
    url: baseURL,
    data: {
      apikey: API_KEY,
      city: inputData
    },
    dataType: "json",
    success: function (json) {
        eventData = json._embedded.events;
        console.log(eventData);
        $('.events').html('');
        eventData.forEach(function(data) {

          $(".events").append(
            `
              <article class='results-table'>
                <span> <a href=${data.url}><img src="${data.images[8].url}"/></a></span>
                <span>${data.name}</span>
                <span>${data.dates.start.localDate}</span>
              </article>
            `);

        })
     },
    error: function(xhr, status, err) {
        // This time, we do not end up here!
        console.log(err)
    }
  });
}

let events = ['click', 'keypress'];

$(document).ready(function(){

  events.forEach(function(event) {
    $(".search-button").on(event, function(e){
      e.preventDefault();
      if (event === 'click' || (event === 'keypress' && event.which === 13)) {
        var userInput = $(".city-input").val();

        getAPI(userInput);
      }
    })
  })

});
