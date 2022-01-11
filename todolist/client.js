// Create a "close" button and append it to each list item
var myNodelist = document.getElementsByTagName("LI");
var i;
for (i = 0; i < myNodelist.length; i++) {
  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.appendChild(txt);
  myNodelist[i].appendChild(span);
}

// Click on a close button to hide the current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var div = this.parentElement;
    div.style.display = "none";
  }
}

/* Add a "checked" symbol when clicking on item
   and slide the item to the last-child position
*/
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');
    
    // calculate the height of the li
    var li = ($(ev.target).outerHeight());

    // calculate the position to slide the li
    var bottom = ($('#list').position().top + $('#list').outerHeight(true)) - li;

    // animate li element to the last-child position
    $(ev.target).fadeIn().css({top:0,position:'absolute', width: $(ev.target).outerWidth()}).animate({top:bottom + 20}, 1000, function() {
        $(ev.target).css({'top':'', 'position': '', 'width': ''});
    });

    $("#list").append(ev.target);
    }
}, false);