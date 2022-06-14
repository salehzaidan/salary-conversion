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

export interface UserWithSalary {
  id: number;
  name: string;
  username: string;
  email: string;
  address: string;
  phone: string;
  salaryInIDR: string;
  salaryInUSD: string;
}

export const userFields = {
  id: 'ID',
  name: 'Name',
  username: 'Username',
  email: 'Email',
  address: 'Address',
  phone: 'Phone',
  salaryInIDR: 'Salary (IDR)',
  salaryInUSD: 'Salary (USD)',
};

export const USERS_API_URL = 'http://jsonplaceholder.typicode.com/users';

/**
 * Parse user address to user-friendly format.
 * @param address Address object from user data.
 * @returns Address string.
 */
export function parseAddress(address: RawUser['address']) {
  return `${address.street} ${address.suite} ${address.city} ${address.zipcode}`;
}

/**
 * Parse salary to user-friendly format.
 * @param salary Raw salary value.
 * @param currency Currency format (IDR | USD).
 * @returns Formatted salary string value.
 */
export function parseSalary(salary: number, currency: 'IDR' | 'USD') {
  const locale = {
    IDR: 'id-ID',
    USD: 'en-US',
  };
  return new Intl.NumberFormat(locale[currency], {
    style: 'currency',
    currency,
  }).format(salary);
}

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
        id: user.id,
        name: user.name,
        username: user.username,
        email: user.email,
        address: parseAddress(user.address),
        phone: user.phone,
        salaryInIDR: parseSalary(salaryInIDR, 'IDR'),
        salaryInUSD: parseSalary(salaryInIDR * currencyConversion, 'USD'),
      };
    });
    return usersWithSalary;
  } catch (error) {
    console.log(error);
  }
}
