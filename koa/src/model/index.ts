import mongoose from 'mongoose';

import ProjectSchema from './project';
import UserSchema from './user';

async function main() {
  try {
    await mongoose.connect(process.env.DATABASE_URL || '');
    console.log('mongodb connected');
  } catch (err) {
    console.error(`mongodb error ${err}`);
  }
}

main();

const Project = mongoose.model('Project', ProjectSchema);
const User = mongoose.model('User', UserSchema);

export { Project, User };