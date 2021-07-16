import { UndefinedClient } from "../UndefinedClient";

export interface runFuncion {
    (client: UndefinedClient, ...params: any[]): Promise<void>
};

export interface IEvent {
    name: string;
    run: runFuncion;
};