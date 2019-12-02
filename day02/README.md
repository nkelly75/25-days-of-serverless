# Day 2

## Logic App
Used a simple Logic App with following approach:
-   Recurrence Trigger that start on 12/13 at 8:00 Stockholm time
-   Sendgrid actions to send emails
-   Delay actions to pause between emails (originally I used 'until' e.g. 08:35 but it was easier to test with relative delays)

Adding emails/delays through point and click in portal Logic App design editor got tedious so learned how to edit the Logic App JSON using VS Code Logic App extension.

## ARM Template
Used a simple ARM template to deploy and parameterize details e.g. Lucy's email address which appears in 'To' for each sendgrid email action. Also didn't want to expose my Sendgrid connection details here in github so they are parameterized.
