export const get = async <T>(
  path: string,
  headers: Record<string, string> = {},
): Promise<T | void> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
  const options = {
    method: 'GET',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error fetching data: ${err.message}`);
    }
  }
};

export const post = async <T, E>(
  path: string,
  body: T,
  headers: Record<string, string> = {},
): Promise<E | void> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
  const options = {
    method: 'POST',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error('Failed to post data');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error fetching data: ${err.message}`);
    }
  }
};

export const put = async <T, E>(
  path: string,
  body: T,
  headers: Record<string, string> = {},
): Promise<E | void> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
  const options = {
    method: 'PUT',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error('Failed to update data');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error updating data: ${err.message}`);
    }
  }
};

export const del = async <E>(
  path: string,
  headers: Record<string, string> = {},
): Promise<E | void> => {
  const url = `${process.env.NEXT_PUBLIC_API_URL}/${path}`;
  const options = {
    method: 'DELETE',
    headers: {
      ...headers,
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error('Failed to delete data');
    }
    const data = await res.json();
    return data;
  } catch (err) {
    if (err instanceof Error) {
      throw new Error(`Error deleting data: ${err.message}`);
    }
  }
};
