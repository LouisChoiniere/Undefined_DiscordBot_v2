import { Guild, Message, User } from "discord.js";
import { ICommand } from "../../../Interfaces/ICommand";
import { UndefinedClient } from "../../../UndefinedClient";


export const command: ICommand = {
    name: 'shuffle',
    description: 'Shuffle the queue',
    run: async (client: UndefinedClient, message: Message, params: string[]) => {

        if (!client.VoiceChatService.isMemberConnected(message)) {
            return;
        }

        var queue = client.VoiceChatService.getQueue(message.guild!);
        if (!queue || queue.length == 0) {
            await message.channel.send('Queue is empty!');
            return;
        }

        var newQueue = queue.slice(0, 1).concat(queue.slice(1).sort(() => 0.5 - Math.random()));
        client.VoiceChatService.setQueue(message.guild!, newQueue);

        await message.channel.send('Shuffled the queue!');
    }
}