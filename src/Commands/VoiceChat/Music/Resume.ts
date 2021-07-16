import { Guild, Message, MessageEmbed, MessageEmbedOptions, User } from "discord.js";
import { ICommand } from "../../../Interfaces/ICommand";
import { IUserCommand } from "../../../Interfaces/IUserCommand";
import { VoiceObject } from "../../../Interfaces/VoiceObjects";
import { UndefinedClient } from "../../../UndefinedClient";
import VoiceChatUtil from "../../../Utils/VoiceChatUtil";

export const command: ICommand = {
    name: 'resume',
    description: 'Resume Music',
    run: async (client: UndefinedClient, guild: Guild, user: User, message: Message, userCommand: IUserCommand) => {

        if (!VoiceChatUtil.isConnected(message)) {
            return;
        }

        var voice = client.voiceObjects.get(guild.id);

        if (!voice)
            return;

        voice?.dispatcher?.resume();

        await message.react('▶');
    }
}