const chatMockData = [
    {
      channelId: '1',
      otherUser: {
        uid: 'user1',
        nickname: 'John Doe',
        country: '미국',
        profilePicture: 'https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160',
      },
      lastMessage: {
        text: 'Hello, how are you?',
        createdAt: new Date('2024-08-02T10:30:00'),
      },
    },
    {
      channelId: '2',
      otherUser: {
        uid: 'user2',
        nickname: 'Jane Smith',
        country: '영국',
        profilePicture: 'https://example.com/profile2.jpg',
      },
      lastMessage: {
        text: 'Are you free this weekend?',
        createdAt: new Date('2024-08-01T18:45:00'),
      },
    },
    {
      channelId: '3',
      otherUser: {
        uid: 'user3',
        nickname: 'Kim Lee',
        country: '대한민국',
        profilePicture: 'https://example.com/profile3.jpg',
      },
      lastMessage: {
        text: '안녕하세요! 오늘 날씨가 좋네요.',
        createdAt: new Date('2024-08-02T09:15:00'),
      },
    },
    {
      channelId: '4',
      otherUser: {
        uid: 'user4',
        nickname: 'Maria Garcia',
        country: '스페인',
        profilePicture: 'https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160',
      },
      lastMessage: {
        text: '¡Hola! ¿Cómo estás?',
        createdAt: new Date('2024-08-03T14:20:00'),
      },
    },
    {
      channelId: '5',
      otherUser: {
        uid: 'user5',
        nickname: 'Yuki Tanaka',
        country: '일본',
        profilePicture: 'https://example.com/profile5.jpg',
      },
      lastMessage: {
        text: 'こんにちは！元気ですか？',
        createdAt: new Date('2024-08-03T08:50:00'),
      },
    },
    {
      channelId: '6',
      otherUser: {
        uid: 'user6',
        nickname: 'Pierre Dubois',
        country: '프랑스',
        profilePicture: 'https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160',
      },
      lastMessage: {
        text: 'Bonjour! Comment allez-vous?',
        createdAt: new Date('2024-08-02T22:10:00'),
      },
    },
    {
      channelId: '7',
      otherUser: {
        uid: 'user7',
        nickname: 'Olivia Chen',
        country: '중국',
        profilePicture: 'https://example.com/profile7.jpg',
      },
      lastMessage: {
        text: '你好！最近怎么样？',
        createdAt: new Date('2024-08-03T11:05:00'),
      },
    },
    {
      channelId: '8',
      otherUser: {
        uid: 'user8',
        nickname: 'Hans Müller',
        country: '독일',
        profilePicture: 'https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160',
      },
      lastMessage: {
        text: 'Guten Tag! Wie geht es Ihnen?',
        createdAt: new Date('2024-08-03T16:40:00'),
      },
    },
  ];

export default chatMockData;