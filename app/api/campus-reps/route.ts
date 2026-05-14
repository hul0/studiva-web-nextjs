import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/utils/supabase';
import { validateAuth, unauthorizedResponse, errorResponse, successResponse } from '@/lib/api-utils';

export async function GET(req: NextRequest) {
  if (!validateAuth(req)) return unauthorizedResponse();

  const { data, error } = await supabase
    .from('campus_representative_applications')
    .select('*')
    .order('created_at', { ascending: false });

  if (error) return errorResponse(error.message);
  return successResponse(data);
}

export async function POST(req: NextRequest) {
  if (!validateAuth(req)) return unauthorizedResponse();

  try {
    const body = await req.json();
    const { data, error } = await supabase
      .from('campus_representative_applications')
      .insert([body]);

    if (error) return errorResponse(error.message);
    return successResponse({ message: "Success", data }, 201);
  } catch (err) {
    return errorResponse("Invalid request body", 400);
  }
}
