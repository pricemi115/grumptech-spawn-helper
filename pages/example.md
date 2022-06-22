The example below shows how to use the Spawn Helper module.

```
import {default as SpawnHelper, SpawnOptions, SPAWN_HELPER_EVENTS, SPAWN_OPTIONS_SERIALIZATION_TYPES} from 'grumptech-spawn-helper';
import {fileURLToPath as _fileURLToPath} from 'url';
import {join as _join, dirname as _dirname} from 'path';

/* Get the path to the script file */
const __filename = _fileURLToPath(import.meta.url);
const __dirname = _dirname(__filename);

// Event Handler for the 'complete' event.
function handleSpawnComplete(response) {
  console.log(`'${response.source.Command} ${response.source.Arguments}' Spawn Helper Result: valid:${response.valid} Token:${response.token}`);

  if (response.valid) {
    console.log(response.result.toString());
  }
  else {
    console.log(response.result);
  }
}

// Define a token to be used for the spawned task.
const tok = 'waffles';
// Create/Specify the spawn options. (Set the current working directory to the parent of the one containing this script)
const opts = new SpawnOptions({cwd: `${__dirname}/..`});
// Create the spawn helper.
const spawn = new SpawnHelper();
// Register for the complete event.
spawn.on(SPAWN_HELPER_EVENTS.EVENT_COMPLETE, handleSpawnComplete);
// Spawn the request to get the name of the working directory.
spawn.Spawn({command:'pwd', arguments: ['-P'], options: opts, token: tok});

```
