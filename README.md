# adaptive-huffman
> A simple implementation of adaptive huffman coding algorithm in Javascript


## Usage (only encoding)

```js
import HuffCoder from './dist/AdaptiveHuff'

const huffcoder = new HuffCoder()
huffcoder.encode('a') // 001100001
// NOTE:The first 0 represent that this is a new symbol not transferred yet
huffcoder.encode('a') // 1
huffcoder.encode('d') // 001100100
huffcoder.encode('c') // 001100011
huffcoder.encode('c') // 001
```


