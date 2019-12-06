const CognitiveServicesCredentials = require("@azure/ms-rest-js");
const TextAnalyticsAPIClient = require("@azure/cognitiveservices-textanalytics");

const subscription_key = process.env.cognitive_txt_key;
const endpoint = process.env.cognitive_txt_endpoint;

const creds = new CognitiveServicesCredentials.ApiKeyCredentials({ inHeader: { 'Ocp-Apim-Subscription-Key': subscription_key } });
const client = new TextAnalyticsAPIClient.TextAnalyticsClient(creds, endpoint);

module.exports = async function (context, myBlob) {
    context.log("JavaScript blob trigger function processed blob \n Blob:",
        context.bindingData.blobTrigger, "\n Blob Size:", myBlob.length, "Bytes");

    var letters = JSON.parse(myBlob.toString());
    var counter = 0;

    // First group messages by 'who'
    var kidMap = {};
    letters.forEach(letter => {
        if (letter.who) {
            var kidEntry = kidMap[letter.who];
            if (!kidEntry) {
                kidEntry = {
                    kid: letter.who,
                    messages: []
                };
            }
            if (letter.message) {
                kidEntry.messages.push(letter.message)
            }
            kidMap[letter.who] = kidEntry;
        }
    });

    // Then convert to array ready for Text Analytics APIs
    var overallResults = [];
    Object.keys(kidMap).forEach(item => {
        var kidEntry = kidMap[item];
        var li = {
            id: counter.toString(),
            text: kidEntry.messages.join('. '),
            messages: kidEntry.messages,
            kid: item
        };
        counter++;
        overallResults.push(li);
    });

    const languageInput = {
        documents: overallResults 
    };

    const languageResult = await client.detectLanguage({
        languageBatchInput: languageInput
    });

    // Merge the detected languages into overallResults
    languageResult.documents.forEach(langResult => {
        if (langResult.id) {
            var langCode = null;
            var langName = null;
    
            var id = parseInt(langResult.id, 10);
            if (!isNaN(id) && langResult.detectedLanguages.length > 0) {
                if (langResult.detectedLanguages[0].iso6391Name) {
                    langCode = langResult.detectedLanguages[0].iso6391Name;
                }
                if (langResult.detectedLanguages[0].name) {
                    langName = langResult.detectedLanguages[0].name;
                }

                overallResults[id].language = langCode;
                overallResults[id].languageFull = langName;
            }
        }
    });

    // Prep for sentiment detection
    const sentimentInput = {
        documents: overallResults 
    };

    const sentimentResult = await client.sentiment({
        multiLanguageBatchInput: sentimentInput
    });

    // Merge the detected sentiment into overallResults
    sentimentResult.documents.forEach(sentResult => {
        if (sentResult.id) {
            var score = null;
            var verdict = 'neutral';
    
            var id = parseInt(sentResult.id, 10);
            if (!isNaN(id) && typeof sentResult.score !== 'undefined') {
                score = sentResult.score;
                if (score < 0.1) {
                    verdict = 'naughty';
                } else if (score > 0.9) {
                    verdict = 'nice';
                }
            }

            overallResults[id].sentScore = score; 
            overallResults[id].verdict = verdict;
        }
    });

    // console.log(JSON.stringify(overallResults, null, 2));

    // Write results to output buffer tied to output binding
    var outBuf = Buffer.from(JSON.stringify(overallResults));
    context.bindings.outputBlob = outBuf;
};