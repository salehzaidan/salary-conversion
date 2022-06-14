import { parseSalaryData } from './salary';

export interface RawUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

export interface UserWithSalary extends RawUser {
  salaryInIDR: number;
  salaryInUSD: number;
}

export const USERS_API_URL = 'http://jsonplaceholder.typicode.com/users';

/**
 * Fetch users data and add salary each user salary information.
 * @param currencyConversion Currency conversion factor.
 * @returns Users data with currency.
 */
export async function fetchUsers(currencyConversion: number) {
  try {
    const response = await fetch(USERS_API_URL);
    const rawUsers: RawUser[] = await response.json();
    const salaryData = await import('../../salary_data.json');
    const userIdToSalary = parseSalaryData(salaryData.array);
    const usersWithSalary: UserWithSalary[] = rawUsers.map((user) => {
      const salaryInIDR = userIdToSalary[user.id];
      return {
        ...user,
        salaryInIDR,
        salaryInUSD: salaryInIDR * currencyConversion,
      };
    });
    return usersWithSalary;
  } catch (error) {
    console.log(error);
  }
}
