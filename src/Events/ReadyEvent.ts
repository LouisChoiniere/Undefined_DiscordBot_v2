import { IEvent } from "../Interfaces/IEvent";
import { UndefinedClient } from "../UndefinedClient";


export const event: IEvent = {
    name: 'ready',
    run: async (client: UndefinedClient) => {

        
        client.logger.info(`Logged in as ${client.user!.username}`);
        client.logger.success(`Ready!`);
    }
}