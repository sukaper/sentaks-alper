function OnFile(e) {
    var file = e.target.files[0]
    var fileName = file.name.split('.').pop()
    document.getElementById("error.div").innerHTML = ""
    if (!Accepted(fileName)){
        document.getElementById("error.div").innerHTML = ""
        CreateErrorButton("Only png and jpg files are accepted.")
        return
    }
    if (file.size > 3*1024*1024){
        document.getElementById("error.div").innerHTML = ""
        CreateErrorButton("Files bigger than 3MB are not accepted.")
        return

    }
}

/* <div class="alert alert-danger">
  <strong>Danger!</strong> Indicates a dangerous or potentially negative action.
</div> */

function CreateErrorButton(val){
    ErrorDiv = document.getElementById("error.div")
    div = document.createElement("div")
    div.classList = ["alert alert-danger"]
    div.textContent = val
    ErrorDiv.appendChild(div)

}


function Accepted(fname) {
    switch (fname) {
        case "png":
            return true
        case "jpg":
            return true
        default:
            return false
    }
}

document.getElementById("file.input").addEventListener("change", OnFile)