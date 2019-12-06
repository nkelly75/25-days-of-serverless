# Day 6

Implementing challenge for Day 6 defined [here](https://25daysofserverless.com/calendar/6)

## Approach
-   Learned durable functions using the recommended dev.to tutorial
-   Learned the Chrono module for interpreting text about times
-   Used webhook.site (from day 3) to learn format of webhooks from Slack 'commands'
-   Wrote small module to parse webhook format (x-www-url-encoded), find the message text and parse out the date using Chrono
-   Wrote a small shared module to POST (using axios back to Slack) - used by both the schedule function and the activity function

## Challenges
-   Spent quite a while learning about Discord apps, bots, etc and discord.js before discovering that discord.js seems to work better in a long-running process (vs serverless). A client app logs in and then processes events from discord. Discord doesn't seem to have equivalent of Slack 'commands'. Somebody else wants that too... See [this request](https://support.discordapp.com/hc/en-us/community/posts/360045382951-Outgoing-Webhooks)
-   There may be a better way to send the immediate response from 'schedule' about whether the reminder has been set or not. I was hoping to use the HTTP output binding to return the correct 200 straight back to Slack but didn't seem to work so switched to the axios-based postSlack module

Durable functions take some getting used to but quite powerful.

## Slack screen grab

See below for sample /schedule commands:
-   "this one should not work" - can't be parsed by Chrono hence the "Unable to schedule"
-   included some regular "human" messages from nkelly75 to show the time
-   messages from the "Nialls-Scheduler" app are produced by this durable function solution
-   note how out of order schedule requests ABC, XYZ, behaved as expected

![Slack Screen](/day06/slackScreen.png)

Here's Azure Monitor view for the scheduleOrchestrator function.

![Slack Screen](/day06/scheduleOrchestratorMonitor.png)
