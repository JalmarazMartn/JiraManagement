const queryJira = require('./QueryJira');
//queryJira.queryJira('Status = Open','summary,assignee')    
queryJira.queryJira('assignee = "jalmarazmartn@gmail.com" AND status = Open','summary,key,status')
//queryJira.queryJira('assignee = "Jesús Almaraz Martín"','summary,key')

