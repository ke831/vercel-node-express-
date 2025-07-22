const express = require('express'); // express 모듈 불러오기    
const index = express(); // express 인스턴스 생성

index.get('/', (req, res) => { // 라우트 설정
  res.send('Hello from Vercel!');
});

module.exports = index // listen은 쓰지 않고, index만 내보냄

// ✅ Notion API 네트워크 연결 테스트용 ping 라우트
app.get('/notion-ping', async (req, res) => {
  console.log('index.js: Request received at /notion-ping');
  try {
    // Node.js 18+에서는 fetch가 전역으로 있지만, Vercel 환경에서 안정성을 위해
    // `node-fetch` 모듈을 명시적으로 불러와 사용하는 것이 좋습니다.
    // package.json에 `node-fetch`가 `dependencies`에 설치되어 있어야 합니다.
    const nodeFetch = require('node-fetch'); // <-- fetch 사용을 위해 명시적으로 불러오기

    const response = await nodeFetch('https://api.notion.com/v1/users', { // nodeFetch 변수 사용
      headers: {
        'Authorization': `Bearer ${process.env.NOTION_TOKEN}`,
        'Notion-Version': '2022-06-28'
      }
    });
    const data = await response.json();
    console.log('index.js: Notion ping successful.');
    res.json({ ok: true, data });
  } catch (error) {
    console.error('index.js: Error during notion-ping:', error.message);
    res.status(500).json({ ok: false, error: error.message });
  }
});

