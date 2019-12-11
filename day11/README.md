# Day 11

Implementing challenge for Day 11 defined [here](https://25daysofserverless.com/calendar/11)


## Approach
-   Basic React UI makes POST to Function called CreateWish
-   Function uses output binding to write "wish" to Cosmos DB
-   Second function triggered by CosmosDB POSTs to Slack Webhook with message for elves

Screenshot of UI

![UI](/day11/postWish.png)

Screenshot of Cosmos Item

![Cosmos Item](/day11/cosmosItem.png)

Screenshot of Message received by Elves on Slack

![Cosmos Item](/day11/slackChannel.png)
