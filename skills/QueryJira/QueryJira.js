
function queryJira(newQuery,newFields = '') {
var request = require('request');
const getAPIKey = require('./APIKey.json')
const email = getAPIKey.email
const domain = getAPIKey.domain
const apiToken = getAPIKey.APIKey
const auth = Buffer.from(`${email}:${apiToken}`).toString('base64');
var fieldQuery = ''
if (newFields !== '')
{
  fieldQuery = '&fields=' + newFields
}
var options = {
  'method': 'GET',
  'url': 'https://jalmarazmartn.atlassian.net/rest/api/3/search/jql?maxResults=10&jql=' + newQuery + fieldQuery,
  'headers': {
    'Authorization': 'Basic ' + auth,
 'Cookie': 'atlassian.xsrf.token=b432176c56d2fb833ac40a4b2fbd39548a07c836_lin'    
  }
};
request(options, function (error, response) {
  if (error) throw new Error(error);
  console.log(response.body);
});

}
const [newQuery,newFields] = process.argv.slice(2);

queryJira(newQuery,newFields);
module.exports = queryJira;
