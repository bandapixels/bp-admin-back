import * as jwt from 'jsonwebtoken';

function newTokenCreator(phoneEmail) {
  return jwt.sign({
    exp: Math.floor(Date.now() / Number.parseInt(process.env.MS)) + Number.parseInt(process.env.TOKEN_TTL),
    phoneEmail,
  }, process.env.SECRET_KEY);
}

export default newTokenCreator;
