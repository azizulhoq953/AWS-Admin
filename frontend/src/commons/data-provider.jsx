export default class DataProvider {
  constructor(baseUrl = 'http://localhost:8080/api/distributions') {
    this.baseUrl = baseUrl;
  }

  async getData(name, { pageIndex, pageSize }) {
    try {
      const response = await fetch(`${this.baseUrl}?pageIndex=${pageIndex}&size=${pageSize}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Resource not found: ${name}`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('API response:', data);

      return {
        items: data.items.map(it => ({ ...it, date: new Date(it.date) })),
        totalCount: data.totalCount,
        pagesCount: data.pagesCount,
        pageIndex: data.pageIndex
      };
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
}