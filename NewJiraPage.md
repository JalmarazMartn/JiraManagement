**JiraTesting html Project**

***Create a new html page to access Jira***

Call it FetchJira.html

When open fetch this url request to get a json response:

https://jalmarazmartn.atlassian.net/rest/api/3/search/jql?maxResults=10&jql=assignee%20=%20%22jalmarazmartn@gmail.com%22%20AND%20status%20=%20Open&fields=*all

Then from the json (example: \task.json) get fields: Key,status,summary,informer,self

And then create an Html list with Key,status,summary,informer and when summary is cliked go to link self


