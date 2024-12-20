export default function Version() {
  const data = {
    version: import.meta.env.VITE_APP_VERSION || 'undefined',
    env: import.meta.env.MODE,
    timestamp: Date.now()
  };

  return JSON.stringify(data);
}
