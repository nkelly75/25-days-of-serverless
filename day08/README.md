# Day 8

Implementing challenge for Day 8 defined [here](https://25daysofserverless.com/calendar/8)

Live UI here: https://mslsigrstoragefe95d19193.z16.web.core.windows.net/

All code 


## Approach
-   Followed very useful article Microsoft Learn material here: https://docs.microsoft.com/en-ie/learn/modules/automatic-update-of-a-webapp-using-azure-functions-and-signalr/1-introduction to build Stocks example using Cosmos DB change feed and SignalR
-   Modified from Stocks to North Pole 'Services' with incident status and description
-   Functions implemented include:
    -   getServices - returns the North Pole Services from Cosmos DB
    -   negotiate - part of hand-shake with SignalR (Special input binding of type signalRConnectionInfo)
    -   servicesChanged - handles change events from Cosmos

![Sample JSON from Function](/day08/getServices.png)
![Sample UI](/day08/northPoleUI.png)
