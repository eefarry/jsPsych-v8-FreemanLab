// Imports
import { config } from './config.js';
import { jsPsych } from './init.js';
import * as content from './content.js';

// Trials
const sampleTrial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "Do you like cats or dogs?",
    choices: ["Cats", "Dogs"],
    data: { trial_name: "pets" }
};

const sampleSurveyTrial = {
    type: jsPsychSurvey,
    survey_json: content.sampleSurveyContent,
    data: { trial_name: "colors" }
};

if (config.DEBUG_LOGS) console.log("Example") // Sample debug log that only prints if DEBUG_LOGS is true

// Timeline
var timeline = [];

timeline.push(
    sampleTrial,
    sampleSurveyTrial
);

jsPsych.run(timeline);