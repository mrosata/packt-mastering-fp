/**
 * State (Stored in LocalStorage)
 * {
 *   title: str
 *   slides: [ SlideObjects ]
 * }
 */
export default {
  title: "Packt Pub Slideshow",
  slides: [
    {
      id: 1,
      order: 0,
      title: 'Welcome to the Amazing Presentation',
      html: '<h3 class="lead">This presentation is brought to you by <small>Functional Programming and Packt Publishing</small></h3>',
      text: 'Enjoy! Copyright 2017',
      img: {
        src: 'img/slide-one.png',
        alt: 'An amazing presentation',
      }
    },
    {
      id: 2,
      title: 'I/O Here We Go!',
      text: 'Input and Output are what make the world go round.',
      style: {
        background: '#4C5F6B',
        color: '#DBE4EE',
      },
    }, {
      id: 4,
      title: 'Thanks for attending the Input/Output paradox presentation!',
      html: '<p>This is the final slide I am afraid</p>',
      style: {
        background: '#FB4D3D',
        color: '#DBE4EE',
      },
    },
    {
      id: 2,
      title: 'I/O Here We Go!',
      order: 3,
      html: `<ul>
               <li>Nobody knows where "input" comes from</li>
               <li>But if we analyze Input, we see the word "put"</li>
             </ul>`,
      text: 'Input and Output are what make the world go round.',
      style: {
        background: '#4C5F6B',
        color: '#DBE4EE',
      },
    },
    {
      id: 2,
      title: 'I/O Here We Go!',
      order: 1,
      html: `<ul>
               <li>Nobody knows where "input" comes from</li>
             </ul>`,
      text: 'Input and Output are what make the world go round.',
      style: {
        background: '#4C5F6B',
        color: '#DBE4EE',
      },
    },
    {
      id: 1,
      order: 1,
      title: 'Welcome to the Amazing Presentation',
      html: '<h3 class="lead">This presentation is brought to you by <small>Functional Programming and Packt Publishing</small></h3>',
      text: 'Enjoy! Copyright 2017',
      img: {
        src: 'img/slide-one.png',
        alt: 'An amazing presentation',
      },
      style: {
        background: '#f5f0f0',
        color: '#333',
      },
    },
    {
      id: 3,
      order: 1,
      title: 'Third Slide',
      html: '<p>I ran out of reliable information for this story</p>',
      style: {
        background: '#00838f',
        color: '#dad3df',
      }
    },
    {
      id: 2,
      title: 'I/O Here We Go!',
      order: 2,
      html: `<ul>
               <li>Nobody knows where "input" comes from</li>
               <li>But if we analyze Input, we see the word "put"</li>
               <li>We see that Input is related to Output. We can prove this by: <pre>In + ( Output - Out ) = Input!</pre></li>
             </ul>`,
      text: 'Input and Output are what make the world go round.',
      style: {
        background: '#00838f',
        color: '#dad3df',
      },
    },
  ],
}
