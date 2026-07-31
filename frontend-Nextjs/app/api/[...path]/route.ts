import { NextRequest, NextResponse } from 'next/server';

const API_URL = process.env.API_URL || 'http://130.210.11.179:8080';

async function handleProxy(
  request: NextRequest,
  context: { params: Promise<{ path: string[] }> }
) {
  const { path } = await context.params;
  const pathString = path.join('/');
  const search = request.nextUrl.search;
  const targetUrl = `${API_URL}/api/${pathString}${search}`;

  try {
    const headers = new Headers(request.headers);
    headers.delete('host');
    headers.delete('connection');

    const method = request.method;
    const hasBody = !['GET', 'HEAD'].includes(method);
    const body = hasBody ? await request.blob() : undefined;

    const response = await fetch(targetUrl, {
      method,
      headers,
      body,
      cache: 'no-store',
    });

    const responseData = await response.arrayBuffer();
    const responseHeaders = new Headers(response.headers);
    responseHeaders.delete('content-encoding');

    return new NextResponse(responseData, {
      status: response.status,
      statusText: response.statusText,
      headers: responseHeaders,
    });
  } catch (error: any) {
    console.error(`[API Proxy Error] Target: ${targetUrl}`, error);
    return NextResponse.json(
      {
        error: 'Backend Unreachable',
        message: `Could not connect to Spring Boot backend at ${API_URL}. Make sure your backend server is running and port 8080 is open to the internet.`,
        details: error?.message || String(error),
      },
      { status: 502 }
    );
  }
}

export const GET = handleProxy;
export const POST = handleProxy;
export const PUT = handleProxy;
export const PATCH = handleProxy;
export const DELETE = handleProxy;
export const OPTIONS = handleProxy;
