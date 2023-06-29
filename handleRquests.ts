const { v4: uuidv4 } = require('uuid');
import { User, PostNewUserRequestBody } from './models';
import { users } from './dataBase';

export class handleRquest {
  getAllUsers(): User[] {
    return users;
  }
  getUserById(id: string): User | undefined {
    const user = users.find((user) => (user.id = id));
    return user;
  }

  createNewUser(body: PostNewUserRequestBody) {
    const id = uuidv4();
    const newUser = { ...body, id };
    users.push(newUser);
    return newUser;
  }
}
