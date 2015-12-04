var cp = require('child_process')
var os = require('os')
var cpus = os.cpus()

for(var i = 0; i < cpus.length; i++){
  cp.fork('./worker.js')
}