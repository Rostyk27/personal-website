export const seoData = (title: string, slug: string, desc: string) => {
  return {
    title: title,
    description: desc,
    openGraph: {
      title: title + ' - rostyk.dev',
      description: desc,
      url: 'https://rostyk.dev' + slug,
      siteName: 'rostyk.dev',
      type: 'website',
      images: [
        {
          url: 'https://rostyk.dev/og.png',
          width: 1920,
          height: 1080,
        },
      ],
    },
  };
};
