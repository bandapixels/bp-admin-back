import * as bcrypt from 'bcrypt';

const saltRounds = bcrypt.genSaltSync(10);

export function hash(password): string {
  return bcrypt.hashSync(password, saltRounds);
}

export function isCorrectPassword(password, hash): boolean {
  return bcrypt.compareSync(password, hash);
}
