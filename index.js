function addCopyrightInfo(e) {
  var selection, selectedNode, html;
  if (window.getSelection) {
    selection = window.getSelection();
    if (selection.rangeCount) {
      selectedNode = selection.getRangeAt(0).startContainer.parentNode;
      var container = document.createElement("div");
      container.appendChild(selection.getRangeAt(0).cloneContents());
      html = container.innerHTML;
    }
  } else {
    console.debug("The text [selection] not found.");
    return;
  }

  var range = selection.getRangeAt(0);
  if (!html) html = "" + selection;

  // Add your copyright information with a link
  html += '<br/><small>Source: <a href="https://theidioms.com" style="color:red">theidioms.com</a></small>';

  // Create a new div to hold the HTML with the added link
  var newdiv = document.createElement("div");
  newdiv.style.position = "absolute";
  newdiv.style.left = "-99999px";
  newdiv.innerHTML = html;

  // Append the new div to the body
  document.body.appendChild(newdiv);

  // Select the content within the new div
  selection.selectAllChildren(newdiv);

  // Set a timeout to remove the temporary div and restore the original selection
  window.setTimeout(function () {
    document.body.removeChild(newdiv);
    selection.removeAllRanges();
    selection.addRange(range);
  }, 5);
}

// Add the event listener to the copy event
document.addEventListener("copy", addCopyrightInfo);
