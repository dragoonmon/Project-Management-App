const { ipcRenderer } = require('electron')

//add "add project" screen
const btnClick = document.getElementById('addProjectBtn')
btnClick.addEventListener('click', function () {
    ipcRenderer.send('add-project-window')
})

// recieves project from the main process and is now available in the main window
ipcRenderer.on('add-project-to-list', (event, message) => {
    // add list elements to the main window
    const node = document.createElement("li")
    const text = document.createTextNode(message)
    node.appendChild(text)
    document.getElementById('projectList').appendChild(node)
})

// delete a project via double click
const ul = document.querySelector('ul')
ul.addEventListener('dblclick', function (event) {
    event.target.remove()
})

// delete all projects in list
ipcRenderer.on('clear-all', function () {
    ul.innerHTML = ''
})