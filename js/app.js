import $ from 'jquery';
import _ from 'lodash';

$(document).ready(function(){

  var API_KEY = "kYJ5ZzCU2vrEybvUuEA0Av4cIhpHALCK";
  var baseURL = "https://app.ticketmaster.com/discovery/v2/events.json";

  var request = $.ajax({
    type: "GET",
    url: baseURL,
    data: {
      size: 100,
      apikey: API_KEY,
      postalCode: 90210
    },
    dataType: "json",
    success: function(json) {
                console.log(json);
                debugger;
                // Parse the response.
                // Do other things.
             },
    error: function(xhr, status, err) {
                // This time, we do not end up here!
             }
      });

  // Array to store all feed sources
  var SOURCES = [
      // Add the other two sources
  ];

  // Prefix url for proxy
  var PROXY_URL = "https://accesscontrolalloworiginall.herokuapp.com/";

  // Utils object to store any misc. methods
  var Utils = {

  };

  // App object to store all app relates metods
  var App = {
    init: function() {
      // Methods that need to be called on initialization
      App.bindEvents();
    },
    bindEvents: function() {
      // Attach event listeners
    },
    setView: function(viewType) {
      var $popup = $('#popUp');
      var $closePopUp = $('.closePopUp');

      if (viewType === 'loader') {
        $popup.removeClass('hidden');
        $closePopUp.addClass('hidden');
        $popup.addClass('loader');
      }
      else if (viewType === 'detail') {
        $popup.removeClass('hidden');
        $closePopUp.removeClass('hidden');
        $popup.removeClass('loader');
      }
      else if (viewType === 'feed') {
        $popup.addClass('hidden');
        $closePopUp.addClass('hidden');
      }
    }
  };

  App.init();
});
