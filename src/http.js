export function get(url) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => resolve(xhr.responseText));
    xhr.addEventListener('error', err => reject(err));
    xhr.open('GET', url);
    xhr.send();
  });
}
export async function getJson(url) {
  return JSON.parse(get(url));
}