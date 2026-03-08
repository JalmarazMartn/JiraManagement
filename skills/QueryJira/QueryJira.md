# QueryJira Skill

This skill executes a JQL (Jira Query Language) search against the configured Jira instance and returns the results in a console log in terminal.

## Usage

The skill accepts a `jiraQuery` parameter (JQL string) and an optional `fields` parameter (comma-separated string).

**Example (Default Fields):**
```javascript
node "C:\Users\Jesus\Documents\Proyecto js\JiraManagement\skills\QueryJira\QueryJira.js" "assignee = currentUser()" "summary"
```

## JQL Reference

Use the following references to construct your queries. 

### Common Fields
Ref: JQL Fields

- **summary**: Search for terms in the issue summary.
- **status**: The status of the issue (e.g., `Open`, `In Progress`, `Done`).
- **priority**: The importance of the issue (e.g., `High`, `Low`).
- **assignee**: The user assigned to the issue.
- **project**: The project the issue belongs to.
- **created**: Date the issue was created (e.g., `created > -7d`).
- **issuetype**: The type of issue (e.g., `Bug`, `Story`).

### Common Functions
Ref: JQL Functions

- **currentUser()**: Represents the currently logged-in user.
- **membersOf(group)**: Users who are members of a specific group.
- **startOfDay() / endOfDay()**: The beginning or end of the current day.
- **startOfWeek() / endOfWeek()**: The beginning or end of the current week.
- **updated()**: Issues updated recently.