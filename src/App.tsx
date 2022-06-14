import { useEffect, useState } from 'react';
import { fetchCurrencyConversion } from './lib/salary';
import { fetchUsers, UserWithSalary, userFields } from './lib/user';

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

  const usersTable = (
    <table className="text-sm whitespace-nowrap">
      <thead className="bg-black text-white">
        <tr>
          {Object.values(userFields).map((field) => (
            <th className="border px-4 border-slate-600" key={field}>
              {field}
            </th>
          ))}
        </tr>
      </thead>

      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            {Object.entries(user).map(
              ([key, value], idx) =>
                Object.keys(userFields).includes(key) && (
                  <td className="border px-4 border-slate-300" key={idx}>
                    {value}
                  </td>
                )
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl font-medium mb-8">Salary Conversion</h1>
      {users.length > 0 ? (
        <div className="overflow-x-auto">{usersTable}</div>
      ) : (
        <p>Loading</p>
      )}
    </div>
  );
}

export default App;
