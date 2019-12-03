# Day 3

## WebHook testing
Used webhook.site as suggested to learn structure of JSON from github webhooks

## Database
Decided to use basic Table Storage in the storage account associated with my function to track the URLs of PNGs

## Azure Function
Uses an output binding for table storage (see function.json) to add rows to a table called 'gifts' in the storage account. As per challenge we only record rows when the filename (coming from commits.added or commits.modified) ends in .png.

The function comes with some 'jest' tests.

## Results
Here are two commits on my repo:
-   First one had several pngs (as well as two other files): https://github.com/nkelly75/25-days-of-serverless/commit/4a5593838eb1cd5c0bf410f3407db7439f50b75d
-   Second one had two files, one png: https://github.com/nkelly75/25-days-of-serverless/commit/bd0967967b2e2bccacbb868760c35f770c3e6548


