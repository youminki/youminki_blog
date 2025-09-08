import React, { useMemo, useCallback } from 'react';

interface MarkdownRendererProps {
  content: string;
}

const MarkdownRenderer: React.FC<MarkdownRendererProps> = ({ content }) => {
  // 마크다운 텍스트를 HTML로 변환하는 유틸리티 함수를 useCallback으로 최적화
  const convertMarkdownToHTML = useCallback((text: string): string => {
    return (
      text
        // **텍스트** 패턴을 <strong> 태그로 변환
        .replace(
          /\*\*(.*?)\*\*/g,
          '<strong style="font-weight: 600; color: var(--accent-color);">$1</strong>'
        )
        // __텍스트__ 패턴도 <strong> 태그로 변환 (대안 마크다운 문법)
        .replace(
          /__(.*?)__/g,
          '<strong style="font-weight: 600; color: var(--accent-color);">$1</strong>'
        )
        // *텍스트* 패턴을 <em> 태그로 변환
        .replace(/\*(.*?)\*/g, '<em style="font-style: italic;">$1</em>')
        // _텍스트_ 패턴도 <em> 태그로 변환
        .replace(/_(.*?)_/g, '<em style="font-style: italic;">$1</em>')
        // `텍스트` 패턴을 <code> 태그로 변환
        .replace(
          /`(.*?)`/g,
          '<code style="background-color: var(--bg-secondary); padding: 0.2rem 0.4rem; border-radius: 0.25rem; font-family: monospace; font-size: 0.875rem;">$1</code>'
        )
    );
  }, []);

  const renderContent = useMemo(() => {
    const lines = content.split('\n');
    const elements = [];
    let codeBlock = false;
    let codeLines = [];
    let codeLanguage = '';

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const key = `line-${i}`;

      // 코드 블록 시작/끝 처리
      if (line.startsWith('```')) {
        if (!codeBlock) {
          // 코드 블록 시작
          codeBlock = true;
          codeLines = [];
          codeLanguage = line.replace('```', '').trim() || 'Code';
          continue;
        } else {
          // 코드 블록 끝
          codeBlock = false;
          elements.push(
            <div
              key={key}
              style={{
                margin: '1.5rem 0',
                backgroundColor: 'var(--bg-secondary)',
                borderRadius: '0.75rem',
                border: '1px solid var(--border-color)',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  backgroundColor: 'var(--bg-primary)',
                  padding: '0.75rem 1rem',
                  borderBottom: '1px solid var(--border-color)',
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                }}
              >
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#ef4444',
                  }}
                />
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#f59e0b',
                  }}
                />
                <div
                  style={{
                    width: '12px',
                    height: '12px',
                    borderRadius: '50%',
                    backgroundColor: '#10b981',
                  }}
                />
                <span style={{ marginLeft: '0.5rem' }}>{codeLanguage}</span>
              </div>
              <pre
                style={{
                  margin: 0,
                  padding: '1.5rem',
                  overflow: 'auto',
                  fontSize: '0.875rem',
                  lineHeight: '1.6',
                  fontFamily:
                    'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                  backgroundColor: 'var(--bg-secondary)',
                }}
              >
                <code style={{ color: 'var(--text-primary)' }}>
                  {codeLines.join('\n')}
                </code>
              </pre>
            </div>
          );
          continue;
        }
      }

      // 코드 블록 내부 처리
      if (codeBlock) {
        codeLines.push(line);
        continue;
      }

      // 일반 텍스트 처리
      if (line.startsWith('## ')) {
        elements.push(
          <h3
            key={key}
            style={{
              fontSize: '1.75rem',
              fontWeight: '700',
              marginTop: '1.5rem',
              marginBottom: '1rem',
              color: 'var(--text-primary)',
              borderBottom: '2px solid var(--accent-color)',
              paddingBottom: '0.5rem',
            }}
          >
            {line.replace('## ', '')}
          </h3>
        );
      } else if (line.startsWith('### ')) {
        elements.push(
          <h4
            key={key}
            style={{
              fontSize: '1.375rem',
              fontWeight: '600',
              marginTop: '1.25rem',
              marginBottom: '0.75rem',
              color: 'var(--accent-color)',
              paddingLeft: '0.5rem',
              borderLeft: '4px solid var(--accent-color)',
            }}
          >
            {line.replace('### ', '')}
          </h4>
        );
      } else if (line.trim() === '') {
        elements.push(<div key={key} style={{ height: '1rem' }} />);
      } else if (line.startsWith('- ')) {
        // 리스트 아이템 처리 (마크다운 변환 포함)
        const contentWithoutBullet = line.replace('- ', '');
        const processedLine = convertMarkdownToHTML(contentWithoutBullet);
        elements.push(
          <div
            key={key}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              marginBottom: '0.75rem',
              paddingLeft: '1rem',
            }}
          >
            <span
              style={{
                color: 'var(--accent-color)',
                marginRight: '0.75rem',
                fontSize: '1.2rem',
                lineHeight: '1.7',
                display: 'flex',
                alignItems: 'center',
                minWidth: '1rem',
              }}
            >
              •
            </span>
            <span
              style={{ flex: 1, lineHeight: '1.7' }}
              dangerouslySetInnerHTML={{
                __html: processedLine,
              }}
            />
          </div>
        );
      } else if (line.startsWith('**') && line.endsWith('**')) {
        // 전체 라인이 **로 감싸진 경우 (제목 스타일)
        elements.push(
          <p
            key={key}
            style={{
              marginBottom: '0.75rem',
              fontWeight: '600',
              color: 'var(--accent-color)',
              fontSize: '1.125rem',
            }}
          >
            {line.replace(/\*\*/g, '')}
          </p>
        );
      } else if (line.startsWith('**Q:') || line.startsWith('**A:')) {
        elements.push(
          <div
            key={key}
            style={{
              marginBottom: '1rem',
              padding: '1rem',
              backgroundColor: line.startsWith('**Q:')
                ? 'var(--bg-secondary)'
                : 'var(--bg-primary)',
              borderRadius: '0.75rem',
              border: '1px solid var(--border-color)',
            }}
          >
            <div
              style={{
                fontWeight: '600',
                color: line.startsWith('**Q:')
                  ? 'var(--accent-color)'
                  : 'var(--text-primary)',
                marginBottom: '0.5rem',
                fontSize: '1rem',
              }}
            >
              {line.startsWith('**Q:') ? '❓ 질문' : '💡 답변'}
            </div>
            <div style={{ lineHeight: '1.6' }}>
              {line.replace(/\*\*Q:\s*|\*\*A:\s*/g, '')}
            </div>
          </div>
        );
      } else if (
        line.includes('[') &&
        line.includes('](') &&
        line.includes(')')
      ) {
        // 마크다운 링크 처리
        const linkMatch = line.match(/\[([^\]]+)\]\(([^)]+)\)/);
        if (linkMatch) {
          const [, linkText, linkUrl] = linkMatch;
          elements.push(
            <p
              key={key}
              style={{
                marginBottom: '0.75rem',
                lineHeight: '1.6',
                fontSize: '1rem',
                color: 'var(--text-primary)',
              }}
            >
              <a
                href={linkUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: 'var(--accent-color)',
                  textDecoration: 'underline',
                  fontWeight: '500',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.textDecoration = 'none';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.textDecoration = 'underline';
                }}
              >
                {linkText}
              </a>
            </p>
          );
        } else {
          elements.push(
            <p
              key={key}
              style={{
                marginBottom: '1.25rem',
                lineHeight: '1.8',
                fontSize: '1rem',
                color: 'var(--text-primary)',
              }}
            >
              {line}
            </p>
          );
        }
      } else {
        // 일반 텍스트 처리 (마크다운 변환 포함)
        const processedLine = convertMarkdownToHTML(line);
        elements.push(
          <p
            key={key}
            style={{
              marginBottom: '0.75rem',
              lineHeight: '1.6',
              fontSize: '1rem',
              color: 'var(--text-primary)',
            }}
            dangerouslySetInnerHTML={{ __html: processedLine }}
          />
        );
      }
    }

    return elements;
  }, [content, convertMarkdownToHTML]);

  return (
    <div
      style={{
        color: 'var(--text-primary)',
        lineHeight: '1.4',
        fontSize: '1rem',
      }}
    >
      {renderContent}
    </div>
  );
};

export default MarkdownRenderer;
