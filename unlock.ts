import * as fs from "fs";
import { Buffer } from "buffer";
import { readKey, transSlice } from "./utils";
import {
  RAW_KEY_FILE,
  SECRET_KEY_FILE,
  SECRET_SLICE_DELIMITER,
} from "./config";

export function createUnlocker(
  callback?: (key: string, rawKeyFile: string) => void
) {
  readKey(SECRET_KEY_FILE, content => {
    const key = parseSecretKey(content);
    if (typeof callback === "function") {
      callback(key, RAW_KEY_FILE);
    }
  });
}

function parseSecretKey(content: Buffer) {
  let key = "";
  const secretKeySlices = Buffer.from(content.toString(), "base64")
    .toString()
    .split(SECRET_SLICE_DELIMITER);
  secretKeySlices.forEach(secret => {
    const middle = Buffer.from(secret, "base64").toString();
    key += transSlice(middle);
  });
  return key;
}

export default createUnlocker;
