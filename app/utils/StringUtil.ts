export function constructThumbnailUrl(baseurl: string, thumbnailurl: string): string {
  if (thumbnailurl.startsWith('//')) {
    return 'https:' + thumbnailurl;
  } else if (thumbnailurl.startsWith('/')) {
    return baseurl + thumbnailurl.slice(1);
  } else {
    return baseurl + thumbnailurl;
  }
}