// Imports
import { config } from './config.js';
import { jsPsych } from './init.js';

// Trials
const sampleTrial = {
    type: jsPsychHtmlButtonResponse,
    stimulus: "This is a sample trial.",
    choices: ["Button 1", "Button 2"]
};

if (config.DEBUG_LOGS) console.log("Example") // Sample debug log that only prints if DEBUG_LOGS is true

// Timeline
var timeline = [];

timeline.push(sampleTrial);

jsPsych.run(timeline);