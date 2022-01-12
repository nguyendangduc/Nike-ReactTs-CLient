const s4 = () => {
  return Math.floor((1 + Math.random()) * 0x10000)
    .toString(16)
    .substring(1);
};

export const generateId = () => {
  return s4() + "-" + s4() + "-" + s4();
};

import { nanoid } from "nanoid";

export function genid(): string {
  return nanoid();
}
