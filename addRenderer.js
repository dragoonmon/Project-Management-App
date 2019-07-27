const { ipcRenderer } = require('electron')

const addBtnClick = document.getElementById('addBtn')
addBtnClick.addEventListener('click', function () {
    ipcRenderer.send('add-project-to-list', document.getElementById('projectName').value)
    window.close()
})