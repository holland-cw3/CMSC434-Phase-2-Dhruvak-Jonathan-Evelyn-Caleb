function openTab(tabName, elmnt) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.backgroundColor = "";
  }

  document.getElementById(tabName).style.display = "block";

  elmnt.style.backgroundColor = "#48a7c2ff";
}

document.getElementById("defaultOpen").click();

function toggleDisplay() {
  const element = document.getElementById('notif');
  if (element.style.display === 'none') {
    element.style.display = 'block';
  } else {
    element.style.display = 'none';
  }
}

function recommendBook() {
  const format = document.querySelector('input[name="bookFormat"]:checked');
  const genre = document.getElementById("bookGenre").value;
  const recommendation = document.getElementById("bookRecommendation");

  if (!format) {
    recommendation.textContent = "Please select a book format.";
    return;
  }

  let book = "";

  if (genre === "fiction") {
    book = format.value === "Paperback" ?
      "The Great Gatsby by F. Scott Fitzgerald (paperback edition)" :
      "Little Women by Louisa May Alcott (hardcover edition)";
  } else if (genre === "nonfiction") {
    book = format.value === "Paperback" ?
      "On Liberty by John Stuart Mill (paperback edition)" :
      "Teacher By Teacher by John B. King (hardcover edition)";
  }

  recommendation.textContent = book;
}

var myNodelist = document.getElementsByTagName("LI");
var j;
for (j = 0; j < myNodelist.length; j++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[j].appendChild(span);
}

var close = document.getElementsByClassName("close");
var j;
for (j = 0; j < close.length; j++) {
  close[j].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
  }
}, false);

function newElement() {
  var li = document.createElement("li");
  var inputValue = document.getElementById("todoInput").value;
  var t = document.createTextNode(inputValue);
  li.appendChild(t);
  if (inputValue === '') {
    alert("You must write something!");
  } else {
    document.getElementById("todoList").appendChild(li);
  }
  document.getElementById("todoInput").value = "";

  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  li.appendChild(span);

  for (j = 0; j < close.length; j++) {
    close[j].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }
  }
}