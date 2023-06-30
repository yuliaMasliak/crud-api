const { v4: uuidv4 } = require('uuid');
import { User, PostNewUserRequestBody } from './models';
import { users } from './dataBase';

export class processData {
  getAllUsers(): User[] {
    return users;
  }
  getUserById(id: string): User | undefined {
    const user = users.find((user) => user.id === id);
    return user;
  }

  createNewUser(body: PostNewUserRequestBody) {
    const id = uuidv4();
    const newUser = { ...body, id };
    users.push(newUser);
    return newUser;
  }

  updateUser(id: string, body: PostNewUserRequestBody): void {
    users.forEach((user) => {
      if (user.id === id) {
        user.username = body.username;
        user.age = body.age;
        user.hobbies = body.hobbies;
      }
    });
  }
  deleteUser(id: string) {
    users.forEach((user, i) => {
      if (user.id === id) {
        users.splice(i, 1);
      }
    });
  }
}
