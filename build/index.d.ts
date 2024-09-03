/// <reference types="node" />
import EventEmitter from "node:events";
export declare class Module {
    private eventBus;
    private cmd;
    onInit(config: {
        cmd: string;
    }, eventBus: EventEmitter): Promise<void>;
    run(): Promise<void>;
    info(): Promise<{
        name: string;
        version: string;
    }>;
    execPromise(cmd: string): Promise<string>;
}
