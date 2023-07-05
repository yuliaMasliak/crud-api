export type User = {
  username: string;
  age: number;
  hobbies: string[] | [];
  id: string;
};

export type PostNewUserRequestBody = {
  username: string;
  age: number;
  hobbies: string[] | [];
};
