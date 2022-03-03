# react-simple-terminal

- Mobile friendly
- Super simplistic
- Stylable
- Fixes tailwind outline border on focus.
- Allows async functions

### Demo
- [agam.me](https://agam.me)

### Install 
`npm install --save react-simple-terminal`

### Usage
```jsx
import { SimpleTerminal } from 'react-simple-terminal'

const App = () => {
  const commands = {
    hello: 'Hello world!',
    'help': (args) => `HELP for args: ${args}`,
    test: async() => (await fetch("https://wtfismyip.com/text")).text()
  }

  return (
      <SimpleTerminal commands={commands} prompt={'$'} style={{ color: '#00ff00' }} />
  )
}
```