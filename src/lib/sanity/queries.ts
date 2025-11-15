import groq from "groq";

export const changelogListQuery = groq`{
  "header": {
    "title": coalesce(*[_type == "siteSettings"][0].changelogTitle, "Changelog"),
    "subtitle": *[_type == "siteSettings"][0].changelogSubtitle,
    "socialLinksTitle": *[_type == "siteSettings"][0].socialLinksTitle,
    "socialLinks": coalesce(
      *[_type == "siteSettings"][0].socialLinks[]{
        "id": coalesce(_key, _id),
        "url": url,
        "label": coalesce(label, title, name),
        "iconUrl": icon.asset->url
      },
      []
    )
  },
  "posts": *[_type == "changelogPost"] | order(publishedAt desc){
    "_id": coalesce(_id, slug.current),
    "title": coalesce(title, _title, name),
    "slug": slug.current,
    "excerpt": coalesce(excerpt, summary),
    "publishedAt": coalesce(publishedAt, _createdAt),
    "image": {
      "url": coalesce(coverImage.asset->url, image.asset->url),
      "width": coalesce(coverImage.asset->metadata.dimensions.width, image.asset->metadata.dimensions.width),
      "height": coalesce(coverImage.asset->metadata.dimensions.height, image.asset->metadata.dimensions.height),
      "aspectRatio": coalesce(coverImage.asset->metadata.dimensions.aspectRatio, image.asset->metadata.dimensions.aspectRatio),
      "blurDataURL": coalesce(coverImage.asset->metadata.lqip, image.asset->metadata.lqip),
      "alt": coalesce(coverImage.alt, image.alt, title)
    },
    "authors": coalesce(authors[]->{
      "_id": _id,
      "name": coalesce(name, _title),
      "imageUrl": coalesce(image.asset->url, avatar.asset->url)
    }, []),
  }
}`;

export const changelogPostQuery = groq`*[_type == "changelogPost" && slug.current == $slug][0]{
  "_id": coalesce(_id, slug.current),
  "title": coalesce(title, _title),
  "slug": slug.current,
  "excerpt": coalesce(excerpt, summary),
  "publishedAt": coalesce(publishedAt, _createdAt),
  "ogImage": {
    "url": coalesce(ogImage.asset->url, coverImage.asset->url, image.asset->url),
    "alt": coalesce(ogImage.alt, coverImage.alt, image.alt, title)
  },
  "image": {
    "url": coalesce(coverImage.asset->url, image.asset->url),
    "width": coalesce(coverImage.asset->metadata.dimensions.width, image.asset->metadata.dimensions.width),
    "height": coalesce(coverImage.asset->metadata.dimensions.height, image.asset->metadata.dimensions.height),
    "aspectRatio": coalesce(coverImage.asset->metadata.dimensions.aspectRatio, image.asset->metadata.dimensions.aspectRatio),
    "blurDataURL": coalesce(coverImage.asset->metadata.lqip, image.asset->metadata.lqip),
    "alt": coalesce(coverImage.alt, image.alt, title)
  },
  "authors": coalesce(authors[]->{
    "_id": _id,
    "name": coalesce(name, _title),
    "imageUrl": coalesce(image.asset->url, avatar.asset->url)
  }, []),
  body,
  "nextPost": *[_type == "changelogPost" && publishedAt < ^.publishedAt] | order(publishedAt desc)[0]{
    "title": coalesce(title, _title),
    "slug": slug.current
  }
}`;

export const changelogSlugsQuery = groq`*[_type == "changelogPost" && defined(slug.current)]{
  "slug": slug.current
}`;

export const searchChangelogQuery = groq`*[_type == "changelogPost" && (
  title match $query ||
  _title match $query ||
  excerpt match $query ||
  summary match $query ||
  body[].children[].text match $query
)][0..10]{
  "_id": coalesce(_id, slug.current),
  "title": coalesce(title, _title, name),
  "slug": slug.current,
  "excerpt": coalesce(excerpt, summary),
  "publishedAt": coalesce(publishedAt, _createdAt),
  "image": {
    "url": coalesce(coverImage.asset->url, image.asset->url),
    "width": coalesce(coverImage.asset->metadata.dimensions.width, image.asset->metadata.dimensions.width),
    "height": coalesce(coverImage.asset->metadata.dimensions.height, image.asset->metadata.dimensions.height),
    "aspectRatio": coalesce(coverImage.asset->metadata.dimensions.aspectRatio, image.asset->metadata.dimensions.aspectRatio),
    "blurDataURL": coalesce(coverImage.asset->metadata.lqip, image.asset->metadata.lqip),
    "alt": coalesce(coverImage.alt, image.alt, title)
  },
  "authors": coalesce(authors[]->{
    "_id": _id,
    "name": coalesce(name, _title),
    "imageUrl": coalesce(image.asset->url, avatar.asset->url)
  }, [])
}`;
