const getAPIKey = require('./APIKey.json')
function queryJira(newQuery,newFields) {
var request = require('request');
const email = getAPIKey.email
const domain = getAPIKey.domain
const apiToken = getAPIKey.APIKey
const auth = Buffer.from(`${email}:${apiToken}`).toString('base64');
const cookie =getAPIKey.cookie
var fieldQuery = ''
if (newFields)
{
  fieldQuery = '&fields=key,' + newFields
}
else
{
  fieldQuery = '&fields=key'
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
  if (error) {
    console.error('Error making request:', error);
    return;
  }
  try {
    const data = JSON.parse(response.body);
    logJiraFields(data);
  } catch (e) {
    console.error("Failed to parse Jira response:", e);
    console.error("Response body:", response.body);
  }
});

}

function escapeHTML(str) {
    if (typeof str !== 'string') return str;
    return str.replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'})[m]);
}

function logJiraFields(data) {
    if (!data || !data.issues || !Array.isArray(data.issues)) {
        console.error('Jira response does not contain an "issues" array or there was an error.', data);
        return;
    }
    console.log(JSON.stringify(data, null, 2));
    /*for (let i = 0; i < data.issues.length; i++) {
        const issue = data.issues[i];
        const key = escapeHTML(issue.key);
        const status = escapeHTML(issue.fields.status.name);
        const summary = escapeHTML(issue.fields.summary);
        const domain = getAPIKey.domain
        const self =  domain + '/browse/' + key; // URL should not be escaped
        const informer = issue.fields.reporter ? escapeHTML(issue.fields.reporter.displayName) : 'N/A';

        const listItem = `<strong>Key:</strong> ${key}<br><strong>Status:</strong> ${status}<br><strong>Summary:</strong> <a href="${self}" target="_blank">${summary}</a><br><strong>Informer:</strong> ${informer}<hr>`;
        console.log(listItem);
    }*/
    let listJiraItem = [];
    for (let i = 0; i < data.issues.length; i++) {
        const domain = getAPIKey.domain
        const issue = data.issues[i];
        const key = escapeHTML(issue.key);
        listJiraItem.push()
        const self =  domain + '/browse/' + key; // URL should not be escaped
        JiraItem = {
          "key" : key,
          "clientUrl" : self
        }
        listJiraItem.push(JiraItem)
    }
    console.log(JSON.stringify(listJiraItem, null, 2));

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
