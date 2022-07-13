type KeyType = '' | 'delete' | 'extra' | 'close';

export type KeyConfig = {
  text?: number | string;
  type?: KeyType;
  color?: string;
  wider?: boolean;
};

export const shuffle = (array: unknown[]) => {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

const genBasicKeys = ({ randomKey }) => {
  const keys = Array(9)
    .fill('')
    .map((_, i) => ({ text: i + 1 }));


  if (randomKey) {
    shuffle(keys);
  }

  return keys
};

export const genCustomKeys = ({ extraKeys, randomKey = false }) => {
  const keys = genBasicKeys({ randomKey }) as KeyConfig[];

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

export const getDefaultKeys = ({ randomKey = false }) => {
  const keys = genBasicKeys({ randomKey }) as KeyConfig[];

  keys.push(
    { text: '', type: 'close' },
    { text: 0 },
    { text: '', type: 'delete' },
  )

  return keys;
}

export const getKeys = (options) => {
  const { theme, extraKey, randomKey = false } = options;
  const extraKeys = extraKey.split(',');

  const config = {
    theme,
    extraKeys,
    randomKey
  };

  if (theme === 'default') {
    return getDefaultKeys(config);
  }

  return  genCustomKeys(config);
}
