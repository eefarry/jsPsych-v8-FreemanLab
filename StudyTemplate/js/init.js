import { config } from './config.js';

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
        if (config.DEBUG_SAVE) {
            jsPsych.data.get().localSave("csv", "data.csv");
        } else {
            saveData(`data-${sessionId}`, jsPsych.data.get().csv());
        }
        jsPsych.abortExperiment(`<p>Thanks for participating!</p>
                <p><a href=${config.COMPLETION_LINK}>Click here to return to Prolific and complete the study</a>.</p>`);
    }
});