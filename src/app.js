const { app, BrowserWindow } = require('electron')
const Shell = require('node-powershell');
const { dialog } = require('electron').remote
const ps = new Shell({ executionPolicy: 'Bypass', noProfile: true });


// var locais.
var folderPath;

function startProject() {

    if(document.getElementById('inputProjectname').value == "" || document.getElementById('inputProjectname').value == undefined) {
        alert("Digite o nome do projeto antes de continuar!");
        return;
    }


    alert("Começou na pasta: " + folderPath);
    ps.addCommand('cd ' + folderPath);
    ps.addCommand('ng new ' + document.getElementById('inputProjectname').value);
    ps.invoke()
        .then(output => {
            console.log(output);
            alert("Projeto criado!")
        })
        .catch(err => {
            console.log(err);
            alert("Erro no processo de criação do projeto!")
        })
}

// Seleciona a pasta onde será criado o projeto!
function openFolder() {
    folderPath = dialog.showOpenDialog({ properties: ['openDirectory'] })[0]
}







/* ps.addCommand('echo node-powershell');
ps.invoke()
.then(output => {
  console.log(output);
})
.catch(err => {
  console.log(err);
}); */
