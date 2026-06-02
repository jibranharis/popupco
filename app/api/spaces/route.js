import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { SPACES_DATA } from '@/lib/spaces';

export async function GET() {
  try {
    if (supabase) {
      const { data, error } = await supabase
        .from('spaces')
        .select('*')
        .order('created_at', { ascending: true });
      if (!error && data?.length > 0) {
        return NextResponse.json({ data });
      }
    }
    return NextResponse.json({ data: SPACES_DATA });
  } catch (error) {
    console.error('Failed to fetch spaces:', error);
    return NextResponse.json({ data: SPACES_DATA });
  }
}
