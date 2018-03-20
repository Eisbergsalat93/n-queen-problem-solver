//console.log("testing....")
const{app, BrowserWindow, Menu} = require('electron')

//mainprocess
const path = require('path')
const url = require('url')
require('electron-reload')(__dirname)
let win 

function createWindow() {
    win = new BrowserWindow()
    win.loadURL(url.format({
        pathname:path.join(__dirname,'main.html'),
        protocol: 'file',
        slashes: true
    }))
    win.on('closed', () => {
        win = null
    })

   //win.openDevTools()
}

app.on('ready', createWindow)
app.on('windows-all-closed', ()=>{
    if(process.platfrom !== 'darwin'){
        app.quit
    }
})

app.on('active', ()=> {
    if (win==null){
        createWindow()
    }
})
