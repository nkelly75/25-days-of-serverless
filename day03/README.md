# Day 3

## WebHook testing
Used webhook.site as suggested to learn structure of JSON from github webhooks

## Database
Decided to use basic Table Storage in the storage account associated with my function to track the URLs of PNGs

## Azure Function
Uses an output binding for table storage (see function.json) to add rows to a table called 'gifts' in the storage account. As per challenge we only record rows when the filename (coming from commits.added or commits.modified) ends in .png.

The function comes with some 'jest' tests.
