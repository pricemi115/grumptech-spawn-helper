/* eslint-disable arrow-parens */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable brace-style */
/* eslint-disable semi */
/* eslint-disable new-cap */
import {default as SpawnOptions, SPAWN_OPTIONS_SERIALIZATION_TYPES as SerializationTypes} from '../spawnOptions.mjs';

describe('Module-level tests', ()=>{
    test('Module SpawnOptions export expected value', ()=>{
        const opts = new SpawnOptions();
        expect(opts).toBeInstanceOf(SpawnOptions);
    });
});

describe('Instance tests - Defaults', ()=>{
    let opts;
    beforeEach(()=>{
        opts = new SpawnOptions();
    });
    describe('API & Default tests', ()=> {
        test('CurrentWorkingDirectory', ()=>{
            expect(opts).toHaveProperty('CurrentWorkingDirectory');
        });
        test('Environment', ()=>{
            expect(opts).toHaveProperty('Environment');
            expect(opts.Environment).toStrictEqual(process.env);
        });
        test('ArgV0', ()=>{
            expect(opts).toHaveProperty('ArgV0');
            expect(opts.ArgV0).toBeUndefined();
        });
        test('StdIo', ()=>{
            expect(opts).toHaveProperty('StdIo');
            expect(opts.StdIo).toBeUndefined();
        });
        test('Detached', ()=>{
            expect(opts).toHaveProperty('Detached', false);
        });
        test('UID', ()=>{
            expect(opts).toHaveProperty('UID');
            expect(opts.UID).toBeUndefined();
        });
        test('GID', ()=>{
            expect(opts).toHaveProperty('GID');
            expect(opts.GID).toBeUndefined();
        });
        test('Serialization', ()=>{
            expect(opts).toHaveProperty('Serialization');
            expect(opts.Serialization).toStrictEqual(SerializationTypes.SERIALIZATION_JSON);
        });
        test('Shell', ()=>{
            expect(opts).toHaveProperty('Shell', false);
        });
        test('WindowsVerbatimArguments', ()=>{
            expect(opts).toHaveProperty('WindowsVerbatimArguments', false);
        });
        test('WindowsHide', ()=>{
            expect(opts).toHaveProperty('WindowsHide', false);
        });
        test('AbortSignal', ()=>{
            expect(opts).toHaveProperty('AbortSignal');
            expect(opts.AbortSignal).toBeUndefined();
        });
        test('Timeout', ()=>{
            expect(opts).toHaveProperty('Timeout');
            expect(opts.Timeout).toBeUndefined();
        });
        test('KillSignal', ()=>{
            expect(opts).toHaveProperty('KillSignal');
            expect(opts.KillSignal).toStrictEqual('SIGTERM');
        });
        test('Data', ()=>{
            expect(opts).toHaveProperty('Data');
            /* Ensure that the Data property has the expected fields.
             * No need to monitor the types specifically.
             * Will simply ensure the fields are the same as the source.
             */
            const data = opts.Data;
            expect(data).toHaveProperty('cwd');
            expect(data.cwd).toStrictEqual(opts.CurrentWorkingDirectory);
            expect(data).toHaveProperty('env');
            expect(data.env).toStrictEqual(opts.Environment);
            expect(data).toHaveProperty('argv0');
            expect(data.argv0).toStrictEqual(opts.ArgV0);
            expect(data).toHaveProperty('stdio');
            expect(data.stdio).toStrictEqual(opts.StdIo);
            expect(data).toHaveProperty('detached');
            expect(data.detached).toStrictEqual(opts.Detached);
            expect(data).toHaveProperty('uid');
            expect(data.uid).toStrictEqual(opts.UID);
            expect(data).toHaveProperty('gid');
            expect(data.gid).toStrictEqual(opts.GID);
            expect(data).toHaveProperty('serialization');
            expect(data.serialization).toStrictEqual(opts.Serialization);
            expect(data).toHaveProperty('shell');
            expect(data.shell).toStrictEqual(opts.Shell);
            expect(data).toHaveProperty('windowsVerbatimArguments');
            expect(data.windowsVerbatimArguments).toStrictEqual(opts.WindowsVerbatimArguments);
            expect(data).toHaveProperty('windowsHide');
            expect(data.windowsHide).toStrictEqual(opts.WindowsHide);
            expect(data).toHaveProperty('signal');
            expect(data.signal).toStrictEqual(opts.AbortSignal);
            expect(data).toHaveProperty('timeout');
            expect(data.timeout).toStrictEqual(opts.Timeout);
            expect(data).toHaveProperty('killSignal');
            expect(data.killSignal).toStrictEqual(opts.KillSignal);
        });
    });
});

describe('Instance tests - Non-Defaults', ()=>{
    let opts;
    let config;
    beforeEach(()=>{
        const sigAbortCtrlr = new AbortController();
        config = {cwd: 'waffles', env: {foo: 'bar'}, argv0: 'pancakes', stdio: 'stdio and syrup', detached: true,
                  uid: 3, gid: 4, serialization: 'foo bar', shell: 'she sold sea shells...', windowsVerbatimArguments: true,
                  windowsHide: true, signal: sigAbortCtrlr.signal, timeout: 123, killSignal: 'snookie'};
        opts = new SpawnOptions(config);
    });
    describe('API & Default tests', ()=> {
        test('CurrentWorkingDirectory', ()=>{
            expect(opts).toHaveProperty('CurrentWorkingDirectory');
            expect(opts.CurrentWorkingDirectory).toBe(config.cwd);
        });
        test('Environment', ()=>{
            expect(opts).toHaveProperty('Environment');
            expect(opts.Environment).toBe(config.env);
        });
        test('ArgV0', ()=>{
            expect(opts).toHaveProperty('ArgV0');
            expect(opts.ArgV0).toBe(config.argv0);
        });
        test('StdIo', ()=>{
            expect(opts).toHaveProperty('StdIo');
            expect(opts.StdIo).toBe(config.stdio);
        });
        test('Detached', ()=>{
            expect(opts).toHaveProperty('Detached', config.detached);
        });
        test('UID', ()=>{
            expect(opts).toHaveProperty('UID');
            expect(opts.UID).toBe(config.uid);
        });
        test('GID', ()=>{
            expect(opts).toHaveProperty('GID');
            expect(opts.GID).toBe(config.gid);
        });
        test('Serialization', ()=>{
            expect(opts).toHaveProperty('Serialization');
            expect(opts.Serialization).toBe(config.serialization);
        });
        test('Shell', ()=>{
            expect(opts).toHaveProperty('Shell');
            expect(opts.Shell).toBe(config.shell);
        });
        test('WindowsVerbatimArguments', ()=>{
            expect(opts).toHaveProperty('WindowsVerbatimArguments', config.windowsVerbatimArguments);
        });
        test('WindowsHide', ()=>{
            expect(opts).toHaveProperty('WindowsHide', config.windowsHide);
        });
        test('AbortSignal', ()=>{
            expect(opts).toHaveProperty('AbortSignal');
            expect(opts.AbortSignal).toBe(config.signal);
        });
        test('Timeout', ()=>{
            expect(opts).toHaveProperty('Timeout');
            expect(opts.Timeout).toBe(config.timeout);
        });
        test('KillSignal', ()=>{
            expect(opts).toHaveProperty('KillSignal');
            expect(opts.KillSignal).toBe(config.killSignal);
        });
        test('Data', ()=>{
            expect(opts).toHaveProperty('Data');
            /* Ensure that the Data property has the expected fields.
             * No need to monitor the types specifically.
             * Will simply ensure the fields are the same as the source.
             */
            const data = opts.Data;
            expect(data).toHaveProperty('cwd');
            expect(data.cwd).toStrictEqual(opts.CurrentWorkingDirectory);
            expect(data).toHaveProperty('env');
            expect(data.env).toStrictEqual(opts.Environment);
            expect(data).toHaveProperty('argv0');
            expect(data.argv0).toStrictEqual(opts.ArgV0);
            expect(data).toHaveProperty('stdio');
            expect(data.stdio).toStrictEqual(opts.StdIo);
            expect(data).toHaveProperty('detached');
            expect(data.detached).toStrictEqual(opts.Detached);
            expect(data).toHaveProperty('uid');
            expect(data.uid).toStrictEqual(opts.UID);
            expect(data).toHaveProperty('gid');
            expect(data.gid).toStrictEqual(opts.GID);
            expect(data).toHaveProperty('serialization');
            expect(data.serialization).toStrictEqual(opts.Serialization);
            expect(data).toHaveProperty('shell');
            expect(data.shell).toStrictEqual(opts.Shell);
            expect(data).toHaveProperty('windowsVerbatimArguments');
            expect(data.windowsVerbatimArguments).toStrictEqual(opts.WindowsVerbatimArguments);
            expect(data).toHaveProperty('windowsHide');
            expect(data.windowsHide).toStrictEqual(opts.WindowsHide);
            expect(data).toHaveProperty('signal');
            expect(data.signal).toStrictEqual(opts.AbortSignal);
            expect(data).toHaveProperty('timeout');
            expect(data.timeout).toStrictEqual(opts.Timeout);
            expect(data).toHaveProperty('killSignal');
            expect(data.killSignal).toStrictEqual(opts.KillSignal);
        });
    });
});

describe('Instance tests - Optional Settings', ()=>{
    test('CurrentWorkingDirectory', ()=>{
        const config = {cwd: 'waffles'};
        const opts = new SpawnOptions(config);
        expect(opts).toHaveProperty('CurrentWorkingDirectory');
        expect(opts.CurrentWorkingDirectory).toBe(config.cwd);
    });
    test('Environment', ()=>{
        const config = {env: {foo: 'bar'}};
        const opts = new SpawnOptions(config);
        expect(opts).toHaveProperty('Environment');
        expect(opts.Environment).toBe(config.env);
    });
    test('ArgV0', ()=>{
        const config = {argv0: 'pancakes'};
        const opts = new SpawnOptions(config);
        expect(opts).toHaveProperty('ArgV0');
        expect(opts.ArgV0).toBe(config.argv0);
    });
    test('StdIo', ()=>{
        const config = {stdio: 'stdio and syrup'};
        const opts = new SpawnOptions(config);
        expect(opts).toHaveProperty('StdIo');
        expect(opts.StdIo).toBe(config.stdio);
    });
    test('Detached', ()=>{
        const config = {detached: true};
        const opts = new SpawnOptions(config);
        expect(opts).toHaveProperty('Detached', config.detached);
    });
    test('UID', ()=>{
        const config = {uid: 3};
        const opts = new SpawnOptions(config);
        expect(opts).toHaveProperty('UID');
        expect(opts.UID).toBe(config.uid);
    });
    test('GID', ()=>{
        const config = {gid: 4};
        const opts = new SpawnOptions(config);
        expect(opts).toHaveProperty('GID');
        expect(opts.GID).toBe(config.gid);
    });
    test('Serialization', ()=>{
        const config = {serialization: 'foo bar'};
        const opts = new SpawnOptions(config);
        expect(opts).toHaveProperty('Serialization');
        expect(opts.Serialization).toBe(config.serialization);
    });
    test('Shell', ()=>{
        const config = {shell: 'she sold sea shells...'};
        const opts = new SpawnOptions(config);
        expect(opts).toHaveProperty('Shell');
        expect(opts.Shell).toBe(config.shell);
    });
    test('WindowsVerbatimArguments', ()=>{
        const config = {windowsVerbatimArguments: true};
        const opts = new SpawnOptions(config);
        expect(opts).toHaveProperty('WindowsVerbatimArguments', config.windowsVerbatimArguments);
    });
    test('WindowsHide', ()=>{
        const config = {windowsHide: true};
        const opts = new SpawnOptions(config);
        expect(opts).toHaveProperty('WindowsHide', config.windowsHide);
    });
    test('AbortSignal', ()=>{
        const sigAbortCtrlr = new AbortController();
        const config = {signal: sigAbortCtrlr.signal};
        const opts = new SpawnOptions(config);
        expect(opts).toHaveProperty('AbortSignal');
        expect(opts.AbortSignal).toBe(config.signal);
    });
    test('Timeout', ()=>{
        const config = {timeout: 123};
        const opts = new SpawnOptions(config);
        expect(opts).toHaveProperty('Timeout');
        expect(opts.Timeout).toBe(config.timeout);
    });
    test('KillSignal', ()=>{
        const config = {killSignal: 'snookie'};
        const opts = new SpawnOptions(config);
        expect(opts).toHaveProperty('KillSignal');
        expect(opts.KillSignal).toBe(config.killSignal);
    });
});
