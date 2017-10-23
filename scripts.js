var ratingArray = ['Swill', 'Plausible', 'Genius'];
var IdeaCard = function(title, idea, id, quality) {
  this.title = title;
  this.idea = idea;
  this.id = id;
  this.counter = 0;
};

$('.idea-card-wrap').on('click', '.upvote-button', function() {
  var clickedCardId = $(this).parent('article').attr('id');
  var theObject = localStorage.getItem(clickedCardId);
  var parsedTheObject = JSON.parse(theObject);
  $(this).siblings('.downvote-button').removeAttr('disabled');
  if (parsedTheObject.counter === 2) {
    $(this).attr('disabled', true);
  } else {
    parsedTheObject.counter++;
    $(this).siblings('h2').find('.rating').text(ratingArray[parsedTheObject.counter]);
    var stringifiedTheObject = JSON.stringify(parsedTheObject);
    localStorage.setItem(clickedCardId, stringifiedTheObject);
  };
});

$('.idea-card-wrap').on('click', '.downvote-button', function() {
  var clickedCardId = $(this).parent('article').attr('id');
  var theObject = localStorage.getItem(clickedCardId);
  var parsedTheObject = JSON.parse(theObject);
  $(this).siblings('.upvote-button').removeAttr('disabled');
  if (parsedTheObject.counter === 0) {
    $(this).attr('disabled', true);
  } else {
    parsedTheObject.counter--;
    $(this).siblings('h2').find('.rating').text(ratingArray[parsedTheObject.counter]);
    var stringifiedTheObject = JSON.stringify(parsedTheObject);
    localStorage.setItem(clickedCardId, stringifiedTheObject);
  };
});

$(document).ready(function() {
  for (let i = 0; i < localStorage.length; i++) {
  var retrievedObject = localStorage.getItem(localStorage.key(i));
  var parsedObject = JSON.parse(retrievedObject);
  $('.idea-card-wrap').prepend(`<article id="${parsedObject.id}" class="idea-card">
    <h1 class="user-idea">${parsedObject.title}</h1>
    <button class="delete-button" aria-label="Delete Button"></button>
    <p class="user-idea-details" contenteditable="true">${parsedObject.idea}</p>
    <button class="upvote-button" aria-label="upvote button"></button>
    <button class="downvote-button" aria-label="downvote button"></button>
    <h2>quality: <span class="rating">${ratingArray[parsedObject.counter]}</span></h2>
    <hr>
    </article>`);
  };
});

$('.save-button').on('click', function(event) {
  event.preventDefault();
  var titleInput = $('#title-input').val();
  var ideaInput = $('#idea-input').val();
  var dateNow = Date.now();
  $('.idea-card-wrap').prepend(`<article id="${dateNow}" class="idea-card">
    <h1 class="user-idea">${titleInput}</h1>
    <button class="delete-button" aria-label="Delete Button"></button>
    <p class="user-idea-details" contenteditable="true">${ideaInput}</p>
    <button class="upvote-button" aria-label="upvote button"></button>
    <button class="downvote-button" aria-label="downvote button"></button>
    <h2>quality: <span class="rating">Swill</span></h2>
    <hr>
    </article>`);
  // ask about this
  $('form')[0].reset();
  // It works, but is it wrong?
  var ideaCard = new IdeaCard(titleInput, ideaInput, dateNow);
  var stringIdeaCard = JSON.stringify(ideaCard);
  localStorage.setItem(dateNow, stringIdeaCard);
});

$('.idea-card-wrap').on('click', '.delete-button', function() {
  $(this).parent('article').remove();
})





