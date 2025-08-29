import { MdPerson } from 'react-icons/md';

const AboutMe = () => {
  const experiences = [
    {
      title: 'Full-stack web development experience:',
      description:
        'React + TypeScript + Vite 기술 스택을 기반으로 한 풀스택 웹 개발 경험, Melpik 의류 대여 서비스의 전체 생태계 구현 경험 (프론트엔드 아키텍처 설계부터 배포까지).',
    },
    {
      title: 'Code quality and development efficiency:',
      description:
        '코드 품질 및 개발 효율성 중점, TypeScript strict 모드, ESLint + Prettier + Husky를 통한 자동화된 코드 품질 관리, Jest + React Testing Library를 통한 테스트 커버리지 확보, Storybook을 활용한 컴포넌트 문서화.',
    },
    {
      title: 'User experience optimization:',
      description:
        '사용자 경험 최적화에 대한 깊은 이해, 반응형 디자인, 모바일 최적화, 접근성(a11y), 성능 모니터링 포함 UX/UI 설계 및 구현 담당, Styled Components 기반 디자인 시스템 구축.',
    },
    {
      title: 'Complex business logic implementation:',
      description:
        '복잡한 비즈니스 로직 구현 전문성, 사용자 인증, 상품 관리, 렌탈 서비스, 결제, 스케줄링 시스템 등 핵심 기능 구현, 관리자 대시보드 데이터 관리 및 모니터링 시스템 구축.',
    },
    {
      title: 'Continuous learning and technology adoption:',
      description:
        '지속적인 학습 및 기술 적용 중요, React 18/19 최신 기능, Vite 빌드 도구, 모던 TypeScript 패턴, React Query, React Hook Form 적극 도입, Git 기반 버전 관리 및 CI/CD 파이프라인을 통한 안정적인 배포 프로세스 구축.',
    },
  ];

  return (
    <div>
      <h2 className="section-title flex items-center gap-4">
        <MdPerson className="text-[var(--accent-color)] text-xl" />
        About me
      </h2>
      <div className="space-y-6">
        {experiences.map((exp, index) => (
          <div key={index} className="relative">
            <div className="section-card">
              {index > 0 && (
                <div className="section-divider mb-2">
                  <div className="section-divider-dot"></div>
                </div>
              )}
              <h3 className="text-xl font-semibold text-[var(--text-primary)] compact-title">
                {exp.title}
              </h3>
              <p className="section-content">{exp.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AboutMe;
