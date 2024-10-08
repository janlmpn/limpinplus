import { Schema } from 'mongoose';

import baseModel from './base';
import md5 from '../utils/md5';

const userSchema = new Schema({
  username: {
    type: String,
    require: true
  },
  name: {
    type: String,
    require: true
  },
  phone: {
    type: String,
    require: false
  },
  email: {
    type: String,
    require: true
  },
  password: {
    type: String,
    required: true,
    set: (value: string) => md5(value),
    select: false
  },
  ...baseModel
});

export default userSchema;
