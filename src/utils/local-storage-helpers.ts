import { deHash, hash } from "./functions";

export function localstorageGet<T>(
  key: string,
  options?: { isObject: boolean }
): string | T | null {
  const item = localStorage.getItem(key);
  if (!item) {
    return "";
  }
  const decryptedItem = deHash(item);

  if (options?.isObject) {
    const itemAsObject = JSON.parse(decryptedItem) as T;

    return itemAsObject;
  }
  return decryptedItem;
}

export function localstorageSet(
  key: string,
  value: string | object,
  encrypt: boolean = true
) {
  if (typeof value !== "string") {
    const valueAsString = JSON.stringify(value);
    const encryptedItem = hash(valueAsString);

    localStorage.setItem(key, encrypt ? encryptedItem : valueAsString);

    return;
  }
  localStorage.setItem(key, encrypt ? hash(value as string) : value);
}
