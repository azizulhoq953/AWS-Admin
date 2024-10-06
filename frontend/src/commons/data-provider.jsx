

export default class DataProvider {
  constructor(baseUrl = 'http://localhost:8080/api/distributions') {
    this.baseUrl = baseUrl;
  }
  async getData(name) {
    try {
      const response = await fetch(`${this.baseUrl}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          // Add any necessary authentication headers here
        },
      });
  
      if (!response.ok) {
        if (response.status === 404) {
          throw new Error(`Resource not found: ${name}`);
        }
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      const data = await response.json();
      console.log('API response:', data); // Log the response to see its structure
  
      // Assuming the response is like { items: [...] }
      if (data.items && Array.isArray(data.items)) {
        return data.items.map(it => ({ ...it, date: new Date(it.date) }));
      } else {
        throw new Error('Unexpected response structure');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  }
  
}
