const request = require('request');

function addJiraComment(issueKey, commentText) {
    const getAPIKey = require('./APIKey.json');
    const { email, domain, APIKey: apiToken } = getAPIKey;
    const auth = Buffer.from(`${email}:${apiToken}`).toString('base64');

    const url = `${domain}/rest/api/3/issue/${issueKey}/comment`;

    // Jira Cloud requires the comment in ADF (Atlassian Document Format)
    const bodyData = {
        "body": {
            "type": "doc",
            "version": 1,
            "content": [
                {
                    "type": "paragraph",
                    "content": [
                        {
                            "text": commentText,
                            "type": "text"
                        }
                    ]
                }
            ]
        }
    };

    const options = {
        method: 'POST',
        url: url,
        headers: {
            'Authorization': 'Basic ' + auth,
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(bodyData)
    };

    request(options, function (error, response, body) {
        if (error) {
            console.error('Error adding comment:', error.message);
            return;
        }

        if (response.statusCode === 201) {
            console.log(`Successfully added comment to ${issueKey}`);
        } else {
            console.error(`Failed to add comment (${response.statusCode}):`, body);
        }
    });
}

// --- Execution ---
const [issueKey, commentText] = process.argv.slice(2);

if (!issueKey || !commentText) {
    console.log('Usage: node addComment.js "OP-123" "This is my comment text"');
} else {
    addJiraComment(issueKey, commentText);
}