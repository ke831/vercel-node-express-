// index.js

const express = require('express'); // express 모듈 불러오기
const serverless = require('serverless-http'); // Express 앱을 서버리스 함수로 변환

const app = express(); // express 인스턴스 생성 (변수명을 'app'으로 통일하는 것이 일반적입니다)

// 환경 변수 로그 확인 (Vercel에서는 Logs에서 확인 가능)
console.log('index.js: 파일 로드 시작.');
console.log('index.js: NOTION_TOKEN (로드 여부):', process.env.NOTION_TOKEN ? 'Loaded' : 'Not Loaded');

app.get('/', (req, res) => { // 기본 라우트 설정
  console.log('index.js: Request received at /');
  res.send('Hello from Vercel!');
});

// ✅ Notion API 네트워크 연결 테스트용 ping 라우트
app.get('/notion-ping', async (req, res) => {
  console.log('index.js: Request received at /notion-ping');
  try {
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

// Vercel 서버리스 환경에 맞게 Express 앱 내보내기
module.exports = serverless(app);