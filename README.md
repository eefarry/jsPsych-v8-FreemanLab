# jsPsych v8 Freeman Lab Template

This is a template to get you started with creating jsPsych studies for the Freeman Lab. Note that this uses jsPsych version 8.

## Structure
- `index.html` - Base HTML and script imports
- `js/main.js` - Trials and timeline
- `js/init.js` - jsPsych initialization and data saving
- `js/content.js` - SurveyJS JSON content
- `js/config.js` - Customizable options and debug toggles
- `php/write_data.php` - Saves data to server
- `jspsych` - Folder with all v8 jsPsych plugins (delete what you don't need)

For a full breakdown of what each file does, see [the wiki](https://github.com/eefarry/jsPsych-v8-FreemanLab/wiki).

## Included Features
- Screener trial that aborts study without saving if failed
- 2 sample trials
- Demographics trial with optional feedback box
- SurveyJS integration
- Automatic retrieval of Prolific ID from URL
- PHP script for saving data to webserver
- Config file with debug options
- Recorded study start and end time
- Redirection to Prolific upon completion

## Creating a Trial
To create a new trial, declare a new const variable in `main.js`, set the type to the plugin you want to use, set any relevant parameters, and set the trial name. For example:

```js
const exampleTrial = {
    type: jsPsychHtmlKeyboardResponse,
    stimulus: "Press "F" to continue.",
    choices: ["f"],
    data: { trial_name: "press_f" }
};
```
Note that adding a trial name to the data is not required, but it recommended to make your data more readable and easier to analyze.

Then add the trial to the desired position in the timeline at the bottom of `main.js`. It should look something like this:
```js
timeline.push(
    someOtherTrial,
    exampleTrial,
    yetAnotherTrial,
);
```
If you are using a new plugin for this trial, make sure it is imported in `index.html`. In this example, I would make sure that `<script src="jspsych/plugin-html-keyboard-response.js"></script>` is present anywhere between `<head>` and `</head>` in `index.html`.

JsPsych has many built in plugins that may already provide the trial you need, inclulding likert scales, IAT methods, and more. Explore the full list [here](https://www.jspsych.org/v8/plugins/list-of-plugins/) or by browsing the `jspsych` folder in this repo.

## Creating a SurveyJS Trial
You can go to the [SurveyJS survey builder](https://surveyjs.io/create-free-survey) to create a trial using a graphical interface, similar to Google Forms (learn more about how to use it [here](https://surveyjs.io/survey-creator/documentation/end-user-guide/user-interface)). When finished, click on the "JSON Editor" tab to get the JSON code for your trial. Copy the JSON and paste it into `content.js` after declaring a new variable. For example: `export const sampleSurveyContent = PASTE YOUR JSON HERE`. Note that some features from the website, such as those under the "Themes" or "Logic" tab, will not be included.

Then go to `main.js` and create a new const variable, just like you would for a regular trial. Set the type to `jsPsychSurvey` and set the `survey_json` parameter to the name of the variable you made in `content.js`, with `content.` before it. For example:

```js
const sampleSurveyTrial = {
    type: jsPsychSurvey,
    survey_json: content.sampleSurveyContent
    data: { trial_name: "sample" }
};
```

Don't forget to add your new trial to the timeline!

## Other Stuff
There are many other things you can do with jsPsych that aren't covered here! You can use timeline variables to repeat the same trial with different stimuli. You can use the `on_finish()` or `on_start()` functions to add more logic to trials. You can even create custom plugins to add new types of trials. The [jsPsych website](https://www.jspsych.org/v8/) has helpful tutorials and documentation to help you learn more!

## Tips and Tricks
- If you are using VSCode, the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension is a great tool for testing your study locally in a browser. Just be sure to set `DEBUG_SAVE` to true while testing so you can access the saved data!
- If you want to test your study on a web server but don't have one handy, look into [XAMPP](https://www.apachefriends.org/download.html) to run a local web server.
- Did you change your code but don't see the changes in the browser? Try hard refreshing the page with Ctrl+Shift+R (Windows) / Command+Shift+R (Mac).
- When analyzing your data, note that SurveyJS trials save responses in a JSON format in the "response" column, which can be easily decoded with Python or R.
