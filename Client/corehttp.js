class coreHTTP {
  async get(url) {
    try {
      const response = await fetch(url);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async post(url, requestData) {
    const reqOptions = {
      method: "POST",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(requestData)};
    try {
      const response = await fetch(url, reqOptions);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async put(url, requestData) {
    const reqOptions = {
      method: "PUT",
      headers: {"Content-Type": "application/json"},
      body: JSON.stringify(requestData)};
    try {
      const response = await fetch(url, reqOptions);
      if (response.ok) {
        return await response.json();
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }

  async delete(url, requestData) {
    const reqOptions = {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}};
    try {
      const response = await fetch(url, reqOptions);
      if (response.ok) {
        return {};
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  }
}