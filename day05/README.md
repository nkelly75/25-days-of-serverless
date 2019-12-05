# Day 5

## Approach
-   Use Cognitive Text Analytics APIs
-   Use Azure Function with input trigger from blob storage and output binding to blob storage
-   input from santa-letters container
-   output to santa-verdict container (same filename as input)
-   The [sample](https://christmaswishes.azurewebsites.net/api/Wishes) from the [challenge](https://25daysofserverless.com/calendar/5) had multiple "messages" from the same kid identified by "who". Decided to pre-process this (in my code) so each kid's messages were concatenated and the sentiment was determined for ALL of their messages
-   Out of interest I kept intermediate info e.g. full language detected, individual messages etc.

## Results
-   Language detection worked well.
-   None of the sample kids seemed very nice! Some neutral, some naughty.
-   Added one extra child with nicer messages!
-   My sample input is in [letters.json](/day05/letters.json)
-   Snapshot of my results in [verdict.json](/day05/verdict.json)

Here's a screenshot from app insights showing successful processing of an input file

![Logs](/day05/appInsightsLogs.png)

Here's a screenshot from storage explorer showing file under santa-verdict container

![Output Container](/day05/outputBlob.png)

