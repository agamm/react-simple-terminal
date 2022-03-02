import React, { useEffect, useCallback, useRef } from "react";


type CommandFunc = ((arg: string[]) => string) | (() => string)
interface Commands {
    [key: string]: CommandFunc | String;
}

type CSS = { [key: string]: React.CSSProperties };

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
    prompt,
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
                    history.current.textContent = "";
                return ""
            },
        };
    }, []);

    // Auto focus
    useEffect(() => {
        input?.current?.focus();
    }, []);

    // Handle new command sent
    const handleKey = useCallback((e) => {
        if (e.target.name === "Enter") {
            const cmd = e.target.value;
            const logLine: HTMLParagraphElement = document.createElement("p");
            generateOutput(mergedCommands, cmd, cmd.split(" ").slice(1)).then(
                (out) => {
                    if (!logLine) return;
                    logLine.innerText = out;
                    history?.current?.appendChild(logLine);
                    if(input && input.current)
                        input.current.textContent = "";
                }
            );
        }
    }, []);

    return (
        <div className="terminal" style={style}>
            <div className="history" ref={history}>
                123
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
