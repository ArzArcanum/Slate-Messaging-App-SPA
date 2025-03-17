export default interface Message {
  id: number;
  content: string;
  createdAt: string;
  user: {
    id: string;
    username: string;
  };
}
