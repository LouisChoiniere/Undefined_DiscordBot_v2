import { VoiceChannel } from "discord.js";
import { VoiceObject } from "../Interfaces/VoiceObjects";
import { UndefinedClient } from "../UndefinedClient";

export default class VoiceChatService {

    public readonly client: UndefinedClient;

    constructor (client: UndefinedClient) {
        this.client = client;
    }


    async join(guildId: string, channel: VoiceChannel) : Promise<void> {
        
        var voice = this.client.voiceObjects.get(guildId)

        if(!voice) {
            voice = new VoiceObject();
            this.client.voiceObjects.set(guildId, voice);
        }

        voice.connection = await channel?.join();
    }
}