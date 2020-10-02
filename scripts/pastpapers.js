//Gathers past paper data
//Enable multiple file download for site and, Run from https://exams.doc.ic.ac.uk/
//Place downloaded files in public ./public/jsons/

var saveData = (function () {
  let a = document.createElement("a")
  document.body.appendChild(a)
  a.style = "display: none"
  return function (data, fileName) {
    let json = JSON.stringify(data),
      blob = new Blob([json], {
        type: "octet/stream",
      }),
      url = window.URL.createObjectURL(blob)
    a.href = url
    a.download = fileName
    a.click()
    window.URL.revokeObjectURL(url)
  }
})()

function loadFileToElement(title, filename) {
  let xhr = new XMLHttpRequest()
  try {
    xhr.open("GET", filename, false)
    xhr.onload = function () {
      let component = document.createElement("div")
      component.innerHTML = xhr.responseText
      scrapeFolder(title, filename, component)
    }
    xhr.send(null)
  } catch (e) {
    window.alert("Unable to load the requested file.")
  }
}

function scrapeFolder(title, id, component) {
  let elements = component.children
  let files = []
  let tag
  for (let i = 0; i < elements.length; i++) {
    let element = elements[i]
    if (element.tagName === "H3") {
      tag = element.textContent
      console.log(tag)
    }
    if (element.tagName === "P" && tag) {
      let resource = element.querySelector("a")
      if (resource) {
        let prev = files.find(({ title }) => title === resource.textContent)
        if (prev) {
          prev.tags.push(tag)
        } else {
          files.push({
            title: resource.textContent,
            type: "pdf",
            tags: [tag],
            folder: title,
            id: `${title}-${i}`,
            path: `https://exams.doc.ic.ac.uk/${id}/${resource.getAttribute(
              "href"
            )}`,
          })
        }
      }
    }
    if (element.tagName === "H1" && element.textContent === "Complete") {
      break
    }
  }
  saveData(files, `${title}.json`)
}

let paragraphs = document.querySelectorAll("p")
let examTitle
for (let i = 0; i < paragraphs.length; i++) {
  let inner = paragraphs[i].textContent
  if (inner.includes("Past examination papers:")) {
    examTitle = paragraphs[i]
    break
  }
}

let folderElements = examTitle.nextElementSibling.querySelectorAll("li a")
let folders = []
for (let i = 0; i < folderElements.length; i++) {
  let folderTitle = folderElements[i].textContent
  let folderLink = folderElements[i].getAttribute("href")
  folders.push({
    title: folderTitle,
    id: folderLink,
  })
  loadFileToElement(folderTitle, folderLink)
}

saveData(folders, "folders.json")
