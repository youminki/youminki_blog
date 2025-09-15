#!/usr/bin/env node

/**
 * Velog 동기화 테스트 스크립트
 * 브라우저 환경에서 실행 가능
 */

// 간단한 테스트용 RSS 파싱 함수
const testRSSParsing = async () => {
  try {
    console.log('🔍 Velog RSS 테스트를 시작합니다...');

    const username = 'youminki';
    const rssUrl = `https://v2.velog.io/rss/@${username}`;
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(rssUrl)}`;

    console.log(`📡 RSS URL: ${rssUrl}`);
    console.log(`🔗 프록시 URL: ${proxyUrl}`);

    const response = await fetch(proxyUrl);
    const data = await response.json();

    if (!data.contents) {
      throw new Error('RSS 데이터를 가져올 수 없습니다.');
    }

    console.log('✅ RSS 데이터를 성공적으로 가져왔습니다!');
    console.log(`📄 데이터 크기: ${data.contents.length} bytes`);

    // 간단한 파싱 테스트
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data.contents, 'text/xml');
    const items = xmlDoc.querySelectorAll('item');

    console.log(`📝 발견된 포스트 수: ${items.length}개`);

    // 첫 번째 포스트 정보 출력
    if (items.length > 0) {
      const firstItem = items[0];
      const title = firstItem.querySelector('title')?.textContent || '';
      const link = firstItem.querySelector('link')?.textContent || '';
      const pubDate = firstItem.querySelector('pubDate')?.textContent || '';

      console.log('\n📋 첫 번째 포스트 정보:');
      console.log(`제목: ${title}`);
      console.log(`링크: ${link}`);
      console.log(`발행일: ${pubDate}`);
    }

    return true;
  } catch (error) {
    console.error('❌ RSS 파싱 테스트 실패:', error);
    return false;
  }
};

// 브라우저 환경에서 실행
if (typeof window !== 'undefined') {
  console.log('🌐 브라우저 환경에서 테스트를 실행합니다...');
  testRSSParsing().then(success => {
    if (success) {
      console.log('🎉 테스트가 성공적으로 완료되었습니다!');
    } else {
      console.log('💥 테스트가 실패했습니다.');
    }
  });
} else {
  console.log('🖥️ Node.js 환경에서는 다른 방법을 사용하세요.');
  console.log('💡 yarn sync-velog 명령어를 사용하세요.');
}
