type KeyType = '' | 'delete' | 'extra' | 'close';

export type KeyConfig = {
  text?: number;
  type?: KeyType;
  color?: string;
  wider?: boolean;
};

const genBasicKeys = () => {
  const keys = Array(9)
    .fill('')
    .map((_, i) => ({ text: i + 1 }));

  return keys;
};

export const genCustomKeys = ({ extraKey }) => {
  const keys = genBasicKeys() as KeyConfig[];
  const extraKeys = Array.isArray(extraKey) ? extraKey : [extraKey];

  if (extraKeys.length === 1) {
    keys.push({ text: 0, wider: true }, { text: extraKeys[0], type: 'extra' });
  } else if (extraKeys.length === 2) {
    keys.push(
      { text: extraKeys[0], type: 'extra' },
      { text: 0 },
      { text: extraKeys[1], type: 'extra' }
    );
  }

  return keys;
};
