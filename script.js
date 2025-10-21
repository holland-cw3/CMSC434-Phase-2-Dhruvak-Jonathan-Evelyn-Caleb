function openTab(tabName, elmnt) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].style.color = "";

  }

  document.getElementById(tabName).style.display = "block";

  elmnt.style.color = "#7b70e3";

}

function openKeyboard(){
  document.getElementById('keyboard').style.display = "block";
}

function closeKeyboard(){
  document.getElementById('keyboard').style.display = "none";
}

document.getElementById("defaultOpen").click();
