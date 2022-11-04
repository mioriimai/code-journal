/* global data */

var $photoUrl = document.getElementById('photo-url');
var $img = document.getElementById('image');

// Listen for 'input' events on the photoUrl input to update the src attribute
// of the photo preview when the input value changes.
$photoUrl.addEventListener('input', function (event) {

  $img.setAttribute('src', $photoUrl.value);

});

// Listen for 'submit' events on the journal entry form
var $form = document.querySelector('form');

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  // Put the form's input values into a new object.
  var entry = {};
  entry.title = $form.elements.title.value;
  entry.photoUrl = $form.elements['photo-url'].value;
  entry.notes = $form.elements.notes.value;

  // Add the nextEntryId to the object.
  entry.nextEntryId = data.nextEntryId;

  // Increment the nextEntryId on the data model.
  data.nextEntryId++;

  // Prepend the new object to the entries in the data model.
  data.entries.unshift(entry);

  // Reset the image preview's `src' attribute.
  $img.setAttribute('src', 'images/placeholder-image-square.jpg');

  // Reset the form inputs.
  $form.reset();

  // Creates a new DOM tree for it and adds it to the page
  var $newDOMtree = renderEntry(entry);
  $ul.prepend($newDOMtree);

  // Automatically shows the 'entries' view without reloading the page.
  viewSwapping('entries');

  // Removes the p element that shows there is no entry
  $paragraph.remove();
});

// Define a function that takes a single journal entry object and
//  returns a DOM tree that matches one of the example entries in the HTML.

function renderEntry(object) {

  var $li = document.createElement('li');
  $li.setAttribute('data-entry-id', object.title);

  var $container = document.createElement('div');
  $container.setAttribute('class', 'container3');
  $li.appendChild($container);

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');
  $container.appendChild($row);

  var $columnHalf1 = document.createElement('div');
  $columnHalf1.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf1);

  var $image = document.createElement('img');
  $image.setAttribute('src', object.photoUrl);
  $columnHalf1.appendChild($image);

  var $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  $row.appendChild($columnHalf2);

  var $h2 = document.createElement('h2');
  $h2.setAttribute('class', 'placing-icon');
  $h2.textContent = object.title;
  $columnHalf2.appendChild($h2);

  var $p = document.createElement('p');
  $p.textContent = object.notes;
  $columnHalf2.appendChild($p);

  var $icon = document.createElement('i');
  $icon.setAttribute('class', 'fa-solid fa-pencil fa-sm edit-icon');
  $h2.appendChild($icon);

  return $li;

}

// Use a loop to create a DOM tree for each journal entry in the data model
// and append it to the page when the 'DOMContentLoaded' event is fired.

var $ul = document.querySelector('.entries-unordered-list');
document.addEventListener('DOMContentLoaded', function () {
  for (var i = 0; i < data.entries.length; i++) {
    var domTree = renderEntry(data.entries[i]);
    $ul.appendChild(domTree);
  }
  // refreshing the pages shows the same view as before refreshing.
  viewSwapping(data.view);
});

// Function that is called when the links(a tages) are pressed
document.addEventListener('click', function (event) {
  if (event.target.tagName !== 'A') {
    return null;
  }
  // Decides which page will be shown with the info by clicking
  viewSwapping(event.target.name);
});

// View swapping function
var $views = document.querySelectorAll('.view');
function viewSwapping(dataView) {
  data.view = dataView;
  if (dataView === 'code-journal') {
    $views[0].className = 'view hidden';
    $views[1].className = 'view';
    $views[2].className = 'view hidden';
  } else if (dataView === 'entries') {
    $views[0].className = 'view';
    $views[1].className = 'view hidden';
    $views[2].className = 'view';
  } else if (dataView === 'new') {
    $views[0].className = 'view hidden';
    $views[1].className = 'view';
    $views[2].className = 'view hidden';
  }
}

// Shows that there is no entry added
if (data.entries.length === 0) {
  var $paragraph = document.createElement('p');
  $paragraph.textContent = 'No entries have been recorded.';
  $paragraph.setAttribute('class', 'no-entries');
  $ul.appendChild($paragraph);
}
