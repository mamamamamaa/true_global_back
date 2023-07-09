import { User } from '../schemas/user.entity';

export type UserProperties = {
  [K in keyof User]?: User[K];
};
