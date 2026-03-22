const queryJira = require('.agents/skills/QueryJira.js');
//queryJira.queryJira('Status = Open','summary,assignee')    
queryJira.queryJira('assignee = "jalmarazmartn@gmail.com" AND status = Open','*all')
//queryJira.queryJira('assignee = "Jesús Almaraz Martín"','summary,key')

