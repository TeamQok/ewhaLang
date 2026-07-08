const users = [
  {
    userId: "user1",
    nickname: "John Doe",
    profilePhoto: "https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160",
    country: "미국",
    gender: "남성",
    birthdate: "1996",
    major: "컴퓨터 공학",
    languages: [
      { language: "한국어", level: "원어민" },
      { language: "영어", level: "상급" },
      { language: "일본어", level: "기초" }
    ],
    chatIds: ['1', '2', '3'],
    email: "john.doe@ewhain.net",
    isValidated: true
  },
  {
    userId: "user2",
    nickname: "Jane Smith",
    profilePhoto: "https://example.com/profile2.jpg",
    country: "영국",
    gender: "남성",
    birthdate: "1997",
    major: "경영학",
    languages: [
      { language: "한국어", level: "원어민" },
      { language: "영어", level: "상급" }
    ],
    chatIds: ['1', '4'],
    email: "jane.smith@ewha.ac.kr",
    isValidated: false
  },
  {
    userId: "user3",
    nickname: "Kim Lee",
    profilePhoto: "https://example.com/profile3.jpg",
    country: "대한민국",
    gender: "여성",
    birthdate: "1998",
    major: "심리학",
    languages: [
      { language: "영어", level: "원어민" },
      { language: "스페인어", level: "중급" },
      { language: "한국어", level: "기초" }
    ],
    chatIds: ['2', '5'],
    email: "kim.lee@ewhain.net",
    isValidated: true
  },
  {
    userId: "user4",
    nickname: "Maria Garcia",
    profilePhoto: "https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160",
    country: "스페인",
    gender: "남성",
    birthdate: "1999",
    major: "국제관계학",
    languages: [
      { language: "일본어", level: "원어민" },
      { language: "영어", level: "상급" },
      { language: "중국어", level: "중급" }
    ],
    chatIds: ['3', '6'],
    email: "maria.garcia@ewha.ac.kr",
    isValidated: false
  },
  {
    userId: "user5",
    nickname: "Yuki Tanaka",
    profilePhoto: "https://example.com/profile5.jpg",
    country: "일본",
    gender: "여성",
    birthdate: "2000",
    major: "예술사",
    languages: [
      { language: "스페인어", level: "원어민" },
      { language: "영어", level: "중급" },
      { language: "프랑스어", level: "기초" }
    ],
    chatIds: ['4', '7'],
    email: "yuki.tanaka@ewhain.net",
    isValidated: true
  },
  {
    userId: "user6",
    nickname: "Pierre Dubois",
    profilePhoto: "https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160",
    country: "프랑스",
    gender: "여성",
    birthdate: "2002",
    major: "생명공학",
    languages: [
      { language: "한국어", level: "원어민" },
      { language: "영어", level: "상급" },
      { language: "중국어", level: "중급" }
    ],
    chatIds: ['5', '8'],
    email: "pierre.dubois@ewha.ac.kr",
    isValidated: false
  },
  {
    userId: "user7",
    nickname: "Olivia Chen",
    profilePhoto: "https://example.com/profile7.jpg",
    country: "중국",
    gender: "남성",
    birthdate: "2004",
    major: "물리학",
    languages: [
      { language: "러시아어", level: "원어민" },
      { language: "영어", level: "중급" },
      { language: "독일어", level: "기초" }
    ],
    chatIds: ['6', '7', '8'],
    email: "olivia.chen@ewhain.net",
    isValidated: true
  }
];

export default users;