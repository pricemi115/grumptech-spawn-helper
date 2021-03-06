/* eslint-disable arrow-parens */
/* eslint-disable jsdoc/require-jsdoc */
/* eslint-disable require-jsdoc */
/* eslint-disable no-unused-vars */
/* eslint-disable indent */
/* eslint-disable brace-style */
/* eslint-disable semi */
/* eslint-disable new-cap */
import {default as SpawnHelper, SpawnOptions as _SpawnOptions, SPAWN_HELPER_EVENTS as _SPAWN_HELPER_EVENTS} from '../main.mjs';

import {fileURLToPath as _fileURLToPath} from 'url';
import {join as _join, dirname as _dirname} from 'path';

/**
 * @description Absolute path to this script file.
 * @private
 */
 const __filename = _fileURLToPath(import.meta.url);
 /**
  * @description Absolute path to the folder of this script file.
  * @private
  */
 const __dirname = _dirname(__filename);

describe('Module-level tests', ()=>{
    test('Module SpawnHelper export expected value', ()=>{
        const spawnHelper = new SpawnHelper();
        expect(spawnHelper).toBeInstanceOf(SpawnHelper);
    });
});

describe('Instance tests', ()=>{
    let spawnHelper;
    beforeEach(()=>{
        spawnHelper = new SpawnHelper();
    });
    describe('API & Default tests', ()=> {
        test('IsPending', ()=>{
            expect(spawnHelper).toHaveProperty('IsPending', false);
        });
        test('IsValid', ()=>{
            expect(spawnHelper).toHaveProperty('IsValid', false);
        });
        test('Result', ()=>{
            expect(spawnHelper).toHaveProperty('Result');
            expect(spawnHelper.Result).toBeUndefined();
        });
        test('Error', ()=>{
            expect(spawnHelper).toHaveProperty('Error');
            expect(spawnHelper.Error).toBeUndefined();
        });
        test('Command', ()=>{
            expect(spawnHelper).toHaveProperty('Command');
            expect(spawnHelper.Command).toBeUndefined();
        });
        test('Arguments', ()=>{
            expect(spawnHelper).toHaveProperty('Arguments');
            expect(spawnHelper.Arguments).toBeUndefined();
        });
        test('Options', ()=>{
            expect(spawnHelper).toHaveProperty('Options');
            expect(spawnHelper.Options).toBeUndefined();
        });
        test('Token', ()=>{
            expect(spawnHelper).toHaveProperty('Token');
            expect(spawnHelper.Token).toBeUndefined();
        });
        test('Token', ()=>{
            expect(spawnHelper.Spawn).toBeInstanceOf(Function);
        });
    });
    describe('Spawn error tests', ()=>{
        test('Pending active', ()=>{
            // Force pending to true
            spawnHelper._pending = true;
            const request = {command: 'waffles'};
            expect(()=>{spawnHelper.Spawn(request);}).toThrow(Error);
        });
        describe.each([
            ['Null',                undefined,                                  TypeError],
            ['Number',              42,                                         TypeError],
            ['String',              'waffles',                                  TypeError],
            ['Missing Command',     {waffles: 42},                              TypeError],
            ['Invalid Command',     {command: 42},                              TypeError],
            ['Empty Command',       {command: ''},                              TypeError],
            ['Invalid Arguments',   {command: 'ls', arguments: 42},             TypeError],
            ['Invalid Arguments',   {command: 'ls', arguments: 'waffles'},      TypeError],
            ['Invalid Arguments',   {command: 'ls', arguments: ['foo', 42]},    TypeError],
            ['Invalid Options',     {command: 'ls', options: 42},               TypeError],
            ['Invalid Options',     {command: 'ls', options: 'waffles'},        TypeError],
            ['Invalid Options',     {command: 'ls', options: ['foo', 42]},      TypeError],
            ['Invalid Token',       {command: 'ls', token: undefined},          TypeError],
        ])('Request Validation', (desc, request, result)=>{
            test(desc, ()=>{
                expect(()=>{spawnHelper.Spawn(request);}).toThrow(result);
            });
        });
    });
    describe('Spawn Tests', ()=>{
        describe.each([
            ['Success', {command: 'ls',   arguments: ['-al', '/Volumes'], options: new _SpawnOptions({cwd: __dirname}), token: 42},        42,        true],
            ['Success', {command: 'pwd',  arguments: ['-P'],              options: new _SpawnOptions({cwd: `~`}),       token: 42},        42,        false],
            ['Failure', {command: 'foo',  arguments: ['-al', '/Volumes'],                                               token: 'waffles'}, 'waffles', false],
        ])('Functional operation', (desc, request, token, status)=>{
            test(desc, done =>{
                function handlerComplete(response) {
                    try {
                        /* Valid */
                        expect(response).toHaveProperty('valid');
                        expect(response.valid).toBe(status);

                        /* Token */
                        expect(response).toHaveProperty('token');
                        expect(response.token).toBe(token);

                        /* Result */
                        expect(response).toHaveProperty('result');
                        expect(response.result).toBeDefined();

                        /* Source */
                        expect(response).toHaveProperty('source');
                        expect(response.source).toBe(spawnHelper);

                        done();
                    }
                    catch (error) {
                        done(error);
                    }
                };

                // Initiate the test
                spawnHelper.on(_SPAWN_HELPER_EVENTS.EVENT_COMPLETE, handlerComplete);
                spawnHelper.Spawn(request);
            });
        });
    });
});
