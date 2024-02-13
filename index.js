function addCopyrightInfo() {
  var selection, selectedNode, html;
  if (window.getSelection) {
    var selection = window.getSelection();
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
  html +=
    ' Source: <a href="theidioms.com" style="color:red">theidioms.com</a>';
  var newdiv = document.createElement("div");
  newdiv.style.position = "absolute";
  newdiv.style.left = "-99999px";
  selectedNode.appendChild(newdiv);
  newdiv.innerHTML = html;
  selection.selectAllChildren(newdiv);
  window.setTimeout(function () {
    selectedNode.removeChild(newdiv);
    selection.removeAllRanges();
    selection.addRange(range);
  }, 5);
}
document.addEventListener("copy", addCopyrightInfo);
