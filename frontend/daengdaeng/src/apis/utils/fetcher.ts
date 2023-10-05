import { reissue } from '../api/member';

export const fetcher = async (
  url: string,
  token: string | undefined = undefined,
  params: any = '',
) => {
  let reqUrl = `${process.env.NEXT_PUBLIC_API_URL}${url}`;
  if (params !== '') {
    reqUrl = `${reqUrl}${params}`;
  }
  let res = await fetch(reqUrl, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  if (res.ok) return await res.json();
  if (res.status === 401) {
    res = await reissue(`${url}`);
    if (res.ok) return await res.json();
  }
  throw new Error(`HTTP error! Status: ${res.status}`);
};
