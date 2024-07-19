import { NextRequest, NextResponse } from 'next/server';
import sharp from 'sharp';

export async function POST(req: NextRequest) {
  const { image } = await req.json();

  try {
    const buffer = Buffer.from(image.replace(/^data:image\/\w+;base64,/, ''), 'base64');
    const engravedImage = await sharp(buffer).greyscale().toBuffer();

    return NextResponse.json({ image: `data:image/png;base64,${engravedImage.toString('base64')}` });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process image' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 });
}
