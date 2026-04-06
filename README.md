# jsPsych v8 Freeman Lab Template

This is a template to get you started with creating jsPsych studies. 

https://www.jspsych.org/v8/

## Creating a Trial
To create a new trial, declare a new const variable in `main.js`, set the type to the plugin you want to use, then set any relevant parameters. For example:

```js
const exampleTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Press "F" to continue.",
    choices: ["f"]
};
```
Then add the trial to the desired position in the timeline at the bottom of `main.js`. It should look something like this:
```js
timeline.push(
    someOtherTrial,
    exampleTrial,
    yetAnotherTrial,
);
```
If you are using a new plugin for this trial, make sure it is imported in `index.html`. In this example, I would make sure that `<script src="jspsych/plugin-html-keyboard-response.js"></script>` is present anywhere between `<head>` and `</head>` in `index.html`.

## Creating a SurveyJS Trial
You can go to the [SurveyJS survey builder](https://surveyjs.io/create-free-survey) to create a trial using a graphical interface, similar to Google Forms (learn more about how to use it [here](https://surveyjs.io/survey-creator/documentation/end-user-guide/user-interface)). When finished, click on the "JSON Editor" tab to get the JSON code for your trial. Copy the JSON and paste it into `content.js` after declaring a new variable. For example: `export const sampleSurveyContent = PASTE YOUR JSON HERE`. Note that some features from the website, such as those under the "Themes" or "Logic" tab, will not be included.

Then go to `main.js` and create a new const variable, just like you would for a regular trial. Set the type to `jsPsychSurvey` and set the `survey_json` parameter to the name of the variable you made in `content.js`, with `content.` before it. For example:

```js
const sampleSurveyTrial = {
    type: jsPsychSurvey,
    survey_json: content.sampleSurveyContent
};
```

Don't forget to add your new trial to the timeline!

## Other Stuff
There are many other things you can do with jsPsych that aren't covered here! You can use the `on_finish()` or `on_start()` functions to add more logic to trials. You can use the `data` parameter to save custom information. You can even make custom plugins to create a new type of trial. The [jsPsych website](https://www.jspsych.org/v8/) is a great resource to learn more.

# Files
Here is a quick rundown of what each file in this template does:

### init.js
This file handles jsPsych initialization and data saving.

It creates a random session ID to associate with the save file. 

After the last trial ends, it will show a completion message and provide a link back to Prolific (which can be customized in `config.js`). If `DEBUG_SAVE` is set to `true` in `config.js`, then the data will be saved to your downloads folder. Otherwise, it will be saved to the server using the PHP script (which will not work if not running on a server).

### main.js
This file handles trials and timelines.

It decalares two trials. The first is sampleTrial, which uses the jsPsychHtmlButtonResponse plugin. It displays a message and multiple buttons to click. jsPsych has many different plugins that provide you with prebuilt trials, which you can read more about [here](https://www.jspsych.org/v8/plugins/list-of-plugins/).

The second is sampleSurveyTrial, which uses the jsPsychSurvey plugin. It reads its content from `content.js`, which you can read about in the next section.

A sample debug print is included in this template. It will print a message to the browser console, but only if `DEBUG_LOGS` is `true` in `config.js`. You can view the browser console on Chrome or Safari by right clicking anywhere on the page and clicking "Inspect" or "Inspect Element", then click on the console tab. You can also use Ctrl+Shift+I (Windows) / Command+Option+I (Mac).

The timeline is created at the end of the file. Trials are added to the timeline in the order that they will appear, then the timeline is run. You must add any new trials you declare to the timeline in order for them to appear in the study. When testing parts of your study, you may find it useful to comment out some trials to skip past them.

### content.js
This file stores content for SurveyJS trials.

### config.js
This file stores configuration options.

`COMPLETION_LINK` is the link participants will see upon completing the study. If you are using Prolific, it should contain the completion code for the study.

`DEBUG_LOGS` can be set to true or false. You should check if this is true before printing messages to the console to ensure participants can't see them (they are unlikely to check the browser console, but they could, so it's better to hide these prints). **Ensure this is false before sending the study to actual participants.**

`DEBUG_SAVE` can be set to true or false. If true, data will be saved locally to your computer at the end of the study, which is useful for testing without a server. **Ensure this is false before sending the study to actual participants.**

**You are encouraged to add your own config options!** Any value that you want to be easy to change should be declared here. To use that variable in another file, simply do `config.variableName`. Make sure the file imports config with `import { config } from './config.js';` first.

### index.html
This file imports your scripts and CSS styles.

When you run your study, this is the file the browser starts with. To use any jsPsych plugin, you must first import it here so the browser knows it exists. If you add a new CSS file, you must also import it here. 

### write_data.php
This file recieves requests to save data.

When a paritipant completes the study, `init.js` sends out a request to save the data to the server. This file recieves that request and saves the file a folder called `data` folder. You can change which folder it saves to by changing `$dir = "../data";`. This script will run automatically on a properly configured web server, so you should never have to run it manually.
