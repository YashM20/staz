import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

export async function POST(req: Request) {
  try {
    const { url } = await req.json()
    const baseUrl = new URL(url).origin
    
    // Fetch the webpage content
    const response = await fetch(url)
    const html = await response.text()
    
    // Parse the HTML
    const $ = cheerio.load(html)
    
    // Extract metadata
    const title = $('meta[property="og:title"]').attr('content') || 
                 $('title').text() || 
                 ''
                 
    const description = $('meta[property="og:description"]').attr('content') || 
                       $('meta[name="description"]').attr('content') || 
                       ''
                       
    let image = $('meta[property="og:image"]').attr('content') || 
                $('link[rel="icon"]').attr('href') ||
                ''

    // Handle relative URLs for images
    if (image && !image.startsWith('http')) {
      image = image.startsWith('/') 
        ? `${baseUrl}${image}`
        : `${baseUrl}/${image}`
    }

    // Determine type based on URL or content
    let type = 'link'
    if (url.match(/\.(jpg|jpeg|png|gif)$/i)) {
      type = 'image'
    } else if (url.match(/\.(mp4|webm|ogg)$/i)) {
      type = 'video'
    } else if ($('article').length > 0) {
      type = 'article'
    }

    // Extract potential tags from keywords meta tag
    const keywords = $('meta[name="keywords"]').attr('content')
    const tags = keywords ? 
      keywords.split(',').map(tag => tag.trim()).filter(Boolean) : 
      []

    return NextResponse.json({
      title,
      description,
      image,
      type,
      tags
    })
    
  } catch (error) {
    console.error('Error extracting URL info:', error)
    return NextResponse.json({ error: 'Failed to extract URL info' }, { status: 500 })
  }
} 