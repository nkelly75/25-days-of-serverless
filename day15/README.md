# Day 15

Implementing challenge for Day 15 defined [here](https://25daysofserverless.com/calendar/15)

Live UI here: https://ngk25dos15web.z16.web.core.windows.net/ (e.g. type Carousel in the box, then click Describe button below any of the results)

Again, the UI is also "serverless" in that its hosted as a static site on a storage account.

## Approach
-   Started out with the Day 7 solution using unsplash API from node.js functions fronted by React UI
    
-   Tweaked the UI to add a 'Describe' button under each search result. This button takes the URL to the unsplash image and POSTs to a second (new) Function called ImageDescribe
-   The new function uses the Cognitive Services computer vision API to retrieve
    -   caption
    -   categories
    -   tags
-   The UI displays the results under the Describe button

## Sample Results

In general the results from the vision API are impressive! Struggled a bit with Santa but at least got christmas and lights!

![Carousel](/day15/carousel.png)
![Santa](/day15/santa.png)
