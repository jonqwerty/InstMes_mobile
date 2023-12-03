import {MMKV} from 'react-native-mmkv';

const StorageMMKV = (() => {
  const storage = new MMKV();

  const getString = (key: string) => {
    const value = storage.getString(key);

    if (value !== null) {
      return value;
    }
  };

  const getNumber = (key: string) => {
    const value = storage.getNumber(key);

    if (value !== null) {
      return value;
    }
  };

  const getBoolean = (key: string) => {
    const value = storage.getBoolean(key);

    if (value !== null) {
      return value;
    }
  };

  // getting all keys
  const getAllKeys = () => {
    const value = storage.getAllKeys();

    if (value !== null) {
      return value;
    }
  };

  const set = (key: string, value: string | number | boolean) => {
    try {
      storage.set(key, value);
    } catch (e) {
      console.log(e);
    }
  };

  // delete a specific key + value
  const deleteItem = (key: string) => {
    storage.delete(key);
  };

  // delete all keys
  const clearAll = () => {
    storage.clearAll();
  };

  return {
    getString,
    getNumber,
    getBoolean,
    getAllKeys,
    set,
    deleteItem,
    clearAll,
  };
})();

export default StorageMMKV;
