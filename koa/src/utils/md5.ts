import crypto from 'crypto';

export default (value: string): string => {
  return crypto.createHash('md5').update(`prefix${value}`).digest('hex');
};
