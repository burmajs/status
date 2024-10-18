## status

### Install

```bash
npm i @burmajs/status
```

```bash
pnpm i @burmajs/status
```

### Example

#### ESM

```ts
import Status from "@burmajs/status";

// new instance
const status = new Status({ inputType: "code", value: 500 });
// get message for 500
const msg = status.message; // internal server error
// set message "Not Found" to get code, auto removed code value set before.
status.message = "Not Found"; // 404
```

#### Common Js

```Js
const Status = require("@burmajs/status");

const status = new Status({ inputType: "code", value: 404 });

console.log(status.message); // not found

```
