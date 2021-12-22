import bcrypt from 'bcrypt';

export const hash = (data: string): string => {
  return bcrypt.hashSync(data, 10);
};

export const compareEncrypted = (data: string, encrypted: string): boolean => {
  return bcrypt.compareSync(data, encrypted);
};
