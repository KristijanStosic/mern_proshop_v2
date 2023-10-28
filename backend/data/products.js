const products = [
    {
      name: 'Airpods Wireless Bluetooth Headphones',
      image: '/images/airpods.jpg',
      description:
        'Bluetooth technology lets you connect it with compatible devices wirelessly High-quality AAC audio offers immersive listening experience Built-in microphone allows you to take calls while working',
      brand: 'Apple',
      category: 'Electronics',
      model: 'MQ573SX/A',
      price: 89.99,
      countInStock: 10,
      rating: 4,
      numberOfReviews: 3,
      reviews: [
        {
          user: '653d644bb99792647c948cb4',
          name: 'Sheldon Cooper',
          rating: 5,
          comment: 'Absolute perfection of the quality'
        },
        {
          user: '653d645406e2c1be5d089e56',
          name: 'Marry Cooper',
          rating: 3,
          comment: 'Not very good quality'
        },
        {
          user: '653d765a6b69dae9bc9ae687',
          name: 'Missy Cooper',
          rating: 4,
          comment: 'I am satisfied'
        },
      ]
    },
    {
      name: 'iPhone 13 Pro 256GB Memory',
      image: '/images/phone.jpg',
      description:
        'Introducing the iPhone 13 Pro. A transformative triple-camera system that adds tons of capability without complexity. An unprecedented leap in battery life',
      brand: 'Apple',
      category: 'Electronics',
      model: 'GQ371SX/G',
      price: 599.99,
      countInStock: 7,
      rating: 0,
      numberOfReviews: 0,
      createdAt: '01-04-2023',
      reviews: []
    },
    {
      name: 'Cannon EOS 80D DSLR Camera',
      image: '/images/camera.jpg',
      description:
        'Characterized by versatile imaging specs, the Canon EOS 80D further clarifies itself using a pair of robust focusing systems and an intuitive design',
      brand: 'Cannon',
      category: 'Electronics',
      model: 'RT315-RX/41',
      price: 929.99,
      countInStock: 5,
      rating: 3,
      numberOfReviews: 12,
      createdAt: '01-03-2023'
    },
    {
      name: 'Sony Playstation 5',
      image: '/images/playstation.jpg',
      description:
        'The ultimate home entertainment center starts with PlayStation. Whether you are into gaming, HD movies, television, music',
      brand: 'Sony',
      category: 'Electronics',
      model: 'RT315-RX/41',
      price: 399.99,
      countInStock: 11,
      rating: 5,
      numberOfReviews: 12,
      createdAt: '01-02-2023'
    },
    {
      name: 'Logitech G-Series Gaming Mouse',
      image: '/images/mouse.jpg',
      description:
        'Get a better handle on your games with this Logitech LIGHTSYNC gaming mouse. The six programmable buttons allow customization for a smooth playing experience',
      brand: 'Logitech',
      category: 'Electronics',
      model: '981-001083',
      price: 49.99,
      countInStock: 7,
      rating: 3.5,
      numberOfReviews: 10,
      createdAt: '01-01-2023'
    },
    {
      name: 'Amazon Echo Dot 3rd Generation',
      image: '/images/alexa.jpg',
      description:
        'Meet Echo Dot - Our most popular smart speaker with a fabric design. It is our most compact smart speaker that fits perfectly into small space',
      brand: 'Amazon',
      category: 'Electronics',
      model: 'WB AH81/R38',
      price: 29.99,
      countInStock: 0,
      rating: 4,
      numberOfReviews: 12,
      createdAt: '01-08-2023'
    },
  ];
  
  export default products;