// accesstoken-test.js
//
// Test the accesstoken module
//
// Copyright 2012, StatusNet Inc.
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

var assert = require('assert'),
    vows = require('vows'),
    databank = require('databank'),
    URLMaker = require('../lib/urlmaker').URLMaker,
    modelBatch = require('./lib/model').modelBatch,
    Databank = databank.Databank,
    DatabankObject = databank.DatabankObject;

// Need this to make IDs

URLMaker.hostname = "example.net";

// Dummy databank

DatabankObject.bank = Databank.get('memory', {});

var suite = vows.describe('access token interface');

var testSchema = {
    pkey: 'token',
    fields: ['token_secret',
             'consumer_key',
             'username',
             'created',
             'updated'],
    indices: ['username', 'consumer_key']
};

var testData = {
    'create': {
        consumer_key: "AAAAAAAAAAAAAAAAAAAAAA",
        username: "evan"
    },
    'update': {
        consumer_key: "AAAAAAAAAAAAAAAAAAAAAB"
    }
};

suite.addBatch(modelBatch('accesstoken', 'AccessToken', testSchema, testData));

suite.export(module);
