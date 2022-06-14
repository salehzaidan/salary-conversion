export const CURRENCY_CONVERTER_API = {
  URL: 'https://free.currconv.com/api/v7/convert',
  KEY: import.meta.env.VITE_CURRENCY_CONVERTER_API_KEY,
};

/**
 * Convert list of users salary to mapping from user id to salary.
 * @param salaryList List of users salary.
 * @returns User id to salary mapping object.
 */
export function parseSalaryData(
  salaryList: { salaryInIDR: number; id: number }[]
) {
  const userIdToSalary: { [key: number]: number } = {};
  salaryList.forEach((salaryItem) => {
    userIdToSalary[salaryItem.id] = salaryItem.salaryInIDR;
  });
  return userIdToSalary;
}

export async function fetchCurrencyConversion() {
  try {
    // Construct currency converter API url to get IDR to USD conversion
    const params = new URLSearchParams({
      q: 'IDR_USD',
      compact: 'ultra',
      apiKey: CURRENCY_CONVERTER_API.KEY,
    });
    const url = `${CURRENCY_CONVERTER_API.URL}?${params.toString()}`;

    const response = await fetch(url);
    const data = await response.json();
    return data.IDR_USD;
  } catch (error) {
    console.log(error);
  }
}
