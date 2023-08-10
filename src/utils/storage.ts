const storagePrefix = 'tegra_';

const storage = {
  getToken: () => {
    //return JSON.parse(window.sessionStorage.getItem(`${storagePrefix}token`) as string);
    return ''
  },
  setToken: (token: string) => {
    //window.sessionStorage.setItem(`${storagePrefix}token`, JSON.stringify(token));
  },
  clearToken: () => {
    //window.sessionStorage.removeItem(`${storagePrefix}token`);
  },
};

export default storage;