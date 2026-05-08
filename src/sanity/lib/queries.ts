export const postsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  categories,
  mainImage
}`;

export const postSlugsQuery = `*[_type == "post" && defined(slug.current)] {
  "slug": slug.current
}`;

export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] {
  _id,
  title,
  "slug": slug.current,
  excerpt,
  publishedAt,
  categories,
  mainImage,
  body
}`;
