import { ipcRenderer } from 'electron';

export const createProxyFunction =
  (key: string) =>
  async (...args: any[]) => {
    const { result, error } = await ipcRenderer.invoke(key, ...args);

    if (error) throw error;

    return result;
  };

export const createProxyListener =
  ({ key, remove }: { key?: string; remove?: string[] }) =>
  async (listener?: (...args: any[]) => void) => {
    if (remove && remove.length > 0) {
      remove.forEach(e => ipcRenderer.removeAllListeners(e));
    } else if (key && listener) {
      ipcRenderer.on(key, (_, ...args) => listener(...args));
    } else {
      throw new Error('No key or listener provided');
    }
  };

export const createObjectProxy = (params: {
  key: string;
  methods: string[];
  prefixArgs?: any[];
}) => {
  const rootProxyObject: any = {};

  const createMethodCall =
    (method: string) =>
    async (...args: any[]) =>
      createProxyFunction(params.key)(
        ...(params.prefixArgs ?? []),
        method,
        ...args,
      );

  for (const method of params.methods) {
    const methodHeirarchy = method.split('.');
    let proxyObj = rootProxyObject;

    for (let i = 0; i < methodHeirarchy.length; i += 1) {
      const isLast = i >= methodHeirarchy.length - 1;
      const currentHeirarchy = methodHeirarchy[i];

      if (!proxyObj[currentHeirarchy]) {
        proxyObj[currentHeirarchy] = {};
      }

      if (isLast) {
        (proxyObj as any)[currentHeirarchy] = createMethodCall(method);
      }

      proxyObj = rootProxyObject[currentHeirarchy];
    }
  }

  return rootProxyObject;
};
