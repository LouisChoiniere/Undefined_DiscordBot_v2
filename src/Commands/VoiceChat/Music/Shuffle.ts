import { Guild, Message, MessageEmbed, MessageEmbedOptions, User } from "discord.js";
import { ICommand } from "../../../Interfaces/ICommand";
import { IUserCommand } from "../../../Interfaces/IUserCommand";
import { UndefinedClient } from "../../../UndefinedClient";
import VoiceChatUtil from "../../../Utils/VoiceChatUtil";


export const command: ICommand = {
    name: 'shuffle',
    description: 'Shuffle the queue',
    run: async (client: UndefinedClient, guild: Guild, user: User, message: Message, userCommand: IUserCommand) => {

        if (!VoiceChatUtil.isConnected(message)) {
            return;
        }

        var queue = client.queue.get(guild.id);
        if (!queue || queue.length == 0) {
            await message.channel.send('Queue is empty!');
            return;
        }

        var newQueue = queue.slice(0, 1).concat(queue.slice(1).sort(() => 0.5 - Math.random()));
        client.queue.set(guild.id, newQueue);

        await message.channel.send('Shuffled the queue!');
    }
}