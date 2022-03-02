# react-simple-terminal

- Mobile friendly
- Super simplistic
- Stylable
- Fixes tailwind outline border on focus.

### Install 
`npm install --save @agamm/react-simple-terminal`

### Usage
```jsx
import { SimpleTerminal } from '@agamm/react-simple-terminal'


const commands = {
    help: () => `Initialized commands: help, ls`,
    ls: () => 'Try using `help`, you hacker...',
  }

  return (
    <div className="hero">
      <SimpleTerminal commands={commands} prompt={'$'} style={{ color: '#00ff00' }} />
```