#!/usr/bin/env node

// import commander from '../src/commander';

// commander(process.argv.slice(2)).then(
//   () => {
//     // noop
//   },
//   err => {
//     console.error(err);
//     process.exit(123);
//   }
// );

import fs from 'fs';
import wsclient from '../src/wsclient';

import Bridge from '../src/bridge';
import ConsolePrinter from '../src/device/printer/console_printer';

const printerDataPath = 'fixtures/11cc0f6aaeb07dad.printer';
const printerData = fs.readFileSync(printerDataPath).toString();

// const uri = 'wss://165.227.233.168:443/api/v1/connection';
const uri = 'ws://165.227.233.168/api/v1/connection';
// const uri = 'wss://device.li:443/api/v1/connection';
// const uri = 'ws://device.li/api/v1/connection';
// const uri = 'ws://sirius.localhost:5000/api/v1/connection';

console.log('Contacting', uri);
console.log(printerData);
console.log('-----------------------------');

// Parse data from printer file
const deviceAddressMaybe = printerData.match(/address: ([a-f0-9]{16})/);

if (deviceAddressMaybe == null) {
  throw new Error(`couldn't find device address in ${printerDataPath}`);
}
const deviceAddress = deviceAddressMaybe[1];

const bridgeAddress = Math.floor(Math.random() * Math.floor(Math.pow(2, 64)))
  .toString(16)
  .padStart(16, '0');

const device = new ConsolePrinter(deviceAddress);
const bridge = new Bridge(bridgeAddress, device);

wsclient(uri, bridge);
