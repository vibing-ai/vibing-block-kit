import React from 'react';
import ImageBlock from '../src/blocks/media-block/ImageBlock';

const ImageBlockExample = () => {
  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem', fontFamily: 'sans-serif' }}>
      <h1>ImageBlock Examples</h1>
      
      <section style={{ marginBottom: '3rem' }}>
        <h2>Basic Image</h2>
        <ImageBlock
          id="basic-image"
          src="https://picsum.photos/800/450"
          alt="A beautiful landscape"
          width={800}
          height={450}
        />
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Image with Border and Shadow</h2>
        <ImageBlock
          id="styled-image"
          src="https://picsum.photos/800/500"
          alt="Styled image with border and shadow"
          width={800}
          height={500}
          borderRadius="lg"
          shadow="lg"
          hasBorder
        />
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2>Rounded Image</h2>
        <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
          <div>
            <h3>Small</h3>
            <ImageBlock
              id="rounded-sm"
              src="https://picsum.photos/300/300"
              alt="Small rounded image"
              width={200}
              height={200}
              borderRadius="sm"
            />
          </div>
          <div>
            <h3>Medium</h3>
            <ImageBlock
              id="rounded-md"
              src="https://picsum.photos/300/300"
              alt="Medium rounded image"
              width={200}
              height={200}
              borderRadius="md"
            />
          </div>
          <div>
            <h3>Large</h3>
            <ImageBlock
              id="rounded-lg"
              src="https://picsum.photos/300/300"
              alt="Large rounded image"
              width={200}
              height={200}
              borderRadius="lg"
            />
          </div>
          <div>
            <h3>Full Circle</h3>
            <ImageBlock
              id="rounded-full"
              src="https://picsum.photos/300/300"
              alt="Circular image"
              width={200}
              height={200}
              borderRadius="full"
            />
          </div>
        </div>
      </section>


      <section>
        <h2>Image with Custom Border Radius</h2>
        <ImageBlock
          id="custom-radius"
          src="https://picsum.photos/800/400"
          alt="Image with custom border radius"
          width={800}
          height={400}
          borderRadius={20}
          hasBorder
        />
      </section>
    </div>
  );
};

export default ImageBlockExample;
