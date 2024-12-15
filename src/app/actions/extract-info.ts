'use server'

import { load } from 'cheerio'

interface ExtractedInfo {
  url: string
  title: string | null
  description: string | null
  image: string | null
  type: 'link' | 'article' | 'resource' | 'note' | 'image' | 'video'
  tags: string[]
  favicon: string | null
  siteName: string | null
}

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

export async function extractUrlInfo(url: string): Promise<ExtractedInfo> {
  try {
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (compatible; BookmarkBot/1.0)'
      }
    })
    const html = await response.text()
    const $ = load(html)
    const baseUrl = new URL(url)

    // Extract metadata with fallbacks
    const title = 
      $('meta[property="og:title"]').attr('content') || 
      $('meta[name="twitter:title"]').attr('content') || 
      $('title').text().trim() || 
      null

    const description = 
      $('meta[property="og:description"]').attr('content') || 
      $('meta[name="twitter:description"]').attr('content') || 
      $('meta[name="description"]').attr('content') || 
      null

    let image = 
      $('meta[property="og:image"]').attr('content') || 
      $('meta[name="twitter:image"]').attr('content') || 
      null

    if (image) {
      image = resolveUrl(url, image)
    }

    const siteName = 
      $('meta[property="og:site_name"]').attr('content') || 
      baseUrl.hostname || 
      null

    let favicon = 
      $('link[rel="icon"]').attr('href') || 
      $('link[rel="shortcut icon"]').attr('href') || 
      `/favicon.ico`

    favicon = resolveUrl(url, favicon)

    // Determine content type
    let type: ExtractedInfo['type'] = 'link'
    
    const ogType = $('meta[property="og:type"]').attr('content')
    if (ogType === 'article' || $('article').length > 0) {
      type = 'article'
    } else if (ogType === 'video' || $('video').length > 0 || url.match(/youtube\.com|vimeo\.com|dailymotion\.com/)) {
      type = 'video'
    } else if (ogType === 'image' || image) {
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

    return {
      url,
      title,
      description,
      image,
      type,
      tags: Array.from(tags),
      favicon,
      siteName
    }
  } catch (error) {
    console.error('Error extracting URL info:', error)
    return {
      url,
      title: null,
      description: null,
      image: null,
      type: 'link',
      tags: [],
      favicon: null,
      siteName: null
    }
  }
} 