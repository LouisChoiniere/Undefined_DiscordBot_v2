import { StreamDispatcher, VoiceConnection } from "discord.js";

export class VoiceObject {
    connection: VoiceConnection | undefined;
    dispatcher: StreamDispatcher | undefined;
    isPlaying: boolean = false;
}