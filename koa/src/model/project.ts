import { Schema } from 'mongoose';

import baseModel from './base';

const projectSchema = new Schema({
  title: {
    type: String,
    require: false
  },
  type: {
    type: String,
    require: false
  },
  description: {
    type: String,
    require: false
  },
  address: {
    type: String,
    require: false
  },
  ...baseModel
});

export default projectSchema;