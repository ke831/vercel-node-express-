const express = require('express'); // express 모듈 불러오기    
const index = express(); // express 인스턴스 생성

index.get('/', (req, res) => { // 라우트 설정
  res.send('Hello from Vercel!');
});

module.exports = index // listen은 쓰지 않고, index만 내보냄

// 내 컴퓨터에서 직접 실행할 때만 listen
if (require.main === module) {
  const port = 3000;
  index.listen(port, () => {
    console.log(`서버가 ${port}번 포트에서 실행 중!`);
  });
}