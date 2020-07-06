function OnFile(e) {
  var file = e.target.files[0]
  var fileName = file.name.split('.').pop()
  document.getElementById("error").innerHTML = ""
  if (!Accepted(fileName)) {
    document.getElementById("error").innerHTML = ""
    CreateErrorButton("Only png and jpg files are accepted.")
    return
  }
  if (file.size > 3 * 1024 * 1024) {
    document.getElementById("error").innerHTML = ""
    CreateErrorButton("Files bigger than 3MB are not accepted.")
    return
  }
  
}



function SubmitFile(file) {

  let url = `${document.location.origin}/API/UploadFile`
  let formData = new FormData()

  formData.append('file', file)

  fetch(url, {
    method: 'POST',
    body: formData
  })
    .then((response) => {
      if (response.status !== 200) {
        CreateErrorButton("Error uploading image.")
      }
      else {
        div = document.getElementById('image')
        div.innerHTML = ""
        img = document.createElement("img")
        img.src = `/image/${file.name}`
        img.style = "margin:auto; max-height:90vw; max-width 90vm"
        div.appendChild(img)
      }
    })
    .catch(() => { /* Error. Inform the user */ })

  

}

function CreateErrorButton(val) {
  ErrorDiv = document.getElementById("error")
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
function UploadFile(e){
  f = document.getElementById("fileinput").files[0]
  if (f == null){
    CreateErrorButton("No image selected.")
    return
  }
  SubmitFile(f)


}
document.getElementById("fileinput").addEventListener("change", OnFile)
document.getElementById("filesubmit").addEventListener("click", UploadFile)
