const messageMockData = {
  '1': [
    {
      messageId: '101',
      senderId: 'user1',
      content: '안녕하세요! 오늘 날씨가 정말 좋네요.',
      timestamp: '2024-08-01T10:00:00.000Z',
      isRead: true
    },
    {
      messageId: '102',
      senderId: 'user2',
      content: '네, 정말 그러네요. 밖에 나가고 싶어지는 날씨예요.',
      timestamp: '2024-08-01T10:05:00.000Z',
      isRead: true
    },
    {
      messageId: '103',
      senderId: 'user1',
      content: '혹시 오후에 시간 되세요? 커피 한잔 하면 좋을 것 같아요.',
      timestamp: '2024-08-01T10:10:00.000Z',
      isRead: true
    },
    {
      messageId: '104',
      senderId: 'user2',
      content: '좋은 생각이네요! 3시쯤 어떠세요?',
      timestamp: '2024-08-01T10:15:00.000Z',
      isRead: true
    },
    {
      messageId: '105',
      senderId: 'user1',
      content: '3시 좋습니다. 어디서 만날까요?',
      timestamp: '2024-08-01T10:20:00.000Z',
      isRead: true
    },
    {
      messageId: '106',
      senderId: 'user2',
      content: '시내 중심가에 있는 스타벅스 어떠세요?',
      timestamp: '2024-08-02T10:25:00.000Z',
      isRead: true
    },
    {
      messageId: '107',
      senderId: 'user1',
      content: '좋아요. 그럼 거기서 봬요!',
      timestamp: '2024-08-03T10:30:00.000Z',
      isRead: true
    },
    {
      messageId: '108',
      senderId: 'user2',
      content: '네, 그때 뵙겠습니다!',
      timestamp: '2024-08-04T10:35:00.000Z',
      isRead: true
    }
  ],
  '2': [
    {
      messageId: '201',
      senderId: 'user2',
      content: 'Hello! How are you doing today?',
      timestamp: '2024-08-02T09:00:00.000Z',
      isRead: true
    },
    {
      messageId: '202',
      senderId: 'user3',
      content: 'Hi there! I\'m doing great, thanks for asking. How about you?',
      timestamp: '2024-08-02T09:10:00.000Z',
      isRead: true
    },
    {
      messageId: '203',
      senderId: 'user2',
      content: 'I\'m doing well too. Just finished a big project at work.',
      timestamp: '2024-08-02T09:15:00.000Z',
      isRead: true
    },
    {
      messageId: '204',
      senderId: 'user3',
      content: 'That\'s awesome! Congratulations on completing the project. Was it challenging?',
      timestamp: '2024-08-02T09:20:00.000Z',
      isRead: true
    },
    {
      messageId: '205',
      senderId: 'user2',
      content: 'Yes, it was quite challenging but also very rewarding. Learned a lot in the process.',
      timestamp: '2024-08-02T09:25:00.000Z',
      isRead: true
    },
    {
      messageId: '206',
      senderId: 'user3',
      content: 'That\'s great to hear. Learning new things is always exciting. Any plans to celebrate?',
      timestamp: '2024-08-02T09:30:00.000Z',
      isRead: true
    },
    {
      messageId: '207',
      senderId: 'user2',
      content: 'Actually, I was thinking about that. Would you like to grab dinner this weekend?',
      timestamp: '2024-08-02T09:35:00.000Z',
      isRead: true
    },
    {
      messageId: '208',
      senderId: 'user3',
      content: 'Sounds good to me! How about Saturday evening?',
      timestamp: '2024-08-02T09:40:00.000Z',
      isRead: false
    },
    {
      messageId: '209',
      senderId: 'user2',
      content: 'Saturday evening works perfectly. Any preference for cuisine?',
      timestamp: '2024-08-02T09:45:00.000Z',
      isRead: false
    },
    {
      messageId: '210',
      senderId: 'user3',
      content: 'How about Italian? I know a great place downtown.',
      timestamp: '2024-08-02T09:50:00.000Z',
      isRead: false
    }
  ],
  '3': [
    {
      messageId: '301',
      senderId: 'user3',
      content: 'こんにちは！お元気ですか？',
      timestamp: '2024-08-03T11:00:00.000Z',
      isRead: true
    },
    {
      messageId: '302',
      senderId: 'user4',
      content: 'はい、元気です。ありがとうございます。',
      timestamp: '2024-08-03T11:05:00.000Z',
      isRead: true
    },
    {
      messageId: '303',
      senderId: 'user3',
      content: '週末に何か予定はありますか？',
      timestamp: '2024-08-03T11:10:00.000Z',
      isRead: true
    },
    {
      messageId: '304',
      senderId: 'user4',
      content: '特に予定はありません。何かありますか？',
      timestamp: '2024-08-03T11:15:00.000Z',
      isRead: true
    },
    {
      messageId: '305',
      senderId: 'user3',
      content: '新しい日本料理店がオープンしたんです。一緒に行きませんか？',
      timestamp: '2024-08-03T11:20:00.000Z',
      isRead: true
    },
    {
      messageId: '306',
      senderId: 'user4',
      content: 'いいですね！ぜひ行きたいです。',
      timestamp: '2024-08-03T11:25:00.000Z',
      isRead: true
    },
    {
      messageId: '307',
      senderId: 'user3',
      content: 'じゃあ、土曜日の夜はどうですか？',
      timestamp: '2024-08-03T11:30:00.000Z',
      isRead: true
    },
    {
      messageId: '308',
      senderId: 'user4',
      content: '土曜日の夜で大丈夫です。楽しみにしています！',
      timestamp: '2024-08-03T11:35:00.000Z',
      isRead: false
    }
  ],
  '4': [
    {
      messageId: '401',
      senderId: 'user4',
      content: '¡Hola! ¿Cómo estás?',
      timestamp: '2024-08-04T12:00:00.000Z',
      isRead: true
    },
    {
      messageId: '402',
      senderId: 'user5',
      content: '¡Hola! Estoy bien, gracias. ¿Y tú?',
      timestamp: '2024-08-04T12:05:00.000Z',
      isRead: true
    },
    {
      messageId: '403',
      senderId: 'user4',
      content: 'Estoy bien también. ¿Qué planes tienes para el fin de semana?',
      timestamp: '2024-08-04T12:10:00.000Z',
      isRead: true
    },
    {
      messageId: '404',
      senderId: 'user5',
      content: 'Todavía no tengo planes. ¿Tienes alguna sugerencia?',
      timestamp: '2024-08-04T12:15:00.000Z',
      isRead: true
    },
    {
      messageId: '405',
      senderId: 'user4',
      content: '¿Qué te parece ir a la playa?',
      timestamp: '2024-08-04T12:20:00.000Z',
      isRead: true
    },
    {
      messageId: '406',
      senderId: 'user5',
      content: '¡Suena genial! Me encantaría.',
      timestamp: '2024-08-04T12:25:00.000Z',
      isRead: true
    },
    {
      messageId: '407',
      senderId: 'user4',
      content: 'Perfecto, entonces nos vemos el sábado.',
      timestamp: '2024-08-04T12:30:00.000Z',
      isRead: true
    },
    {
      messageId: '408',
      senderId: 'user5',
      content: '¡Sí, nos vemos entonces!',
      timestamp: '2024-08-04T12:35:00.000Z',
      isRead: false
    }
  ],
  '5': [
    {
      messageId: '501',
      senderId: 'user5',
      content: 'Привет! Как дела?',
      timestamp: '2024-08-05T13:00:00.000Z',
      isRead: true
    },
    {
      messageId: '502',
      senderId: 'user6',
      content: 'Привет! У меня всё хорошо, спасибо. А у тебя?',
      timestamp: '2024-08-05T13:05:00.000Z',
      isRead: true
    },
    {
      messageId: '503',
      senderId: 'user5',
      content: 'У меня тоже всё хорошо. Какие планы на выходные?',
      timestamp: '2024-08-05T13:10:00.000Z',
      isRead: true
    },
    {
      messageId: '504',
      senderId: 'user6',
      content: 'Пока не знаю. Есть предложения?',
      timestamp: '2024-08-05T13:15:00.000Z',
      isRead: true
    },
    {
      messageId: '505',
      senderId: 'user5',
      content: 'Может быть, сходим в кино?',
      timestamp: '2024-08-05T13:20:00.000Z',
      isRead: true
    },
    {
      messageId: '506',
      senderId: 'user6',
      content: 'Отличная идея! Давай сходим.',
      timestamp: '2024-08-05T13:25:00.000Z',
      isRead: true
    },
    {
      messageId: '507',
      senderId: 'user5',
      content: 'Тогда договорились. Встретимся в субботу.',
      timestamp: '2024-08-05T13:30:00.000Z',
      isRead: true
    },
    {
      messageId: '508',
      senderId: 'user6',
      content: 'Да, до встречи!',
      timestamp: '2024-08-05T13:35:00.000Z',
      isRead: false
    }
  ],
  '6': [
    {
      messageId: '601',
      senderId: 'user6',
      content: 'Bonjour! Comment allez-vous?',
      timestamp: '2024-08-06T14:00:00.000Z',
      isRead: true
    },
    {
      messageId: '602',
      senderId: 'user7',
      content: 'Bonjour! Je vais bien, merci. Et vous?',
      timestamp: '2024-08-06T14:05:00.000Z',
      isRead: true
    },
    {
      messageId: '603',
      senderId: 'user6',
      content: 'Je vais bien aussi. Qu\'avez-vous prévu pour le week-end?',
      timestamp: '2024-08-06T14:10:00.000Z',
      isRead: true
    },
    {
      messageId: '604',
      senderId: 'user7',
      content: 'Je n\'ai pas encore de plans. Avez-vous des suggestions?',
      timestamp: '2024-08-06T14:15:00.000Z',
      isRead: true
    },
    {
      messageId: '605',
      senderId: 'user6',
      content: 'Et si nous allions à la plage?',
      timestamp: '2024-08-06T14:20:00.000Z',
      isRead: true
    },
    {
      messageId: '606',
      senderId: 'user7',
      content: 'Bonne idée! J\'aimerais beaucoup.',
      timestamp: '2024-08-06T14:25:00.000Z',
      isRead: true
    },
    {
      messageId: '607',
      senderId: 'user6',
      content: 'Parfait, alors à samedi.',
      timestamp: '2024-08-06T14:30:00.000Z',
      isRead: true
    },
    {
      messageId: '608',
      senderId: 'user7',
      content: 'Oui, à samedi!',
      timestamp: '2024-08-06T14:35:00.000Z',
      isRead: false
    }
  ],
  '7': [
    {
      messageId: '701',
      senderId: 'user7',
      content: '你好！最近怎么样？',
      timestamp: '2024-08-07T15:00:00.000Z',
      isRead: true
    },
    {
      messageId: '702',
      senderId: 'user8',
      content: '你好！我很好，谢谢。你呢？',
      timestamp: '2024-08-07T15:05:00.000Z',
      isRead: true
    },
    {
      messageId: '703',
      senderId: 'user7',
      content: '我也很好。这个周末有什么计划吗？',
      timestamp: '2024-08-07T15:10:00.000Z',
      isRead: true
    },
    {
      messageId: '704',
      senderId: 'user8',
      content: '还没有计划。你有什么建议吗？',
      timestamp: '2024-08-07T15:15:00.000Z',
      isRead: true
    },
    {
      messageId: '705',
      senderId: 'user7',
      content: '我们去看电影怎么样？',
      timestamp: '2024-08-07T15:20:00.000Z',
      isRead: true
    },
    {
      messageId: '706',
      senderId: 'user8',
      content: '好主意！我们去吧。',
      timestamp: '2024-08-07T15:25:00.000Z',
      isRead: true
    },
    {
      messageId: '707',
      senderId: 'user7',
      content: '那就这样定了。周六见。',
      timestamp: '2024-08-07T15:30:00.000Z',
      isRead: true
    },
    {
      messageId: '708',
      senderId: 'user8',
      content: '好的，周六见！',
      timestamp: '2024-08-07T15:35:00.000Z',
      isRead: false
    }
  ],
  '8': [
    {
      messageId: '801',
      senderId: 'user8',
      content: 'Guten Tag! Wie geht es Ihnen?',
      timestamp: '2024-08-08T16:00:00.000Z',
      isRead: true
    },
    {
      messageId: '802',
      senderId: 'user9',
      content: 'Guten Tag! Mir geht es gut, danke. Und Ihnen?',
      timestamp: '2024-08-08T16:05:00.000Z',
      isRead: true
    },
    {
      messageId: '803',
      senderId: 'user8',
      content: 'Mir geht es auch gut. Haben Sie Pläne für das Wochenende?',
      timestamp: '2024-08-08T16:10:00.000Z',
      isRead: true
    },
    {
      messageId: '804',
      senderId: 'user9',
      content: 'Noch keine Pläne. Haben Sie Vorschläge?',
      timestamp: '2024-08-08T16:15:00.000Z',
      isRead: true
    },
    {
      messageId: '805',
      senderId: 'user8',
      content: 'Wie wäre es mit einem Kinobesuch?',
      timestamp: '2024-08-08T16:20:00.000Z',
      isRead: true
    },
    {
      messageId: '806',
      senderId: 'user9',
      content: 'Gute Idee! Lass uns gehen.',
      timestamp: '2024-08-08T16:25:00.000Z',
      isRead: true
    },
    {
      messageId: '807',
      senderId: 'user8',
      content: 'Abgemacht. Wir sehen uns am Samstag.',
      timestamp: '2024-08-08T16:30:00.000Z',
      isRead: true
    },
    {
      messageId: '808',
      senderId: 'user9',
      content: 'Ja, bis Samstag!',
      timestamp: '2024-08-08T16:35:00.000Z',
      isRead: false
    }
  ]
};

export default messageMockData;