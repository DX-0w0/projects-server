import {
  createImageFolder,
  buildImageUrls,
  downloadAllImages,
  buildImageUrlsFromGallery,
} from './src/utils/downloadImages.js'

// Change url and totalImages according to the need
const url = 'https://www.xyz.com/abc/1.jpg'
const totalImages = 3
const galleryUrl = 'https://www.xyz.org/g/123/'

async function run() {
  createImageFolder()

  // const imageUrls = await buildImageUrls(url, totalImages)
  // const imageUrls = await buildImageUrlsFromGallery(galleryUrl)

  // downloadAllImages(imageUrls)
}

run()
