import React, { useEffect, useCallback, useRef } from "react";
import './SimpleTerminal.css';

type CommandFunc = ((arg: string[]) => string) | (() => string) | (() => Promise<string>)
interface Commands {
    [key: string]: CommandFunc | String;
}

type CSS = { [key: string]: number | string };

const generateOutput = (
    commands: Commands,
    cmd: string,
    params: string[]
): Promise<string> => {
    if (commands[cmd] === undefined)
        return Promise.resolve(`Command ${cmd} not found!`);
    if(typeof commands[cmd] === "string")
        return Promise.resolve(commands[cmd] as string)

    const func : CommandFunc = commands[cmd] as CommandFunc;
    return Promise.resolve(func(params) ?? `Command ${cmd} returned an error!`);
};

export default function SimpleTerminal({
    commands,
    prompt = "$",
    style,
}: {
    commands: Commands;
    prompt: string;
    style: CSS;
}) {
    const history = useRef<HTMLDivElement>(null);
    const input = useRef<HTMLInputElement>(null);

    let mergedCommands: Commands;
    useEffect(() => {
        mergedCommands = {
            ...commands,
            clear: () => {
                if(history && history.current)
                    history.current.innerText = "";
                return ""
            },
        };
    }, []);

    // Auto focus
    useEffect(() => {
        input?.current?.focus();
    }, []);

    const focus = useCallback(() => {
        input?.current?.focus();
    }, []);

    // Handle new command sent
    const handleKey = useCallback((e) => {
        if (e.code === "Enter" || e.key === 'Enter') {
            const cmd = e.target.value;
            const logLine: HTMLParagraphElement = document.createElement("p");
            generateOutput(mergedCommands, cmd.split(" ")[0], cmd.split(" ").slice(1)).then(
                (out) => {
                    if (!logLine) return;
                    logLine.innerText = out;
                    history?.current?.appendChild(logLine);
                    console.log(input)
                    if(input && input.current)
                        input.current.value = "";
                }
            );
        }
    }, []);

    return (
        <div className="terminal" style={style} onClick={focus}>
            <div className="history" ref={history}>
            </div>
            <div className="input-section">
                {prompt}
                <input
                    type="text"
                    className="input-console"
                    autoFocus
                    onKeyUp={handleKey}
                    onChange={handleKey}
                    ref={input}
                />
            </div>
        </div>
    );
}
