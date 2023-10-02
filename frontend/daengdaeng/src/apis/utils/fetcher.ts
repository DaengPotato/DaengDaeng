export const fetcher = async (
  url: string,
  token: string | undefined = undefined,
  params = undefined,
) => {
  let reqUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  if (params) {
    const queryString = new URLSearchParams(params).toString();
    reqUrl = `${reqUrl}?${queryString}`;
  }
  const res = await fetch(reqUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) return await res.json();
  throw new Error(`HTTP error! Status: ${res.status}`);
};
