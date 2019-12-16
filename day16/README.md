# Day 16

Implementing challenge for Day 16 defined [here](https://25daysofserverless.com/calendar/16)

This time the function is very simple but learning about CI/CD using Azure DevOps.

## Approach
-   Started with simple HTTP Triggered function that reads 'posadas' from a JS file and returns a JSON array to the caller. Wrote a test to ensure that the structure of the posadas array was correct e.g. the day property of each element should be a number (not a string)
-   Created an Azure DevOps project and Azure Pipeline (this added azure-pipelines.yml to my repo). Needed some small tweaks to the pipeline (because this repo has all my daily challenges and I only want to build the app under 'day16' directory)
-   Got the pipeline to successfully deploy the function app (available at https://ngk25dos16.azurewebsites.net/api/Posadas). Includes running the tests, creating an archive artifact etc.
    
## CI/CD in action

-   Committed a [change](https://github.com/nkelly75/25-days-of-serverless/commit/6e07476648e1db91dfef8c9f61cf1e7e3136e081) to posadas.js which deliberately fails the 'jest' unit tests
-   Pipeline failed on unit tests (see how Prepare Binaries failed - in line 39 of the output we can see why the test failed - day is not of type 'number')

![Pipeline Failure](/day16/pipelineFailure.png)

-   Then added a [commit](https://github.com/nkelly75/25-days-of-serverless/commit/91260f8471270c0b6b7442a9f9f4679d5a2a1532) to fix the tests. Note more realistic location/host as 4th entry in posadas.js.
-   This time tests passed
![Tests Passing](/day16/testPassing.png)
-   Deploy Succeeded
![Deploy Success](/day16/deploySuccess.png)
-   Live Function App was updated with 4th element in the array
![Fourth Posada Live](/day16/fourthPosadaLive.png)
