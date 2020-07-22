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


function OnTextChange(e) {

  switch ("") {
    case document.getElementById("image-text"):
      CreateErrorButton("You cannot leave the image text empty.")
      break
    case document.getElementById("text-xpos"):
      CreateErrorButton("You cannot leave the x coordinate empty.")
      break
    case document.getElementById("text-ypos"):
      CreateErrorButton("You cannot leave the y coordinate empty.")
      break
    case document.getElementById("text-size"):
      CreateErrorButton("You cannot leave the text size empty.")
      break
  }
  SubmitTextToWrite(document.getElementById("image-text").value)
}


function SubmitTextToWrite(text) {
  let url = `${document.location.origin}/API/write_text`
  let formData = new FormData()
  formData.append('text', text)
  filename = document.getElementById('image').childNodes[0].filename.replace(/-edited.png/g, "")
  formData.append('filename', filename)
  formData.append('xpos', parseInt(document.getElementById('text-xpos').value))
  formData.append('ypos', parseInt(document.getElementById('text-ypos').value))
  formData.append('size', parseInt(document.getElementById('text-size').value))
  fetch(url, {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (response.status !== 200) {
        CreateErrorButton("Error sending text.")
        throw Exception
      }
      response.json()
        .then(json => {
          console.log(json)
          div = document.getElementById('image')
          div.innerHTML = ""
          img = document.createElement("img")
          img.filename = json.filename
          img.src = `/image/${json.filename}?v=${+ new Date()}`
          img.style = "margin:auto; max-height:90vw; max-width 90vm"
          div.appendChild(img)
        })
    })
    .catch(() => { /* Error. Inform the user */ })

}


function SubmitFile(file) {

  let url = `${document.location.origin}/API/upload_file`
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
        img.filename = file.name
        img.src = `/image/${file.name}?v=${+ new Date()}`
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
  ErrorDiv.innerHTML = ""
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
function UploadFile(e) {
  document.getElementById("error").innerHTML = ""
  f = document.getElementById("fileinput").files[0]
  if (f == null) {
    CreateErrorButton("No image selected.")
    return
  }
  SubmitFile(f)


}
document.getElementById("fileinput").addEventListener("change", OnFile)
document.getElementById("filesubmit").addEventListener("click", UploadFile)
document.getElementById("image-text").addEventListener("change", OnTextChange)
document.getElementById("text-xpos").addEventListener("change", OnTextChange)
document.getElementById("text-ypos").addEventListener("change", OnTextChange)
document.getElementById("text-size").addEventListener("change", OnTextChange)
