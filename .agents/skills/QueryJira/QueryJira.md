# Skill: QueryJira (Natural Language)

## Description
This skill bridges the gap between **Natural Language** and the Jira API. It translates plain English requests into JQL (Jira Query Language) to retrieve and display issues directly in your terminal.

## How it Works
1.  **Input:** The user provides a natural language request (e.g., *"What high-priority bugs are open?"*).
2.  **Mapping:** The request is converted into a JQL string (e.g., `priority = High AND issuetype = Bug AND status != Done`).
3.  **Execution:** The `QueryJira.js` script executes the query using the credentials stored in `APIKey.json`.

## Usage
Run the script using Node.js by passing the translated JQL string and any specific fields you wish to view.

**Command Pattern:**
```bash
node ".\QueryJira.js" "<jql_query>" "[optional_fields]"
```

### Examples

| User Goal (Natural Language) | JQL Input for Script |
| :--- | :--- |
| "Show me my tasks" | `"assignee = currentUser()"` |
| "What's in Project OP?" | `"project = 'OP'"` |
| "What did I finish this week?" | `"resolved >= startOfWeek() AND assignee = currentUser()"` |
| "Find tasks updated today" | `"updated >= startOfDay()"` |

## Technical Details
* **Authentication:** The script automatically pulls your `email`, `domain`, and `cookie` (or `APIKey`) from `APIKey.json`.
* **Output Format:** Results are logged as formatted strings including the **Key**, **Status**, **Summary** (with a clickable URL), and Reporter. Aditionally brings a second JSON object, with task key and URL to open in browser.
* **Field Filtering:** You can customize output by passing a second argument like `"summary,priority,created"`.

## JQL Reference for Translation

### Core Fields
* **summary**: Keywords in the title.
* **status**: Current state (e.g., `Open`, `In Progress`, `Done`).
* **priority**: Importance level (e.g., `High`, `Low`).
* **assignee**: The user responsible for the issue.
* **project**: The project code (e.g., `OP`, `PROJ`).

### Smart Functions
* **currentUser()**: The user currently authenticated in your `APIKey.json`.
* **startOfDay() / startOfWeek()**: Relative time filters for recent activity.

## Troubleshooting
* **Empty Results (`{"issues":[]}`):** Verify the project key exists and that your account has "Browse Projects" permission.
* **Cookie Expiry:** If using a session cookie, ensure it is still valid by checking the `Application > Cookies` tab in your browser's Developer 