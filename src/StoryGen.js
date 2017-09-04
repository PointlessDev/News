import snekfetch from 'snekfetch';

const contents = [
  'Lizards are a widespread group of squamate reptiles, with over 6,000 species, ranging across all continents except Antarctica'
];
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

  return {
    title: title.title,
    author: author.name,
    authorPicture: author.picture.thumbnail,
    url: title.url,
    imageHeight: imageHeight,
    image: `https://lorempixel.com/500/${imageHeight}/?nocache=` + Math.random().toString(36).substr(2),
    content: generateContent(),
    date: new Date(title.pubdate)
  }
}

export function generateContent() {
  return randomItem(contents)
}
export async function generateAuthor() {
  const author = (await snekfetch.get('https://randomuser.me/api/?nat=nz')).body.results[0];
  author.name = capitalize(author.name.first) + ' ' + capitalize(author.name.last);

  return author;
}
export async function generateInfo() {
  if(!infoCache.length)
    infoCache.push(...(await snekfetch.get('https://api2.contentforest.com/blog/clickbaitheadlines')).body);

  return infoCache.shift();
}


function randomItem(array) {
  return array[Math.floor(Math.random() * array.length)];
}
function capitalize(word) {
  return word[0].toUpperCase() + word.substr(1);
}

