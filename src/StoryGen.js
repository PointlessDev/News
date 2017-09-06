import {getJson} from "./http";

const imageHeight = 300;

const infoCache = [];


export async function generateStories(amount) {
  let list = [];
  for(let i = 0; i < amount; i++) {
    list.push(await generateStory());
  }
  return list;
}

export async function generateStory() {
  const title = await generateInfo();
  const author = await generateAuthor();
  const imageUrl = `https://lorempixel.com/500/${imageHeight}/?nocache=` + Math.random().toString(36).substr(2);

  await loadImage(imageUrl);

  return {
    title: title.title,
    author: author.name,
    authorPicture: author.picture.thumbnail,
    url: title.url,
    imageHeight: imageHeight,
    imageUrl: imageUrl,
    date: new Date(title.pubdate)
  }
}

export async function generateAuthor() {
  const author = (await getJson('https://randomuser.me/api/?nat=nz')).body.results[0];
  author.name = capitalize(author.name.first) + ' ' + capitalize(author.name.last);

  return author;
}
export async function generateInfo() {
  if(!infoCache.length)
    infoCache.push(...(await getJson('https://api2.contentforest.com/blog/clickbaitheadlines')).body);

  return infoCache.shift();
}

function capitalize(word) {
  return word[0].toUpperCase() + word.substr(1);
}


function loadImage(url) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = url;
    image.addEventListener('load', () => resolve());
    image.addEventListener('error', () => reject());
  })
}
