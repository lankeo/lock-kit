import { Buffer } from "buffer";
import { readKey, saveKey, transSlice } from "./utils";
import {
  RAW_KEY_FILE,
  SECRET_KEY_FILE,
  SECRET_SLICE_DELIMITER,
  SECRET_SLICE_SIZE,
} from "./config";

export function createLocker(
  callback?: (secretKey: string, secretKeyFile: string) => void
) {
  readKey(RAW_KEY_FILE, fileContent => {
    const secretKey = lock(fileContent);
    saveKey(SECRET_KEY_FILE, secretKey);
    if (typeof callback === "function") {
      callback(secretKey, SECRET_KEY_FILE);
    }
  });
}

function lock(buffer: Buffer) {
  const key = buffer.toString();
  const secretSlices: string[] = [];
  for (let i = 0; i < key.length; i += SECRET_SLICE_SIZE) {
    const secret = Buffer.from(
      transSlice(key.slice(i, i + SECRET_SLICE_SIZE))
    ).toString("base64");
    secretSlices.push(secret);
  }
  const secretKey = Buffer.from(
    secretSlices.join(SECRET_SLICE_DELIMITER)
  ).toString("base64");
  return secretKey;
}

export default createLocker;
