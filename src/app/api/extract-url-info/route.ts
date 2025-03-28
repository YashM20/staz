import { NextResponse } from 'next/server'
import * as cheerio from 'cheerio'

function resolveUrl(base: string, relative: string): string {
  try {
    const baseUrl = new URL(base)
    if (relative.startsWith('//')) {
      return `${baseUrl.protocol}${relative}`
    }
    if (relative.startsWith('/')) {
      return `${baseUrl.origin}${relative}`
    }
    if (!relative.startsWith('http')) {
      return new URL(relative, baseUrl.origin).toString()
    }
    return relative
  } catch {
    return relative
  }
}

export async function POST(req: Request) {
  try {
    const { url } = await req.json()
    const baseUrl = new URL(url)
    
    // Fetch the webpage content
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BookmarkBot/1.0)'
      }
    })
    const html = await response.text()
    
    // Parse the HTML
    const $ = cheerio.load(html)
    
    // Extract metadata with fallbacks
    const title = 
      $('meta[property="og:title"]').attr('content') || 
      $('meta[name="twitter:title"]').attr('content') || 
      $('title').text().trim() || 
      ''
                 
    const description = 
      $('meta[property="og:description"]').attr('content') || 
      $('meta[name="twitter:description"]').attr('content') || 
      $('meta[name="description"]').attr('content') || 
      ''
                       
    let image = 
      $('meta[property="og:image"]').attr('content') || 
      $('meta[name="twitter:image"]').attr('content') || 
      ''

    // Handle relative URLs for images
    if (image) {
      image = resolveUrl(url, image)
    }

    let favicon = 
      $('link[rel="icon"]').attr('href') || 
      $('link[rel="shortcut icon"]').attr('href') || 
      `/favicon.ico`

    favicon = resolveUrl(url, favicon)

    const siteName = 
      $('meta[property="og:site_name"]').attr('content') || 
      baseUrl.hostname || 
      ''

    // Determine type based on URL or content
    let type = 'link'
    const ogType = $('meta[property="og:type"]').attr('content')
    
    if (ogType === 'article' || $('article').length > 0) {
      type = 'article'
    } else if (ogType === 'video' || $('video').length > 0 || url.match(/youtube\.com|vimeo\.com|dailymotion\.com/)) {
      type = 'video'
    } else if (ogType === 'image' || url.match(/\.(jpg|jpeg|png|gif)$/i)) {
      type = 'image'
    } else if (url.match(/docs\.google\.com|notion\.so|github\.com/)) {
      type = 'resource'
    }

    // Extract potential tags
    const tags = new Set<string>()
    
    // From keywords meta tag
    const keywords = $('meta[name="keywords"]').attr('content')
    if (keywords) {
      keywords.split(',')
        .map(tag => tag.trim().toLowerCase())
        .filter(Boolean)
        .forEach(tag => tags.add(tag))
    }

    // From article tags
    $('meta[property="article:tag"]').each((_, el) => {
      const tag = $(el).attr('content')
      if (tag) tags.add(tag.toLowerCase())
    })

    return NextResponse.json({
      title,
      description,
      image,
      type,
      tags: Array.from(tags),
      favicon,
      siteName
    })
    
  } catch (error) {
    console.error('Error extracting URL info:', error)
    return NextResponse.json(
      { error: 'Failed to extract URL info' }, 
      { status: 500 }
    )
  }
} 