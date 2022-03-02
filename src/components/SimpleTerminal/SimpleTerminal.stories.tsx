import React from "react";
import SimpleTerminal from './SimpleTerminal';

export default {
    title: "SimpleTerminal"
};

export const Primary = () => <SimpleTerminal commands={{'help': () => 'HELP!?\n123'}} prompt="$" 
    style={{color: "#00ff00"}} />;

