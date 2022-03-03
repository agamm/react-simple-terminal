import React from "react";
import SimpleTerminal from './SimpleTerminal';

export default {
    title: "SimpleTerminal"
};

export const Primary = () => <SimpleTerminal commands={
    {
        'str': 'Test?',
        'help': (args) => `HELP for args: ${args}`,
        'test': async() => (await fetch("https://wtfismyip.com/text")).text()
    }} 
    prompt="$" 
    style={{color: "#00ff00"}} />;

