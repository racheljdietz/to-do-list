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

// Click on a close button to remove current list item
var close = document.getElementsByClassName("close");
var i;
for (i = 0; i < close.length; i++) {
  close[i].onclick = function() {
    var id = this.parentElement.id;

    fetch("/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        id
      })
    }).catch(err => console.log(err));

    $(this.parentElement).remove();
    
  }
}

/* Add a "checked" symbol when clicking on item
   and slide the item to the last-child position
*/
var list = document.querySelector('ul');
list.addEventListener('click', function(ev) {
  if (ev.target.tagName === 'LI') {
    ev.target.classList.toggle('checked');

    // if li is now checked, animate
    if (ev.target.classList.contains('checked')){

      // calculate the height of the li
      var li = ($(ev.target).outerHeight());

      // calculate the position to slide the li
      var bottom = ($('#list').position().top + $('#list').outerHeight(true)) - li;

      // animate li element to the last-child position
      $(ev.target).fadeIn().css({top:0,position:'absolute', width: $(ev.target).outerWidth()}).animate({top:bottom + 15}, 1000, function() {
          $(ev.target).css({'top':'', 'position': '', 'width': ''});
      });

    }

    $("#list").append(ev.target);

    const name = ev.target.className;
    const id = ev.target.id;

    fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name,
        id
      })
    }).catch(err => console.log(err));

    }
}, false);
