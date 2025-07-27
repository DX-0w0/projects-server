import fs from 'fs'
import path from 'path'
import axios from 'axios'
import { pipeline } from 'stream'
import { promisify } from 'util'
import { fileURLToPath } from 'url'
import * as cheerio from 'cheerio'
import os from 'os'

const streamPipeline = promisify(pipeline)
let saveDir

export const theway = path.join(os.homedir(), 'Downloads', 'images_downloaded')

// Directory to save images
export function createImageFolder() {
  // Current project dir
  const __filename = fileURLToPath(import.meta.url)
  const __dirname = path.dirname(__filename)
  console.log('__dirname', __dirname)

  saveDir = path.join(os.homedir(), 'Downloads', 'images_downloaded')

  // Ensure the folder exists
  if (!fs.existsSync(saveDir)) {
    fs.mkdirSync(saveDir, { recursive: true })
  }
}

export function imageUrlHelper(imageUrl) {
  const newUrl = new URL(imageUrl)

  const parts = newUrl.pathname.split('/')
  const filename = parts.pop()
  const pathnameWithoutFilename = parts.join('/')

  const urlWithoutFilename = `${newUrl.origin}${pathnameWithoutFilename}`
  const extension = path.extname(filename)

  return {
    filename,
    urlWithoutFilename,
    extension,
  }
}

export async function buildImageUrls(url, totalImages) {
  const { urlWithoutFilename, extension } = imageUrlHelper(url)

  const imageUrls = new Array(totalImages)
    .fill(urlWithoutFilename)
    .map((url, i) => `${url}/${i + 1}${extension}`)
  console.log('imageUrls', imageUrls)

  return imageUrls
}

export async function downloadImage(url) {
  try {
    const { filename: FN, extension } = imageUrlHelper(url)
    let filename = FN
    let imageNumber = filename.split('.')[0]
    if (Number(imageNumber) < 10) {
      filename = `0${imageNumber}${extension}`
    }
    const filePath = path.join(saveDir, filename)
    const response = await axios({
      method: 'get',
      url,
      headers: {
        'User-Agent':
          'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
      },
      responseType: 'stream',
    })

    await streamPipeline(response.data, fs.createWriteStream(filePath))
    console.log(`✅ Saved: ${filename}`)
  } catch (err) {
    console.error(`❌ Failed to download from ${url}:`, err.message)
  }
}

export async function downloadAllImages(imageUrls) {
  console.log('🚀 Downloading images...')
  await Promise.all(imageUrls.map((url, index) => downloadImage(url, index)))
  console.log('🎉 All images downloaded.')
}

export async function buildGalleryPageLinks(url) {
  try {
    const response = await axios(url)
    const $ = cheerio.load(response.data)

    const galleryContainer = $('#gdt')
    const links = galleryContainer.find('a')

    const hrefs = links
      .map((i, el) => {
        return $(el).attr('href')
      })
      .get()

    return hrefs
  } catch (error) {
    console.error(`❌ Failed to get links from gallery`, error.message)
    return []
  }
}

export async function buildImageUrlsFromGallery(url) {
  const imageUrls = []
  const links = await buildGalleryPageLinks(url)

  for (const link of links) {
    console.log('link', link)
    try {
      const response = await axios(link)
      const $ = cheerio.load(response.data)
      const img = $('#img').attr('src')
      imageUrls.push(img)
    } catch (error) {
      console.error(`❌ Failed link ${link}`, error.message)
    }
  }

  console.log('imageUrls', imageUrls)
  return imageUrls
}
