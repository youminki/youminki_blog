export const PERSONAL_INFO = {
  name: '유민기',
  title: '프론트엔드 개발자',
  email: 'dbalsrl7648@gmail.com',
  phone: '010-5351-7648',
  location: '경기도 안양시',
  profileImage: '/면접사진.jpeg',
  summary: '클론코딩이 취미인 개발자입니다.',
  quote: '"클론코딩이 취미인 개발자입니다."',
} as const;

export const CONTACT_INFO = {
  email: 'dbalsrl7648@gmail.com',
  phone: '010-5351-7648',
  github: 'https://github.com/youminki',
  blog: 'https://velog.io/@youminki/posts',
  location: '경기도 안양시',
} as const;

export const SOCIAL_LINKS = {
  github: {
    url: 'https://github.com/youminki',
    label: '깃허브',
  },
  blog: {
    url: 'https://velog.io/@youminki/posts',
    label: '블로그',
  },
  email: {
    url: 'mailto:dbalsrl7648@gmail.com',
    label: 'Email Contact',
  },
} as const;
