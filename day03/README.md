# Day 3

## WebHook testing
Used webhook.site as suggested to learn structure of JSON from github webhooks

## Database
Decided to use basic Table Storage in the storage account associated with my function to track the URLs of PNGs

## Azure Function
Uses an output binding for table storage (see function.json) to add rows to a table called 'gifts' in the storage account. As per challenge we only record rows when the filename (coming from commits.added or commits.modified) ends in .png.

The function comes with some 'jest' tests.

## Results
Here are some commits on my repo:
-   First one had several pngs (as well as two other files): [4a55938](https://github.com/nkelly75/25-days-of-serverless/commit/4a5593838eb1cd5c0bf410f3407db7439f50b75d)
-   Second one had two files, one png: [bd09679](https://github.com/nkelly75/25-days-of-serverless/commit/bd0967967b2e2bccacbb868760c35f770c3e6548)
-   This one updated the README and added a screenshot of table storage (as a png..!): [69ea4ac](https://github.com/nkelly75/25-days-of-serverless/commit/69ea4ac39eb840a9cac5d286296d233e837ddee6)

Here's the table storage screenshot:

![table storage gifts table](/day03/gifts_table.png)

Note timestamp of first 3 from same commit whereas selected record from second commit above was several minutes later. 

Also after the 3rd commit above there's a 5th record in the 'gifts' table for gifts_table.png.