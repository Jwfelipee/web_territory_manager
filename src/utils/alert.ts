type Notify = { title: string; message: string }

export const notify = ({ title, message }: Notify) => alert(`${title}\n${message}`);