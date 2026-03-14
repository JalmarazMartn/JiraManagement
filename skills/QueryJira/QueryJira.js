
function queryJira(newQuery,newFields = '') {
var request = require('request');
const getAPIKey = require('./APIKey.json')
const email = getAPIKey.email
const domain = getAPIKey.domain
const apiToken = getAPIKey.APIKey
const auth = Buffer.from(`${email}:${apiToken}`).toString('base64');
const cookie =getAPIKey.cookie
var fieldQuery = ''
if (newFields !== '')
{
  fieldQuery = '&fields=' + newFields
}
const url = domain + '/rest/api/3/search/jql?maxResults=10&jql=' + newQuery + fieldQuery;
var options = {
  'method': 'GET',
  'url':  url,
  'headers': {    
//    'Authorization': 'Basic ' + auth,    
  'Cookie': cookie
  //"cookie" : "tenant.session.token=eyJraWQiO Muestra
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

}
const [newQuery,newFields] = process.argv.slice(2);
if (newQuery)
{
  queryJira(newQuery,newFields);
}  
module.exports = {
    queryJira:  function (newQuery,newFields) {
      queryJira(newQuery,newFields);
    }
  }

