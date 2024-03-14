'use server';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '../../../pages/api/auth/[...nextauth]';
const BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/v1/`;

export const createRequest = async (
  session: any,
  path: string,
  apiOps: { tag?: string; method: string } = { method: 'GET' },
  body: object | FormData | null = null
) => {
  const { method, tag } = apiOps;
  if (!session) {
    redirect('/login');
  }
  const token = session.user.accessToken;
  let resBody;
  try {
    const headers = {
      ...(body instanceof FormData
        ? {}
        : { 'Content-Type': 'application/json' }),
      Authorization: 'Bearer ' + token,
    };

    let options: RequestInit = {
      method,
      headers,
      ...(body
        ? { body: body instanceof FormData ? body : JSON.stringify(body) }
        : {}),
    };
    let url = BASE_URL;
    if (['restaurant-signup', 'login'].includes(path)) {
      url += 'auth';
    } else {
      url += 'restaurants';
    }
    if (tag) {
      options.next = {
        tags: [tag],
        revalidate: 3600,
      };
    }
    const res = await fetch(`${url}/${path}`, options);
    const response = res.status === 204 ? {} : await res.json();
    resBody = {
      response,
      success: res.ok,
      status: res.status,
      redirectToLogin: [
        'Session is expired.',
        'Failed to authenticate',
      ].includes(response.message),
    };
  } catch (err) {
    console.log('🚀 ~ err:', err);
    return {
      success: false,
      status: 500,
      redirectToLogin: false,
      response: {
        message: 'Something went wrong. Try again later',
      },
    };
  }
  if (resBody.redirectToLogin) {
    redirect('/login');
  }
  return resBody;
};

export const getNextAuthSS = async () => {
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/login');
  }
  return session;
};
