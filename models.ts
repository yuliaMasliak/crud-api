export type User = {
  id: string;
  username: string;
  age: number;
  hobbies: string[] | [];
};

export type PostNewUserRequestBody = {
  username: string;
  age: number;
  hobbies: string[] | [];
};
