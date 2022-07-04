import createLocker from "./lock";
import { createUnlocker } from "./unlock";

function init() {
  createLocker((secretKey, secretKeyFile) => {
    console.log("------------------locker------------------");
    console.log(`secretKey: ${secretKey}\nfile: ${secretKeyFile}`);
  });
  createUnlocker((key, rawKeyFile) => {
    console.log("------------------unlocker------------------");
    console.log(`key: ${key}\nfile: ${rawKeyFile}`);
  });
}

init();
