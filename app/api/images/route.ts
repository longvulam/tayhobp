import { NextRequest, NextResponse } from 'next/server';

import { promises as fs } from 'fs'
import path from 'path'

export const getImageFiles = async () => {
    const imageDirectory = path.join(process.cwd(), '/public/assets/gallery');
    const imageFilenames = await fs.readdir(imageDirectory)
    console.log(imageFilenames)

    return imageFilenames;
}
export async function GET(request: NextRequest) {
    const imageDirectory = path.join(process.cwd(), '/public/assets/gallery');
    const imageFilenames = await fs.readdir(imageDirectory)

    return new NextResponse(JSON.stringify(imageFilenames));
}
