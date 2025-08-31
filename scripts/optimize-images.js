import imagemin from 'imagemin';
import imageminWebp from 'imagemin-webp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const projectRoot = join(__dirname, '..');

// 최적화할 이미지 경로들
const imagePaths = ['src/assets/melpik', 'src/assets/admin-melpik'];

// WebP 변환 옵션
const webpOptions = {
  quality: 75, // 75% 품질로 낮춤 (더 작은 파일 크기)
  method: 4, // 압축 레벨
  autoFilter: true,
  filter: 0,
  preset: 'photo',
};

async function optimizeImages() {
  console.log('🚀 이미지 최적화 시작...\n');

  for (const path of imagePaths) {
    const fullPath = join(projectRoot, path);

    if (!fs.existsSync(fullPath)) {
      console.log(`⚠️  경로가 존재하지 않음: ${path}`);
      continue;
    }

    console.log(`📁 처리 중: ${path}`);

    try {
      // 파일들을 개별적으로 처리
      const files = fs.readdirSync(fullPath, { recursive: true });
      const gifFiles = files.filter(
        file => typeof file === 'string' && /\.gif$/i.test(file)
      );

      console.log(`📊 발견된 GIF 파일: ${gifFiles.length}개`);

      let processedCount = 0;
      let totalOriginalSize = 0;
      let totalNewSize = 0;

      for (const file of gifFiles) {
        try {
          const filePath = join(fullPath, file);
          const fileSize = fs.statSync(filePath).size;
          totalOriginalSize += fileSize;

          console.log(
            `  🔄 처리 중: ${file} (${(fileSize / 1024 / 1024).toFixed(2)}MB)`
          );

          // WebP 변환
          const webpResult = await imagemin([filePath], {
            destination: fullPath,
            plugins: [imageminWebp(webpOptions)],
          });

          if (webpResult.length > 0) {
            const webpPath = webpResult[0].destinationPath;
            const webpSize = fs.statSync(webpPath).size;
            totalNewSize += webpSize;

            const reduction = (
              ((fileSize - webpSize) / fileSize) *
              100
            ).toFixed(1);
            console.log(`    ✅ WebP 변환 완료: ${reduction}% 크기 감소`);

            // 원본 GIF 파일 삭제
            fs.unlinkSync(filePath);
            console.log(`    🗑️  원본 GIF 파일 삭제됨`);

            processedCount++;
          }
        } catch (fileError) {
          console.log(`    ⚠️  파일 처리 실패: ${file} - ${fileError.message}`);
        }
      }

      const totalReduction = (
        ((totalOriginalSize - totalNewSize) / totalOriginalSize) *
        100
      ).toFixed(1);
      console.log(`✅ ${path} 처리 완료: ${processedCount}개 파일`);
      console.log(
        `📊 총 크기: ${(totalOriginalSize / 1024 / 1024).toFixed(2)}MB → ${(totalNewSize / 1024 / 1024).toFixed(2)}MB (${totalReduction}% 감소)`
      );
    } catch (error) {
      console.error(`❌ 오류 발생 (${path}):`, error.message);
    }
  }

  console.log('\n🎉 이미지 최적화 완료!');
}

// 스크립트 실행
optimizeImages().catch(console.error);
