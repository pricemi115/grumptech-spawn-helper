/* eslint-disable jsdoc/valid-types */
/**
 * @description Wrapper for options argument used when spawning.
 * @copyright 2022
 * @author Mike Price <dev.grumptech@gmail.com>
 * @module SpawnOptionsModule
 * @requires debug
 * @see {@link https://github.com/debug-js/debug#readme}
 * @requires is-it-check
 * @see {@link https://github.com/evdama/is-it-check}
 */
/* eslint-enable jsdoc/valid-types */

// External dependencies and imports.
import _debugModule from 'debug';
import _is from 'is-it-check';

/**
 * @description Debugging function pointer for runtime related diagnostics.
 * @private
 */
const _debug = _debugModule('spawn_options');

// Bind debug to console.log
// eslint-disable-next-line no-console
_debug.log = console.log.bind(console);

/* eslint-disable jsdoc/valid-types */
/**
 * @description Enumeration of serialization types.
 * @readonly
 * @enum {string}
 */
const SPAWN_OPTIONS_SERIALIZATION_TYPES = {
    /* eslint-disable key-spacing */
    /** @member {string} - Identification for the JSON serialization type (default) */
    SERIALIZATION_JSON      : 'json',
    /** @member {string} - Identification for the advanced serialization type */
    SERIALIZATION_ADVANCED  : 'advanced',
    /* eslint-enable key-spacing */
};
/* eslint-enable jsdoc/valid-types */

/**
 * @description Options when spawning.
 */
class SpawnOptions {
    /**
     * @description Constructor
     * @class
     * @param {object} [config] - Settings used to create the object
     * @param {string | URL} [config.cwd] - Current working directory of the child process.
     * @param {object} [config.env] - Environment key-value pairs.
     * @param {string} [config.argv0] - Explicitly set the value of argv[0] sent to the child process.
     * @param {Array | string} [config.stdio] - Child's stdio configuration
     * @param {boolean} [config.detached] - Prepare child to run independently of its parent process. (Operating system dependant behavior)
     * @param {number} [config.uid] - Sets the user identity of the process
     * @param {number} [config.gid] - Sets the group identity of the process
     * @param {SPAWN_OPTIONS_SERIALIZATION_TYPES} [config.serialization] - Specify the kind of serialization used for sending messages between processes.
     * @param {boolean | string} [config.shell] - Specify how the child process runs.
     * @param {boolean} [config.windowsVerbatimArguments] - Specify how to process arguments to the child process
     * @param {boolean} [config.windowHide] - Hide the subprocess console window that would normally be created on Windows systems.
     * @param {AbortSignal} [config.signal] - allows aborting the child process using an AbortSignal.
     * @param {number} [config.timeout] - Timeout, in milliseconds the maximum amount of time the process is allowed to run.
     * @param {string | number} [config.killSignal] - The signal value to be used when the spawned process will be killed by timeout or abort signal.
     * @param {boolean} [config.testing] = Flag indicating that this is a test and no exceptions should be thrown.
     * @throws {TypeError} - Thrown if any configuration data are specified.
     */
    constructor(config) {
        /* Set defaults */
        /**
         * @member {string | URL} _cwd - Current working directory
         * @private
         */
        this._cwd = undefined;
        /**
         * @member {string | URL} _env - Environment
         * @private
         */
        this._env = process.env;
        this._argv0 = undefined;
        this._stdio = undefined;
        this._detached = false;
        this._uid = undefined;
        this._gid = undefined;
        this._serialization = SPAWN_OPTIONS_SERIALIZATION_TYPES.SERIALIZATION_JSON;
        this._shell = false;
        this._windowsVerbatimArgs = false;
        this._windowsHide = false;
        this._signal = undefined;
        this._timeout = undefined;
        this._killSignal = 'SIGTERM';

        /* Validate and Process the configuration */
        if (_is.not.undefined(config)) {
            if (_is.object(config)) {
                let testing = false;
                if (Object.prototype.hasOwnProperty.call(config, 'testing')) {
                    if (_is.boolean(config.testing)) {
                        testing = config.testing;
                    }
                }

                if (Object.prototype.hasOwnProperty.call(config, 'cwd')) {
                    /* Current Working Directory */
                    if (_is.sameType(config.cwd, 'string') || (config.cwd instanceof URL)) {
                        this._cwd = config.cwd;
                    }
                    else if (!testing) {
                        /* Incorrect type. */
                        throw new TypeError(`'config.cwd' is not string or URL. type(${typeof(config.cwd)})`);
                    }
                }
                if (Object.prototype.hasOwnProperty.call(config, 'env')) {
                    /* Environment */
                    if (_is.object(config.env)) {
                        /* The specifics of the environment data provided are not interrogated. Caller beware */
                        this._env = config.env;
                    }
                    else if (!testing) {
                        /* Incorrect type. */
                        throw new TypeError(`'config.env' is not an object. type(${typeof(config.env)})`);
                    }
                }
                if (Object.prototype.hasOwnProperty.call(config, 'argv0')) {
                    /* ArgV0 */
                    if (_is.sameType(config.argv0, 'string')) {
                        this._argv0 = config.argv0;
                    }
                    else if (!testing) {
                        /* Incorrect type. */
                        throw new TypeError(`'config.argv0' is not string. type(${typeof(config.cwd)})`);
                    }
                }
                if (Object.prototype.hasOwnProperty.call(config, 'stdio')) {
                    /* StdIO configuration */
                    if (_is.sameType(config.stdio, 'string') || _is.array(config.stdio)) {
                        this._stdio = config.stdio;
                    }
                    else if (!testing) {
                        /* Incorrect type. */
                        throw new TypeError(`'config.stdio' is not string or Array. type(${typeof(config.stdio)})`);
                    }
                }
                if (Object.prototype.hasOwnProperty.call(config, 'detached')) {
                    /* Detached */
                    if (_is.boolean(config.detached)) {
                        this._detached = config.detached;
                    }
                    else if (!testing) {
                        /* Incorrect type. */
                        throw new TypeError(`'config.detached' is not a boolean. type(${typeof(config.detached)})`);
                    }
                }
                if (Object.prototype.hasOwnProperty.call(config, 'uid')) {
                    /* UID */
                    if (_is.number(config.uid)) {
                        this._uid = config.uid;
                    }
                    else if (!testing) {
                        /* Incorrect type. */
                        throw new TypeError(`'config.uid' is not a number. type(${typeof(config.uid)})`);
                    }
                }
                if (Object.prototype.hasOwnProperty.call(config, 'gid')) {
                    /* GID */
                    if (_is.number(config.gid)) {
                        this._gid = config.gid;
                    }
                    else if (!testing) {
                        /* Incorrect type. */
                        throw new TypeError(`'config.gid' is not a number. type(${typeof(config.gid)})`);
                    }
                }
                if (Object.prototype.hasOwnProperty.call(config, 'serialization')) {
                    /* Serialization */
                    if (_is.truthy(Object.values(SPAWN_OPTIONS_SERIALIZATION_TYPES).indexOf(config.serialization) >= 0)) {
                        this._serialization = config.serialization;
                    }
                    else if (!testing) {
                        /* Incorrect type. */
                        throw new TypeError(`'config.serialization' is not a serialization type. type(${typeof(config.serialization)})`);
                    }
                }
                if (Object.prototype.hasOwnProperty.call(config, 'shell')) {
                    /* Shell */
                    if (_is.boolean(config.shell) || _is.sameType(config.shell, 'string')) {
                        /* The specifics of the shell data provided, specifically when it is a string, are not interrogated. Caller beware */
                        this._shell = config.shell;
                    }
                    else if (!testing) {
                        /* Incorrect type. */
                        throw new TypeError(`'config.shell' is neither a boolean nor a string. type(${typeof(config.shell)})`);
                    }
                }
                if (Object.prototype.hasOwnProperty.call(config, 'windowsVerbatimArguments')) {
                    /* Windows Verbatim Arguments */
                    if (_is.boolean(config.windowsVerbatimArguments)) {
                        this._windowsVerbatimArgs = config.windowsVerbatimArguments;
                    }
                    else if (!testing) {
                        /* Incorrect type. */
                        throw new TypeError(`'config.windowsVerbatimArguments' is not a boolean. type(${typeof(config.windowsVerbatimArguments)})`);
                    }
                }
                if (Object.prototype.hasOwnProperty.call(config, 'windowsHide')) {
                    /* Windows Hide */
                    if (_is.boolean(config.windowsHide)) {
                        this._windowsHide = config.windowsHide;
                    }
                    else if (!testing) {
                        /* Incorrect type. */
                        throw new TypeError(`'config.windowsHide' is not a boolean. type(${typeof(config.windowsHide)})`);
                    }
                }
                if (Object.prototype.hasOwnProperty.call(config, 'signal')) {
                    /* Abort Signal */
                    if ((config.signal instanceof AbortSignal)) {
                        this._signal = config.signal;
                    }
                    else if (!testing) {
                        /* Incorrect type. */
                        throw new TypeError(`'config.signal' is not an AbortSignal type. type(${typeof(config.signal)})`);
                    }
                }
                if (Object.prototype.hasOwnProperty.call(config, 'timeout')) {
                    /* Timeout */
                    if (_is.number(config.timeout)) {
                        this._timeout = config.timeout;
                    }
                    else if (!testing) {
                        /* Incorrect type. */
                        throw new TypeError(`'config.timeout' is not a number type(${typeof(config.timeout)})`);
                    }
                }
                if (Object.prototype.hasOwnProperty.call(config, 'killSignal')) {
                    /* Kill Signal */
                    if (_is.sameType(config.killSignal, 'string') || _is.integer(config.killSignal)) {
                        this._killSignal = config.killSignal;
                    }
                    else if (!testing) {
                        /* Incorrect type. */
                        throw new TypeError(`'config.killSignal' is neither a string nor integer type. type(${typeof(config.killSignal)})`);
                    }
                }
            }
            else if (!testing) {
                /* Incorrect type. */
                throw new TypeError(`'config' is not an object. type(${typeof(config)})`);
            }
        }
    }

    /**
     * @description Read-only property accessor for the current working directory.
     * @returns {string | URL} - Current working directory of the child process.
     */
    get CurrentWorkingDirectory() {
        return (this._cwd);
    }

    /**
     * @description Read-only property accessor for the environment key-value pairs.
     * @returns {object} - Environment key-value pairs.
     */
    get Environment() {
        return (this._env);
    }

    /**
     * @description Read-only property accessor for the value of ArgV[0].
     * @returns {string} - Environment key-value pairs.
     */
    get ArgV0() {
        return (this._argv0);
    }

    /**
     * @description Read-only property accessor for the value of StdIO.
     * @returns {Array | string} - StdIo configuration.
     */
    get StdIo() {
        return this._stdio;
    }

    /**
     * @description Read-only property accessor for the value of Detached.
     * @returns {boolean} - Flag to prepare the child process to run independently of the parent process.
     */
    get Detached() {
        return (this._detached);
    }

    /**
     * @description Read-only property accessor for the value of UID.
     * @returns {number} - User Identity of the process
     */
    get UID() {
        return (this._uid);
    }

    /**
     * @description Read-only property accessor for the value of GID.
     * @returns {number} - Group Identity of the process
     */
    get GID() {
        return (this._gid);
    }

    /**
     * @description Read-only property accessor for the value of Serialization.
     * @returns {string} - Type of serialization ('json' | 'advanced')
     */
    get Serialization() {
        return (this._serialization);
    }

    /**
     * @description Read-only property accessor for the value of Shell.
     * @returns {boolean | string} - Type of shell to run the process.
     */
    get Shell() {
        return (this._shell);
    }

    /**
     * @description Read-only property accessor for the value of Windows Verbatim Arguments.
     * @returns {boolean} - Flag for escaping arguments on Windows operating systems.
     */
    get WindowsVerbatimArguments() {
        return (this._windowsVerbatimArgs);
    }

    /**
     * @description Read-only property accessor for the value of Windows Hide.
     * @returns {boolean} - Flag for hiding the subprocess console window.
     */
    get WindowsHide() {
        return (this._windowsHide);
    }

    /**
     * @description Read-only property accessor for the value of the Abort Signal
     * @returns {AbortSignal} - Signal used for aborting the child process.
     */
    get AbortSignal() {
        return (this._signal);
    }

    /**
     * @description Read-only property accessor for the value of the Timeout
     * @returns {number} - Timeout in milliseconds before the child process is terminated.
     */
    get Timeout() {
        return (this._timeout);
    }

    /**
     * @description Read-only property accessor for the value of the Kill Signal
     * @returns {string | number} - Signal used for then the child process is killed by timeout or abort (Example: SIGTERM)
     */
    get KillSignal() {
        return (this._killSignal);
    }

    /**
     * @description Read-only property accessor for the data for this set of spawn options
     * @returns {object} - Object conforming to the Spawn Options.
     */
    get Data() {
        return {cwd: this.CurrentWorkingDirectory, env: this.Environment, argv0: this.ArgV0, stdio: this.StdIo, detached: this.Detached,
            uid: this.UID, gid: this.GID, serialization: this.Serialization, shell: this.Shell, windowsVerbatimArguments: this.WindowsVerbatimArguments,
            windowsHide: this.WindowsHide, signal: this.AbortSignal, timeout: this.Timeout, killSignal: this.KillSignal};
    }
}
export {SPAWN_OPTIONS_SERIALIZATION_TYPES};
export default SpawnOptions;
