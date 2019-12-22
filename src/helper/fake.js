const fakeDatabase = [
  [
    {
      id: 100001,
      level: 1,
      name: '海水',
      english: 'sea water',
      pinyin: ['hai', 'shui']
    },
    {
      id: 100002,
      level: 1,
      name: '淡水',
      english: 'fresh water',
      pinyin: ['dan', 'shui']
    }
  ],
  // level 2 - 海水/淡水 
  [
    {
      id: 100010,
      level: 2,
      name: '海水生物',
      english: 'sea water life',
      pinyin: ['hai', 'shui', 'sheng', 'wu'],
      belong: ['100001']
    },
    {
      id: 100011,
      level: 2,
      name: '淡水生物',
      english: 'fresh water life',
      pinyin: ['dan', 'shui', 'sheng', 'wu'],
      belong: ['100002']
    },
    {
      id: 100012,
      level: 2,
      name: '海水用品',
      english: 'sea water equipment',
      pinyin: ['hai', 'shui', 'yong', 'pin'],
      belong: ['100001']
    },
    {
      id: 100013,
      level: 2,
      name: '淡水用品',
      english: 'fresh water equipment',
      pinyin: ['dan', 'shui', 'yong', 'pin'],
      belong: ['100002']
    }
  ],
  // level 3 - live type
  [
    {
      id: 200010,
      name: '海水鱼',
    },
    {
      id: 200011,
      name: '珊瑚',
    },
    {
      id: 200012,
      name: '无脊椎动物',
    },
    {
      id: 200013,
      name: '淡水鱼',
    },
    {
      id: 200014,
      name: '除藻类',
    },
  ],
  // level 4 - species type
  [
    {
      name: '小丑鱼'
    },
    {
      name: '雀鲷'
    },
    {
      name: '倒吊'
    },
    {
      name: '蝶鱼'
    },
    {
      name: '小型神仙'
    },
    {
      name: '大型神仙'
    },
    {
      name: '炮弹鱼'
    },
    {
      name: '青蛙'
    },
    {
      name: '狮子鱼'
    },
    {
      name: '草莓鱼'
    },
    {
      name: '隆头鱼'
    },
    {
      name: '鮟鱇'
    },
    {
      name: '蝙蝠鱼'
    },
    {
      name: '天竺鲷'
    },
    {
      name: '狐狸鱼'
    },
    {
      name: '剥皮鱼'
    },
    {
      name: '箱鲀鱼'
    },
    {
      name: '鲀鱼'
    },
    {
      name: '石鲈鱼'
    },
    {
      name: '塘鳢'
    },
    {
      name: '鳚鱼'
    },
    {
      name: '鹰鱼'
    },
    {
      name: '金鳞鱼'
    },
    {
      name: '虾虎'
    },
    {
      name: '海金鱼'
    },
    {
      name: '花鮨'
    },
    {
      name: '海马'
    },
    {
      name: '海龙'
    },
    {
      name: '鲨鱼'
    },
    {
      name: '海鳗'
    },
    {
      name: '石斑鱼'
    },
    {
      name: '鳐鱼'
    },
    {
      name: '鳗鱼'
    },
  ],
  // level 5 - live name
  []
]