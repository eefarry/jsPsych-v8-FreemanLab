import { config } from './config.js';

// Variable to indicate study completion
let complete = false;
export function setComplete(value) {
    complete = value;
}

// Generate random session ID
const sessionId = Math.random().toString(36).substring(2) + Date.now().toString(36);

// Function to save data to server
function saveData(id, data) {
    var dataToSend = JSON.stringify({ id: id, filedata: data });
    var success = navigator.sendBeacon('./php/write_data.php', dataToSend);
    if (config.DEBUG_LOGS) console.log("Data saved to data/" + id + ": " + success);
}

// Initialize jsPsych and handle study completion
export const jsPsych = initJsPsych({
    on_finish: function () {
        if (complete) {
            // Study completed
            if (config.DEBUG_SAVE) {
                jsPsych.data.get().localSave("csv", `data-${sessionId}.csv`);
            } else {
                saveData(`data-${sessionId}`, jsPsych.data.get().csv());
                jsPsych.abortExperiment("You will be redirected to Prolific shortly!");
                setTimeout(() => {
                    window.location.href = config.COMPLETION_LINK;
                }, 2000);
            }
        } else {
            // Study failed
            jsPsych.abortExperiment("<p>Sorry, you are not eligible for the study.</p><p>You will be redirected to Prolific shortly.</p>");
            setTimeout(() => {
                window.location.href = config.FAILURE_LINK;
            }, 2000);
        }
    }
});