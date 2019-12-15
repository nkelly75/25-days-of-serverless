# Day 7

Implementing challenge for Day 7 defined [here](https://25daysofserverless.com/calendar/7)

Live UI here: https://niall25days07.z16.web.core.windows.net/ (e.g. type Trash in the box)

Function here: https://ngk25dos07.azurewebsites.net/api/ImageSearch?code=R3KMbSSkWj2WQOVlN0NRifcjohatOZmbkFYzlP8FRTf9abxWnHpiFQ==&text=shark

The UI is also "serverless" in that its hosted as a static site on a storage account.

## Approach
-   Started with a local React UI directly using unsplash (ideas thanks to [Nabendu's blogs](https://nabendu.blog/posts/image-search-app-using-unsplash-api-in-reactjs-1-54kj/) )
-   Then built nice simple Node.js function that takes a text param, calls unsplash search API and returns 3 images. Benefits:
    -   unsplash token moves out of UI to function app setting
    -   reduced response payload to UI by only picking useful properties from unsplash
-   Tweaked the UI to call the function app
-   Worked out how to handle CORS for the function app
-   Then "built" the react UI and deployed to a storage account

![Sample JSON from Function](/day07/shark.png)
![Sample UI](/day07/tires.png)
