function addSelectedElement(arrayOptions, setRange, step, idEl) {
    var selectedElement = document.getElementById(idEl);
    var content = '';
    if (arrayOptions != undefined && arrayOptions != null && arrayOptions != NaN) {
        for (var i = 0; i < arrayOptions.length; i++) {
            content += '<option val=' + i + '>' + arrayOptions[i] + '</option>';
        }
    }
    if (setRange != undefined && setRange != null && setRange != NaN) {
        for (var i = setRange[0]; i <= setRange[1]; i = i + step) {
            content += '<option val=' + i + '>' + i + '</option>';
        }
    }
    selectedElement.innerHTML = content;
}