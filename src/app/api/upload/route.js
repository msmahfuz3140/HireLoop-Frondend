import { NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

export async function POST(request) {
    try {
        const formData = await request.formData();
        const file = formData.get('file') || formData.get('image');
        const type = formData.get('type') || 'image';

        if (!file) {
            return NextResponse.json(
                { error: 'No file provided' },
                { status: 400 }
            );
        }

        // Validate file type
        const allowedImageTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        const allowedDocTypes = ['application/pdf'];
        
        if (type === 'resume') {
            if (!allowedDocTypes.includes(file.type)) {
                return NextResponse.json(
                    { error: 'Only PDF files are allowed for resume' },
                    { status: 400 }
                );
            }
            if (file.size > 5 * 1024 * 1024) {
                return NextResponse.json(
                    { error: 'File size must be less than 5MB' },
                    { status: 400 }
                );
            }
        } else {
            if (!allowedImageTypes.includes(file.type)) {
                return NextResponse.json(
                    { error: 'Only image files (JPEG, PNG, GIF, WebP) are allowed' },
                    { status: 400 }
                );
            }
            if (file.size > 2 * 1024 * 1024) {
                return NextResponse.json(
                    { error: 'Image size must be less than 2MB' },
                    { status: 400 }
                );
            }
        }

        const bytes = await file.arrayBuffer();
        const buffer = Buffer.from(bytes);

        // Create unique filename
        const ext = path.extname(file.name) || (type === 'resume' ? '.pdf' : '.jpg');
        const prefix = type === 'resume' ? 'resume' : 'profile';
        const filename = `${prefix}-${Date.now()}-${Math.random().toString(36).substring(2, 8)}${ext}`;
        const uploadDir = path.join(process.cwd(), 'public/uploads');

        // Ensure upload directory exists
        try {
            await mkdir(uploadDir, { recursive: true });
        } catch (e) {
            // directory already exists
        }

        const filePath = path.join(uploadDir, filename);
        await writeFile(filePath, buffer);

        // Return the public URL
        const url = `/uploads/${filename}`;

        return NextResponse.json({ url, success: true });
    } catch (error) {
        console.error('Upload error:', error);
        return NextResponse.json(
            { error: 'Failed to upload file' },
            { status: 500 }
        );
    }
}