import { User } from '../models/data-models';

class DataService {
  baseURL: string;

  constructor() {
    this.baseURL = 'http://localhost:3001';
  }

  async getResource<T>(url: string): Promise<T> {
    const res = await fetch(this.baseURL + url);
    if (!res.ok) {
      throw new Error(`Could not fetch ${url}, status ${res.status}`);
    }
    const body = await res.json();
    return body;
  }

  getAllUsers(): Promise<User[]> {
    return this.getResource<User[]>('/users');
  }

  async getSingleUser(id: string): Promise<User> {
    const result = await this.getResource<User[]>(`/users?githubId=${id}`);
    return result[0];
  }
}

export default DataService;

/// usage example
// const [users, setUsers] = useState<User[]>([]);
// const dataService = new DataService();
// dataService
//   .getAllUsers()
//   .then((body) => {
//     setUsers(body || []);
//   })
//   .catch((err) => {
//     console.error(err);
//   });
