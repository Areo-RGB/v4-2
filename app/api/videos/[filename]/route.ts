import { promises as fs } from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(
  request: NextRequest,
  { params }: { params: { filename: string } }
) {
  try {
    const { filename } = params
    const videosDirectory = path.join(process.cwd(), 'videos')
    const filePath = path.join(videosDirectory, filename)
    
    // Check if file exists
    try {
      await fs.access(filePath)
    } catch {
      return NextResponse.json(
        { error: 'Video not found' },
        { status: 404 }
      )
    }
    
    // Read the file
    const content = await fs.readFile(filePath, 'utf8')
    
    // Parse the JSON
    const data = JSON.parse(content)
    
    return NextResponse.json(data)
  } catch (error) {
    console.error('Error reading video file:', error)
    return NextResponse.json(
      { error: 'Failed to read video file' },
      { status: 500 }
    )
  }
} 