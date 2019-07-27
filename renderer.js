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

//TODO: delete a project via double click