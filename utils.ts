import * as fs from "fs";
import { Buffer } from "buffer";

export function readKey(path: string, callback: (content: Buffer) => void) {
  const content = fs.readFileSync(path);
  callback(content);
}

export function saveKey(path: string, key: string) {
  fs.writeFileSync(path, key);
}

export function transSlice(slice: string) {
  if (/[A-Z]/.test(slice)) {
    return slice.slice(0, 1).toLowerCase() + slice.slice(1);
  }
  if (/[a-z]/.test(slice)) {
    return slice.slice(0, 1).toUpperCase() + slice.slice(1);
  }
  return slice;
}
