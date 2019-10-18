'use strict';

function generateSliderElement(item) {
  
  let breed = item.split("/");
     
  return `<li class="breed-name">${breed[breed.length - 2]}</li><li class="slides"><img src="${item}" /></li>`

}

function generateSliderItemsString(pictureList) {

  const items = pictureList.map((item) => generateSliderElement(item)); 
  
   return items.join("");
 }

function getDogImages(quantity) {

  fetch(`https://dog.ceo/api/breeds/image/random/${quantity}`)
    .then(response => response.json())
    .then(responseJson => {
      let dogSliderItems = generateSliderItemsString(responseJson.message);
      displayDogImages(dogSliderItems);
    })
    .catch(error => alert('Oops! Something went wrong. Try again later.'));
}

function getDogImage(breed) {

  fetch(`https://dog.ceo/api/breed/${breed}/images/random`)
    .then(response => response.json())
    .then(responseJson => displayDogImage(responseJson))
    .catch(error => alert('Oops! Something went wrong. Try again later.'));
}



function displayDogImages(pictureListString) {

  $('#js-slides-any-breed').html(pictureListString);
  $('#js-slider-any-breed').show();
}

function displayDogImage(result) {

    if ( result.status == "success" ) {
        $('#js-slides-specific-breed').html(`<li class="slides"><img src="${result.message}" /></li>`);
    }
    else {
        $('#js-slides-specific-breed').html(`<li class="slides"><img src="images/sadpanda.png" /></li>`);
    }
    
    $('#js-slider-specific-breed').show();
}

function watchFormAnyBreed() {

  $('#js-form-any-breed').submit(event => {
    event.preventDefault();
    let quantity = $('.js-number-of-dogs').val();
    getDogImages(quantity);
  });
}


function watchFormSpecificBreed() {
  $('#js-form-specific-breed').submit(event => {
    event.preventDefault();

        let breed = $('#js-breed-list').val().trim().split(/[- ]+/).join("/");
        getDogImage(breed);
  });
}

function watchForm() {

  $('#js-pick-options').on('click', 'input[type=radio]', function (event) {

    let optionSelected = $('#js-pick-options input:checked').attr('value');

    switch (optionSelected) {
      case "anyBreed":
        $('#js-any-breed').show();
        $('#js-specific-breed').hide();
        watchFormAnyBreed();
        break;
      case "specificBreed":
        $('#js-any-breed').hide();
        $('#js-specific-breed').show();
        watchFormSpecificBreed();
        break;
    }
  });
}

$(function () {
  watchForm();
});