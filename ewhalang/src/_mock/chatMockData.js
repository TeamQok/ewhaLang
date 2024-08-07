const chatMockData = [
  {
      chatId: '1',
      participants: [
          {
              userId: 'user1',
              nickname: 'John Doe',
              profilePhoto: 'https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160',
              country: '미국',
          },
          {
              userId: 'user2',
              nickname: 'Jane Smith',
              profilePhoto: 'https://example.com/profile2.jpg',
              country: '영국',
          },
      ],
      lastMessage: {
          content: 'Hello, how are you?',
          timestamp: '2024-08-02T10:30:00.000Z',
          senderId: 'user1',
      },
      unreadCounts: {
          user1: 2,
          user2: 1,
      },
  },
  {
      chatId: '2',
      participants: [
          {
              userId: 'user2',
              nickname: 'Jane Smith',
              profilePhoto: 'https://example.com/profile2.jpg',
              country: '영국',
          },
          {
              userId: 'user3',
              nickname: 'Kim Lee',
              profilePhoto: 'https://example.com/profile3.jpg',
              country: '대한민국',
          },
      ],
      lastMessage: {
          content: 'Are you free this weekend?',
          timestamp: '2024-08-01T18:45:00.000Z',
          senderId: 'user3',
      },
      unreadCounts: {
          user2: 2,
          user3: 0,
      },
  },
  {
      chatId: '3',
      participants: [
          {
              userId: 'user3',
              nickname: 'Kim Lee',
              profilePhoto: 'https://example.com/profile3.jpg',
              country: '대한민국',
          },
          {
              userId: 'user4',
              nickname: 'Maria Garcia',
              profilePhoto: 'https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160',
              country: '스페인',
          },
      ],
      lastMessage: {
          content: '안녕하세요! 오늘 날씨가 좋네요.',
          timestamp: '2024-08-02T09:15:00.000Z',
          senderId: 'user3',
      },
      unreadCounts: {
          user3: 0,
          user4: 1,
      },
  },
  {
      chatId: '4',
      participants: [
          {
              userId: 'user4',
              nickname: 'Maria Garcia',
              profilePhoto: 'https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160',
              country: '스페인',
          },
          {
              userId: 'user5',
              nickname: 'Yuki Tanaka',
              profilePhoto: 'https://example.com/profile5.jpg',
              country: '일본',
          },
      ],
      lastMessage: {
          content: '¡Hola! ¿Cómo estás?',
          timestamp: '2024-08-03T14:20:00.000Z',
          senderId: 'user4',
      },
      unreadCounts: {
          user4: 0,
          user5: 1,
      },
  },
  {
      chatId: '5',
      participants: [
          {
              userId: 'user5',
              nickname: 'Yuki Tanaka',
              profilePhoto: 'https://example.com/profile5.jpg',
              country: '일본',
          },
          {
              userId: 'user6',
              nickname: 'Pierre Dubois',
              profilePhoto: 'https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160',
              country: '프랑스',
          },
      ],
      lastMessage: {
          content: 'こんにちは！元気ですか？',
          timestamp: '2024-08-03T08:50:00.000Z',
          senderId: 'user5',
      },
      unreadCounts: {
          user5: 0,
          user6: 1,
      },
  },
  {
      chatId: '6',
      participants: [
          {
              userId: 'user6',
              nickname: 'Pierre Dubois',
              profilePhoto: 'https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160',
              country: '프랑스',
          },
          {
              userId: 'user7',
              nickname: 'Olivia Chen',
              profilePhoto: 'https://example.com/profile7.jpg',
              country: '중국',
          },
      ],
      lastMessage: {
          content: 'Bonjour! Comment allez-vous?',
          timestamp: '2024-08-02T22:10:00.000Z',
          senderId: 'user6',
      },
      unreadCounts: {
          user6: 0,
          user7: 1,
      },
  },
  {
      chatId: '7',
      participants: [
          {
              userId: 'user7',
              nickname: 'Olivia Chen',
              profilePhoto: 'https://example.com/profile7.jpg',
              country: '중국',
          },
          {
              userId: 'user8',
              nickname: 'Hans Müller',
              profilePhoto: 'https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160',
              country: '독일',
          },
      ],
      lastMessage: {
          content: '你好！最近怎么样？',
          timestamp: '2024-08-03T11:05:00.000Z',
          senderId: 'user7',
      },
      unreadCounts: {
          user7: 0,
          user8: 1,
      },
  },
  {
      chatId: '8',
      participants: [
          {
              userId: 'user8',
              nickname: 'Hans Müller',
              profilePhoto: 'https://phinf.pstatic.net/contact/20230927_97/1695771297678iH1D0_JPEG/profileImage.jpg?type=s160',
              country: '독일',
          },
          {
              userId: 'user9',
              nickname: 'Current User',
              profilePhoto: 'https://example.com/current-user.jpg',
              country: '미국',
          },
      ],
      lastMessage: {
          content: 'Guten Tag! Wie geht es Ihnen?',
          timestamp: '2024-08-03T16:40:00.000Z',
          senderId: 'user8',
      },
      unreadCounts: {
          user8: 0,
          user9: 1,
      },
  },
];

export default chatMockData;