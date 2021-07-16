import { ICommand } from "../../Interfaces/ICommand"
import { Guild, Message, MessageEmbed, MessageEmbedOptions, User } from "discord.js";
import { UndefinedClient } from "../../UndefinedClient";
import { VoiceObject } from "../../Interfaces/VoiceObjects";
import { IUserCommand } from "../../Interfaces/IUserCommand";

export const command: ICommand = {
    name: 'leave',
    description: 'Leave voice chanel',
    run: async (client: UndefinedClient, guild: Guild, user: User, message: Message, userCommand: IUserCommand) => {

        var voice = client.voiceObjects.get(guild.id);

        if (!voice)
            return;

        voice.dispatcher?.destroy();
        voice.connection?.disconnect();
        voice.isPlaying = false;

        await message.react('👋');

        client.queue.set(guild.id, undefined);
    }
}