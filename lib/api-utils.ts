import { NextRequest, NextResponse } from 'next/server';

const AUTH_TOKEN = process.env.NEXT_PUBLIC_API_SECRET_TOKEN || process.env.API_SECRET_TOKEN || "hello-my-token";

export function validateAuth(req: NextRequest) {
  const authHeader = req.headers.get('authorization');
  if (!authHeader || authHeader !== `Bearer ${AUTH_TOKEN}`) {
    return false;
  }
  return true;
}

export function unauthorizedResponse() {
  return NextResponse.json({ error: "Unauthorized. Invalid or missing token." }, { status: 401 });
}

export function errorResponse(message: string, status = 500) {
  return NextResponse.json({ error: message }, { status });
}

export function successResponse(data: any, status = 200) {
  return NextResponse.json(data, { status });
}
