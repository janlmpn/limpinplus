import mongoose from 'mongoose';

import ProjectSchema from './project';
import UserSchema from './user';

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL || '', { dbName: process.env.DATABASE_NAME });
    console.log('mongodb connected db:', process.env.DATABASE_NAME);
  } catch (err) {
    console.error(`mongodb error ${err}`);
  }
}

main();

const Project = mongoose.model('Project', ProjectSchema);
const User = mongoose.model('User', UserSchema);

export { Project, User };