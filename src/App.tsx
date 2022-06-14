import { useEffect, useState } from 'react';
import { fetchCurrencyConversion } from './lib/salary';
import { fetchUsers, UserWithSalary } from './lib/user';

function App() {
  const [users, setUsers] = useState<UserWithSalary[]>([]);

  useEffect(() => {
    // Fetch currency conversion first, then fetch users data
    fetchCurrencyConversion().then((conversion) => {
      fetchUsers(conversion).then((users) => {
        setUsers(users!);
      });
    });
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-medium">Salary Conversion</h1>
      <pre>{JSON.stringify(users, null, 2)}</pre>
    </div>
  );
}

export default App;
