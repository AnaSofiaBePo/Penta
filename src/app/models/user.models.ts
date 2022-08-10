export interface UserI {
  name: string;
  email: string;
  uid?: string;
  id: string;
  password: string;
  profile: 'admin' | 'user';
  profilePhoto?: string;
}
