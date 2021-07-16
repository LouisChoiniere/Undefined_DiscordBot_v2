
export interface IUserCommand {
    command: string
    args: Array<string>
    flags: Array<IFlag>
}

export interface IFlag {
    flag: string,
    value: string
}