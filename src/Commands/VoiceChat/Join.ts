import { ICommand } from "../../Interfaces/ICommand"
import { Guild, Message, MessageEmbed, MessageEmbedOptions, User } from "discord.js";
import { UndefinedClient } from "../../UndefinedClient";
import VoiceChatUtil from "../../Utils/VoiceChatUtil";
import { VoiceObject } from "../../Interfaces/VoiceObjects";
import { IUserCommand } from "../../Interfaces/IUserCommand";

export const command: ICommand = {
    name: 'join',
    description: 'Join voice channel',
    run: async (client: UndefinedClient, guild: Guild, user: User, message: Message, userCommand: IUserCommand) => {

        if (!VoiceChatUtil.isConnected(message)) {
            return;
        }
        
        await client.VoiceChatService.join(guild.id, message.member?.voice.channel!);

        await message.react('👌');
    }
}