# Day 12

Implementing challenge for Day 12 defined [here](https://25daysofserverless.com/calendar/12)

## Approach
-   Wrote "holiday cards" as Github Gists in markdown. My public gists should be visible here: https://gist.github.com/nkelly75
-   Included emojis in the markdown to make rendering a little more interesting
-   2 x nodeJS functions
    -   Cards: uses Gist API to list all public gists for my account (only care about filename and ID - required later to pull the content). This function renders the list as simple HTML with links to individual Gists by ID e.g. https://ngk25dos12.azurewebsites.net/api/Card/b403f6575ff632db92f98fa518ad8de4. These links call the other function.
    -   Card: take the ID parameter and uses that to look up the specific Gist. This retrieves the markdown. The markdown is then rendered to HTML using the 'showdown' module. Tried a 'showdown-emoji' extension but it was out of date (Github hosts the emoji images somewhere else now). Wrote some code to query the emojis API and keep a map in memory to help render the emojis properly
-   Added caching for the results of the /api/Card function using Redis. The Redis key is the ID for a Gist. Did't do anything fancy with TTL on the cache.
-   Also learned about having connections (e.g. to Gist, Redis) available for re-use when function is called again

## Results

Here's the simple HTML returned for /Cards - links to two individual Holiday Cards.

![Cards](/day12/holiday1.png)

Here's the markdown returned from the Gist API.

```
Hi Buddy,

Hope :santa: brings you a cool :helicopter: and **lots** of other stuff!

:heart_eyes:

Dad
```

Here's the HTML rendered for that markdown.

![Aiden](/day12/holiday2.png)

Here's the HTML rendered for the other card.

![Emma](/day12/holiday3.png)

** Illustrating Caching

Here's some live metrics for the /Card function. Note the first two blue dots > 200ms when the Redis cache was empty and the functions had to retrieve markdown, handle emojis etc. The next four blue dots were when the "cards" were refreshed several times - HTML was already cached and the functions returned in < 50ms each time.

![Metrics](/day12/holiday4.png)

Below shows Redis commands during the test above. The slower response times came after the FLUSHALL which emptied the cache. After those slow calls the cache got repopulated with the two KEYS and the functions became very fast.

![Redis](/day12/holiday5.png)
