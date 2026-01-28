import Script from 'next/script';

interface JsonLdProps {
  data: any;
}

export const JsonLd = ({ data }: JsonLdProps) => {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};
