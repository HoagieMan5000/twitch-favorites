import { useEffect, useState } from "react";
import ChromeStorage from "../util/chrome/ChromeStorage";

export interface ChromeStorageConfig {
  type: "sync" | "local";
  defaultValue?: any;
}

const defaultConfig: ChromeStorageConfig = {
  type: "local",
};

export function useChromeStorageSync<T>(
  key: string,
  config?: ChromeStorageConfig
) {
  const [value, setValue] = useState<T | undefined>(config?.defaultValue);

  const resolvedConfig = {
    ...defaultConfig,
    ...config,
  };

  const storage = new ChromeStorage();

  const fetchValue = async () => {
    const newValue =
      resolvedConfig.type === "local"
        ? await storage.getLocal([key])
        : await storage.getSync([key]);
    setValue(newValue?.[key] ?? resolvedConfig.defaultValue);
  };

  const storeValue = async (newValue: T) => {
    if (resolvedConfig.type === "local") {
      await storage.setLocal({ [key]: newValue });
    } else {
      await storage.setSync({ [key]: newValue });
    }
    setValue(newValue);
  };

  useEffect(() => {
    fetchValue();
  }, []);

  useEffect(() => {
    const listeners: any[] = [];
    const listener = storage.listenToChanges(
      key,
      resolvedConfig.type,
      (data: T) => {
        console.log({ dataChanged: key, data })
        setValue(data);
      }
    );
    listeners.push(listener);

    return () => {
      for (const listener of listeners) {
        storage.removeListener(listener);
      }
    };
  }, []);

  console.log({ value });
  return [value, storeValue] as [T | undefined, (newValue: T) => void];
}
