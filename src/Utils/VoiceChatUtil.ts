import { Message } from "discord.js";

export default class VoiceChatUtil {
    static isConnected(message: Message) : boolean {
        if(!message.member?.voice.channel) {
            message.channel.send('You must be connected to a voice channel to use the bot!');
            return false;
        }
    
        return true;
    }
}