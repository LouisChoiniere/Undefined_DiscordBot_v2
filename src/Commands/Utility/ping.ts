import { Message, MessageEmbed } from "discord.js";
import { ICommand } from "../../Interfaces/ICommand";
import { UndefinedClient } from "../../UndefinedClient";
import { msToTime } from "../../Utils/Util";

export const command: ICommand = {
    name: 'ping',
    description: 'Ping!',
    run: async (client: UndefinedClient, message: Message, params: string[]) => {
        let msg = await message.channel.send('Pinging...');

        await msg.edit({
            embeds: [new MessageEmbed()
                .setTitle(':signal_strength: Ping')
                .setDescription(
                    `**Latency** ${msg.createdAt.getTime() - message.createdAt.getTime()}ms
                **API** ${message.client.ws.ping}ms
                **Uptime** ${msToTime(client.uptime!)}`)]
        });
    }
}