import EventEmitter from "node:events";
import { exec } from 'node:child_process';
const packageInfo = require('../package.json');

export class Module {
  private eventBus: EventEmitter;
  private cmd: string;

  async onInit(config: {cmd: string}, eventBus: EventEmitter): Promise<void> {
    this.eventBus = eventBus;
    this.cmd = config.cmd;
  }

  async run(): Promise<void> {
    this.eventBus.on('writeFileComplete', async (url: string) => {
        await this.execPromise(this.cmd);
     });
  }

  async info(): Promise<{name: string, version: string}> {
    return Promise.resolve({name: packageInfo.name, version: packageInfo.version}); 
  }

  async execPromise(cmd: string): Promise<string> {
    return new Promise((resolve, reject) => {
       exec(cmd, (err, stdout) => {
            if (err) return reject(err);
            resolve(stdout);
        });
    });
}
}