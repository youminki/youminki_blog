import { useBlogModal, type BlogPost } from '../hooks/useBlogModal';
import { useState } from 'react';

const Blog = () => {
  const { isOpen, openModal, closeModal } = useBlogModal();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  // 카테고리별 썸네일 색상 함수
  const getCategoryThumbnailColor = (category: string) => {
    switch (category) {
      case '전체':
        return '#dbeafe'; // 연한 파란색
      case 'React':
        return '#cffafe'; // 연한 청록색
      case 'TypeScript':
        return '#e9d5ff'; // 연한 보라색
      default:
        return '#f1f5f9'; // 기본 회색
    }
  };

  // 카테고리별 텍스트 색상 함수
  const getCategoryTextColor = (category: string) => {
    switch (category) {
      case '전체':
        return '#1e40af'; // 진한 파란색
      case 'React':
        return '#0891b2'; // 진한 청록색
      case 'TypeScript':
        return '#7c3aed'; // 진한 보라색
      default:
        return '#64748b'; // 기본 회색
    }
  };

  // 포스트 생성 팩토리 함수
  const createBlogPost = (config: {
    id: number;
    title: string;
    content: string;
    category: string;
    postType: 'react19' | 'typescript59' | 'custom';
    tags: string[];
  }) => {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');

    let date: string;
    switch (config.postType) {
      case 'react19':
        date = '2024.12.05'; // React 19 실제 릴리스 날짜
        break;
      case 'typescript59':
        date = '2025.08.01'; // TypeScript 5.9 실제 릴리스 날짜
        break;
      case 'custom':
        date = `${year}.${month}.${day}`; // 현재 작성 날짜
        break;
      default:
        date = `${year}.${month}.${day}`;
    }

    return {
      id: config.id,
      title: config.title,
      content: config.content,
      category: config.category,
      date,
      tags: config.tags,
    };
  };

  const blogPosts: BlogPost[] = [
    createBlogPost({
      id: 1,
      title: 'React 19의 새로운 기능들',
      content: `# React 19: 혁신적인 개발자 경험의 시작

React 19는 2024년 12월 5일에 안정적으로 릴리스되었으며, 이는 React 생태계의 새로운 시대를 열었습니다. 이번 업데이트는 단순한 기능 추가가 아닌, 개발자들이 더 직관적이고 효율적으로 React 애플리케이션을 구축할 수 있도록 하는 근본적인 변화를 가져왔습니다.

## 🚀 핵심 혁신: Actions 시스템

### Actions란 무엇인가?
Actions는 React 19의 가장 중요한 새로운 기능으로, 비동기 작업을 선언적으로 처리할 수 있게 해주는 시스템입니다. 기존의 복잡한 상태 관리 로직을 자동화하여 개발자가 비즈니스 로직에 집중할 수 있도록 합니다.

### 1. 액션 (Actions) - 비동기 작업의 혁신

**기존 React 18 이전의 복잡한 패턴:**
\`\`\`jsx
function UpdateName() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsPending(true);
      setError(null);
      setIsSuccess(false);
      
      const result = await updateName(name);
      
      if (result.success) {
        setIsSuccess(true);
        redirect("/profile");
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setIsPending(false);
    }
  };

  return (
    <div>
      <input 
        value={name} 
        onChange={(e) => setName(e.target.value)}
        disabled={isPending}
      />
      <button 
        onClick={handleSubmit} 
        disabled={isPending || !name.trim()}
      >
        {isPending ? "업데이트 중..." : "업데이트"}
      </button>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {isSuccess && <p style={{color: 'green'}}>성공적으로 업데이트되었습니다!</p>}
    </div>
  );
}
\`\`\`

**React 19의 간단하고 직관적인 Actions:**
\`\`\`jsx
function UpdateName() {
  const [name, setName] = useState("");
  
  // Actions를 사용한 비동기 처리
  const handleSubmit = async () => {
    'use server'; // 서버 액션 표시
    
    try {
      const result = await updateName(name);
      if (result.success) {
        redirect("/profile");
      }
      return { error: result.error };
    } catch (err) {
      return { error: err.message };
    }
  };

  return (
    <form action={handleSubmit}>
      <input 
        name="name"
        value={name} 
        onChange={(e) => setName(e.target.value)}
      />
      <button type="submit">업데이트</button>
    </form>
  );
}
\`\`\`

### 2. useActionState - 폼 상태 관리의 혁신

**기존의 복잡한 폼 상태 관리:**
\`\`\`jsx
function ChangeName() {
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError("이름을 입력해주세요");
      return;
    }

    setIsPending(true);
    setError(null);
    
    try {
      const result = await updateName(name);
      if (result.success) {
        setIsSuccess(true);
        setName("");
        setTimeout(() => setIsSuccess(false), 3000);
      } else {
        setError(result.error);
      }
    } catch (err) {
      setError("서버 오류가 발생했습니다");
    } finally {
      setIsPending(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isPending}
        placeholder="새로운 이름을 입력하세요"
      />
      <button type="submit" disabled={isPending || !name.trim()}>
        {isPending ? "변경 중..." : "이름 변경"}
      </button>
      {error && <p style={{color: 'red'}}>{error}</p>}
      {isSuccess && <p style={{color: 'green'}}>이름이 성공적으로 변경되었습니다!</p>}
    </form>
  );
}
\`\`\`

**React 19의 useActionState 활용:**
\`\`\`jsx
function ChangeName() {
  const [name, setName] = useState("");
  
  const [state, formAction, isPending] = useActionState(
    async (prevState, formData) => {
      const newName = formData.get("name");
      
      if (!newName.trim()) {
        return { error: "이름을 입력해주세요", success: false };
      }

      try {
        const result = await updateName(newName);
        if (result.success) {
          setName("");
          return { error: null, success: true, message: "이름이 성공적으로 변경되었습니다!" };
        } else {
          return { error: result.error, success: false };
        }
      } catch (err) {
        return { error: "서버 오류가 발생했습니다", success: false };
      }
    },
    { error: null, success: false, message: "" }
  );

  return (
    <form action={formAction}>
      <input
        type="text"
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        disabled={isPending}
        placeholder="새로운 이름을 입력하세요"
      />
      <button type="submit" disabled={isPending || !name.trim()}>
        {isPending ? "변경 중..." : "이름 변경"}
      </button>
      {state.error && <p style={{color: 'red'}}>{state.error}</p>}
      {state.success && <p style={{color: 'green'}}>{state.message}</p>}
    </form>
  );
}
\`\`\`

### 3. useOptimistic - 즉각적인 사용자 경험

**기존의 낙관적 업데이트 구현:**
\`\`\`jsx
function TodoList({ todos, onAddTodo }) {
  const [optimisticTodos, setOptimisticTodos] = useState(todos);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddTodo = async (text) => {
    const newTodo = {
      id: Date.now(),
      text,
      completed: false,
      pending: true
    };

    // 낙관적 업데이트
    setOptimisticTodos(prev => [...prev, newTodo]);
    setIsAdding(true);

    try {
      const result = await onAddTodo(text);
      
      // 성공 시 실제 데이터로 교체
      setOptimisticTodos(prev => 
        prev.map(todo => 
          todo.id === newTodo.id 
            ? { ...result, pending: false }
            : todo
        )
      );
    } catch (error) {
      // 실패 시 낙관적 업데이트 롤백
      setOptimisticTodos(prev => 
        prev.filter(todo => todo.id !== newTodo.id)
      );
      alert("할 일 추가에 실패했습니다");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div>
      {optimisticTodos.map(todo => (
        <div 
          key={todo.id} 
          style={{ 
            opacity: todo.pending ? 0.6 : 1,
            backgroundColor: todo.pending ? '#f0f0f0' : 'white'
          }}
        >
          {todo.text}
          {todo.pending && <span> (저장 중...)</span>}
        </div>
      ))}
      <AddTodoForm onSubmit={handleAddTodo} disabled={isAdding} />
    </div>
  );
}
\`\`\`

**React 19의 useOptimistic 활용:**
\`\`\`jsx
function TodoList({ todos, onAddTodo }) {
  const [optimisticTodos, addOptimisticTodo] = useOptimistic(
    todos,
    (state, newTodo) => [
      ...state, 
      { 
        ...newTodo, 
        id: Date.now(),
        pending: true,
        timestamp: Date.now()
      }
    ]
  );

  const handleAddTodo = async (formData) => {
    const text = formData.get("text");
    
    // 낙관적 업데이트 즉시 적용
    addOptimisticTodo({
      text,
      completed: false
    });

    try {
      await onAddTodo(text);
      // 성공 시 자동으로 pending 상태 해제
    } catch (error) {
      // 실패 시 자동으로 롤백
      console.error("할 일 추가 실패:", error);
    }
  };

  return (
    <div>
      {optimisticTodos.map(todo => (
        <div 
          key={todo.id} 
          style={{ 
            opacity: todo.pending ? 0.6 : 1,
            backgroundColor: todo.pending ? '#f0f0f0' : 'white',
            transition: 'all 0.2s ease'
          }}
        >
          {todo.text}
          {todo.pending && (
            <span style={{color: '#666', fontSize: '0.8em'}}> 
              (저장 중...)
            </span>
          )}
        </div>
      ))}
      <form action={handleAddTodo}>
        <input name="text" required placeholder="새로운 할 일" />
        <button type="submit">추가</button>
      </form>
    </div>
  );
}
\`\`\`

## 🎯 성능 최적화: 리소스 사전 로드 API

### 4. 리소스 사전 로드 API - 웹 성능의 혁신

**기존의 수동 리소스 최적화:**
\`\`\`jsx
function MyComponent() {
  useEffect(() => {
    // 폰트 사전 로드
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap';
    fontLink.crossOrigin = 'anonymous';
    document.head.appendChild(fontLink);

    // 이미지 사전 로드
    const imageLink = document.createElement('link');
    imageLink.rel = 'preload';
    imageLink.as = 'image';
    imageLink.href = 'https://example.com/hero-image.jpg';
    document.head.appendChild(imageLink);

    // DNS 사전 확인
    const dnsLink = document.createElement('link');
    dnsLink.rel = 'dns-prefetch';
    dnsLink.href = 'https://api.example.com';
    document.head.appendChild(dnsLink);

    // 연결 사전 설정
    const connectLink = document.createElement('link');
    connectLink.rel = 'preconnect';
    connectLink.href = 'https://cdn.example.com';
    document.head.appendChild(connectLink);

    // 정리 함수
    return () => {
      document.head.removeChild(fontLink);
      document.head.removeChild(imageLink);
      document.head.removeChild(dnsLink);
      document.head.removeChild(connectLink);
    };
  }, []);

  return <div>컴포넌트 내용</div>;
}
\`\`\`

**React 19의 리소스 사전 로드 API:**
\`\`\`jsx
import { preload, prefetchDNS, preconnect, preloadModule } from 'react-dom';

function MyComponent() {
  useEffect(() => {
    // 폰트 사전 로드
    preload('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&display=swap', { 
      as: 'font',
      crossOrigin: 'anonymous'
    });

    // 이미지 사전 로드
    preload('https://example.com/hero-image.jpg', { 
      as: 'image',
      media: '(min-width: 768px)' // 반응형 조건
    });

    // CSS 사전 로드
    preload('https://cdn.example.com/critical-styles.css', { 
      as: 'style' 
    });

    // JavaScript 모듈 사전 로드
    preloadModule('https://cdn.example.com/analytics.js');

    // DNS 사전 확인
    prefetchDNS('https://api.example.com');
    prefetchDNS('https://cdn.example.com');

    // 연결 사전 설정
    preconnect('https://api.example.com', { 
      crossOrigin: 'anonymous' 
    });
    preconnect('https://cdn.example.com');

    // 정리 함수는 필요 없음 - React가 자동으로 관리
  }, []);

  return <div>컴포넌트 내용</div>;
}
\`\`\`

## 🔧 확장성: 커스텀 엘리먼트 지원

### 5. 커스텀 엘리먼트 - 웹 컴포넌트와의 완벽한 통합

**기존의 제한적인 커스텀 엘리먼트 사용:**
\`\`\`jsx
function MyComponent() {
  useEffect(() => {
    // 커스텀 엘리먼트 정의
    if (!customElements.get('my-counter')) {
      class MyCounter extends HTMLElement {
        constructor() {
          super();
          this.count = 0;
          this.render();
        }

        render() {
          this.innerHTML = \`
            <div>
              <span>Count: \${this.count}</span>
              <button onclick="this.parentElement.increment()">+</button>
            </div>
          \`;
        }

        increment() {
          this.count++;
          this.render();
        }
      }

      customElements.define('my-counter', MyCounter);
    }
  }, []);

  return (
    <div>
      <my-counter></my-counter>
    </div>
  );
}
\`\`\`

**React 19의 완벽한 커스텀 엘리먼트 지원:**
\`\`\`jsx
function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      {/* React 상태와 완벽하게 연동 */}
      <my-counter
        count={count}
        onIncrement={() => setCount(prev => prev + 1)}
        onDecrement={() => setCount(prev => prev - 1)}
        data-custom-attribute="hello"
        style={{ 
          '--counter-color': count > 5 ? 'red' : 'blue',
          '--counter-size': Math.max(16, count * 2) + 'px'
        }}
      >
        <span slot="label">React 19 카운터</span>
      </my-counter>

      {/* 이벤트 리스너도 자연스럽게 작동 */}
      <my-chart
        data={chartData}
        onDataPointClick={(e) => {
          console.log('차트 클릭:', e.detail);
          setSelectedPoint(e.detail);
        }}
        onZoom={(e) => {
          console.log('줌 레벨:', e.detail.zoom);
        }}
      />
    </div>
  );
}
\`\`\`

## 🎨 실제 프로젝트에서의 활용 사례

### 실무 적용 예시 1: 이커머스 상품 관리

\`\`\`jsx
function ProductManagement() {
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // 상품 추가 액션
  const addProduct = async (formData) => {
    'use server';
    
    const productData = {
      name: formData.get('name'),
      price: parseFloat(formData.get('price')),
      category: formData.get('category'),
      description: formData.get('description')
    };

    try {
      const newProduct = await createProduct(productData);
      return { success: true, product: newProduct };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // 상품 삭제 액션
  const deleteProduct = async (productId) => {
    'use server';
    
    try {
      await removeProduct(productId);
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  return (
    <div>
      <h2>상품 관리</h2>
      
      {/* 상품 추가 폼 */}
      <form action={addProduct}>
        <input name="name" placeholder="상품명" required />
        <input name="price" type="number" step="0.01" placeholder="가격" required />
        <select name="category">
          <option value="electronics">전자제품</option>
          <option value="clothing">의류</option>
          <option value="books">도서</option>
        </select>
        <textarea name="description" placeholder="상품 설명"></textarea>
        <button type="submit">상품 추가</button>
      </form>

      {/* 상품 목록 */}
      <div className="product-grid">
        {products
          .filter(p => selectedCategory === 'all' || p.category === selectedCategory)
          .map(product => (
            <div key={product.id} className="product-card">
              <h3>{product.name}</h3>
              <p>가격: ₩{product.price.toLocaleString()}</p>
              <p>카테고리: {product.category}</p>
              <form action={deleteProduct}>
                <input type="hidden" name="productId" value={product.id} />
                <button type="submit" className="delete-btn">삭제</button>
              </form>
            </div>
          ))}
      </div>
    </div>
  );
}
\`\`\`

### 실무 적용 예시 2: 실시간 채팅 애플리케이션

\`\`\`jsx
function ChatApplication() {
  const [messages, setMessages] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // 메시지 전송 액션
  const sendMessage = async (formData) => {
    'use server';
    
    const messageText = formData.get('message');
    const userId = formData.get('userId');
    
    try {
      const newMessage = await createMessage({
        text: messageText,
        userId,
        timestamp: new Date().toISOString()
      });
      
      return { success: true, message: newMessage };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  // 낙관적 업데이트로 즉각적인 피드백
  const [optimisticMessages, addOptimisticMessage] = useOptimistic(
    messages,
    (state, newMessage) => [
      ...state,
      {
        ...newMessage,
        id: Date.now(),
        pending: true,
        timestamp: new Date().toISOString()
      }
    ]
  );

  const handleSendMessage = async (formData) => {
    const messageText = formData.get('message');
    
    // 낙관적 업데이트
    addOptimisticMessage({
      text: messageText,
      userId: 'current-user',
      pending: true
    });

    try {
      const result = await sendMessage(formData);
      if (result.success) {
        // 성공 시 pending 상태 자동 해제
        console.log('메시지 전송 성공');
      }
    } catch (error) {
      console.error('메시지 전송 실패:', error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {optimisticMessages.map(message => (
          <div 
            key={message.id} 
            className={\`message \${message.pending ? 'pending' : ''}\`}
          >
            <span className="user">{message.userId}</span>
            <span className="text">{message.text}</span>
            {message.pending && <span className="status">전송 중...</span>}
          </div>
        ))}
      </div>

      <form action={handleSendMessage} className="message-form">
        <input 
          name="message" 
          placeholder="메시지를 입력하세요..." 
          required 
        />
        <input type="hidden" name="userId" value="current-user" />
        <button type="submit">전송</button>
      </form>
    </div>
  );
}
\`\`\`

## 🚀 마이그레이션 전략 및 체크리스트

### 단계별 마이그레이션 계획

#### 1단계: 의존성 업데이트 및 기본 설정
- [ ] React 19 설치: \`npm install react@19 react-dom@19\`
- [ ] TypeScript 타입 업데이트: \`npm install @types/react@19 @types/react-dom@19\`
- [ ] Next.js 사용 시: \`npm install next@15\` (React 19 지원)
- [ ] 기존 코드의 호환성 검사 실행

#### 2단계: Actions 시스템 도입
- [ ] 간단한 폼 컴포넌트부터 Actions 적용
- [ ] 기존 \`useState\` + \`useEffect\` 패턴을 Actions로 점진적 교체
- [ ] 에러 처리 로직을 Actions의 자동 에러 처리로 변경
- [ ] 로딩 상태 관리를 Actions의 자동 pending 상태로 변경

#### 3단계: useOptimistic 활용
- [ ] 사용자 상호작용이 많은 컴포넌트에 useOptimistic 적용
- [ ] 낙관적 업데이트 로직을 useOptimistic으로 단순화
- [ ] 실패 시 롤백 로직 검증

#### 4단계: 성능 최적화
- [ ] 리소스 사전 로드 API 적용
- [ ] 폰트, 이미지, 스타일시트 사전 로드 설정
- [ ] API 엔드포인트 DNS 사전 확인 및 연결 사전 설정
- [ ] 성능 측정 및 개선 효과 검증

#### 5단계: 고급 기능 활용
- [ ] 커스텀 엘리먼트 통합
- [ ] 새로운 에러 바운더리 옵션 활용
- [ ] Suspense와 Actions의 조합으로 더 나은 로딩 상태 관리

### 마이그레이션 시 주의사항

#### 1. 호환성 이슈
- **useTransition 변경**: React 19에서 useTransition의 동작이 변경됨
- **에러 바운더리**: 새로운 에러 처리 옵션 도입
- **서드파티 라이브러리**: 일부 라이브러리가 React 19와 호환되지 않을 수 있음

#### 2. 성능 고려사항
- **Actions의 자동 상태 관리**: 불필요한 리렌더링 방지
- **리소스 사전 로드**: 초기 로딩 성능 향상
- **낙관적 업데이트**: 사용자 경험 개선

#### 3. 테스트 전략
- **단위 테스트**: Actions의 동작 검증
- **통합 테스트**: 폼 제출 및 상태 변화 검증
- **성능 테스트**: 리소스 사전 로드 효과 측정

## 💡 React 19의 미래와 영향

### 개발자 경험의 혁신
React 19는 단순한 기능 추가가 아닌, React 개발의 패러다임을 바꾸는 혁신입니다. Actions 시스템을 통해 개발자들은 복잡한 상태 관리 로직에 시간을 낭비하지 않고, 사용자 경험과 비즈니스 로직에 집중할 수 있게 되었습니다.

### 웹 성능의 새로운 기준
리소스 사전 로드 API는 웹 성능 최적화의 새로운 표준을 제시합니다. 개발자들이 수동으로 관리해야 했던 리소스 최적화를 React가 자동으로 처리하여, 더 빠르고 반응성 좋은 웹 애플리케이션을 쉽게 구축할 수 있게 되었습니다.

### 확장성과 유연성
커스텀 엘리먼트 지원은 React 생태계를 웹 컴포넌트와 완벽하게 통합시킵니다. 이는 기존 HTML 요소들과의 호환성을 유지하면서도, React의 강력한 상태 관리와 렌더링 시스템을 활용할 수 있게 해줍니다.

## 📚 추가 자료 및 학습 리소스

더 자세한 내용과 최신 정보는 [React 19 공식 문서](https://ko.react.dev/blog/2024/12/05/react-19)를 참고하세요. 공식 문서에는 각 기능의 상세한 사용법과 예시 코드가 포함되어 있어, 실무 적용에 도움이 될 것입니다.

### 추천 학습 순서
1. **Actions 기본 개념** - 비동기 작업의 자동화 이해
2. **useActionState** - 폼 상태 관리의 단순화
3. **useOptimistic** - 낙관적 업데이트의 구현
4. **리소스 사전 로드 API** - 성능 최적화 기법
5. **커스텀 엘리먼트** - 웹 컴포넌트와의 통합

React 19는 React 생태계의 새로운 시작점이며, 이번 업데이트를 통해 구축된 애플리케이션들은 더 나은 성능, 더 나은 사용자 경험, 그리고 더 나은 개발자 경험을 제공할 것입니다.`,
      category: 'React',
      postType: 'react19',
      tags: [
        'React',
        'React19',
        'Frontend',
        'JavaScript',
        'Actions',
        'useOptimistic',
      ],
    }),
    createBlogPost({
      id: 2,
      title: 'TypeScript 5.9의 새로운 기능들',
      content: `# TypeScript 5.9: 개발자 경험의 새로운 진보

2025년 8월 1일, Microsoft가 TypeScript 5.9를 공식 발표했습니다! 이번 릴리스는 개발자들의 생산성을 크게 향상시키는 혁신적인 기능들과 최적화를 포함하고 있으며, TypeScript 7.0을 위한 중요한 준비 단계이기도 합니다.

## 🚀 주요 새로운 기능

### 1. 최소화되고 업데이트된 tsc --init

기존의 \`tsc --init\` 명령어는 너무 많은 주석과 설정으로 인해 복잡했습니다. TypeScript 5.9에서는 이를 대폭 개선했습니다.

**기존 방식의 문제점:**
- 과도하게 많은 주석 처리된 설정들
- 개발자들이 대부분의 내용을 즉시 삭제하는 패턴
- 실제로는 에디터의 자동완성이나 공식 문서를 더 선호

**TypeScript 5.9의 새로운 접근:**
\`\`\`json
{
  // Visit https://aka.ms/tsconfig to read more about this file
  "compilerOptions": {
    // File Layout
    // "rootDir": "./src",
    // "outDir": "./dist",

    // Environment Settings
    "module": "nodenext",
    "target": "esnext",
    "types": [],

    // Other Outputs
    "sourceMap": true,
    "declaration": true,
    "declarationMap": true,

    // Stricter Typechecking Options
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,

    // Recommended Options
    "strict": true,
    "jsx": "react-jsx",
    "verbatimModuleSyntax": true,
    "isolatedModules": true,
    "noUncheckedSideEffectImports": true,
    "moduleDetection": "force",
    "skipLibCheck": true,
  }
}
\`\`\`

### 2. import defer 지원

ECMAScript의 지연된 모듈 평가 제안을 지원하는 새로운 \`import defer\` 구문이 추가되었습니다.

**기본 사용법:**
\`\`\`typescript
// 모듈을 즉시 실행하지 않고 가져오기
import defer * as feature from "./some-feature.js";

// 실제로 접근할 때까지 모듈이 실행되지 않음
console.log(feature.specialConstant); // 이때 모듈 실행
\`\`\`

**실제 사용 예시:**
\`\`\`typescript
// ./some-feature.ts
initializationWithSideEffects();

function initializationWithSideEffects() {
  specialConstant = 42;
  console.log("사이드 이펙트가 발생했습니다!");
}

export let specialConstant: number;
\`\`\`

\`\`\`typescript
// main.ts
import defer * as feature from "./some-feature.js";

// 아직 사이드 이펙트가 발생하지 않음
console.log("모듈을 가져왔지만 실행되지 않음");

// 이때 처음으로 모듈이 실행됨
console.log(feature.specialConstant); // 42
\`\`\`

**제한사항:**
\`\`\`typescript
// ❌ 허용되지 않음
import defer { doSomething } from "some-module";
import defer defaultExport from "some-module";

// ✅ 올바른 사용법
import defer * as feature from "some-module";
\`\`\`

### 3. --module node20 지원

Node.js 20의 모듈 시스템을 완벽하게 지원하는 새로운 모듈 설정이 추가되었습니다.

\`\`\`json
{
  "compilerOptions": {
    "module": "node20",
    "target": "es2022"
  }
}
\`\`\`

이 설정을 사용하면 Node.js 20의 최신 모듈 기능들을 안전하게 활용할 수 있습니다.

### 4. DOM API 요약 설명

DOM API에 대한 더 나은 IntelliSense 지원이 추가되었습니다. 이제 DOM 메서드와 속성에 대한 간단한 설명을 에디터에서 바로 확인할 수 있습니다.

\`\`\`typescript
// 호버하면 상세한 설명이 나타남
document.querySelector('.my-element'); 
// "CSS 선택자와 일치하는 첫 번째 요소를 반환합니다"

element.addEventListener('click', handler);
// "지정된 이벤트 타입에 대한 이벤트 리스너를 추가합니다"
\`\`\`

### 5. 확장 가능한 호버 (프리뷰)

복잡한 타입 정보를 더 잘 탐색할 수 있는 새로운 호버 기능이 프리뷰로 제공됩니다.

**새로운 기능:**
- 호버 툴팁에서 \`+\` 버튼을 클릭하여 타입을 더 자세히 확장
- \`-\` 버튼을 클릭하여 이전 뷰로 축소
- 복잡한 제네릭 타입도 단계별로 탐색 가능

\`\`\`typescript
type ComplexType<T> = {
  data: T;
  meta: {
    timestamp: Date;
    version: string;
    nested: {
      deep: {
        value: T[];
      }
    }
  }
}

// 호버 시 단계별로 확장하여 확인 가능
const example: ComplexType<User> = /* ... */;
\`\`\`

### 6. 구성 가능한 최대 호버 길이

호버 툴팁의 길이를 사용자가 설정할 수 있게 되었습니다.

**VS Code 설정:**
\`\`\`json
{
  "js/ts.hover.maximumLength": 5000
}
\`\`\`

기본값도 기존보다 훨씬 큰 값으로 설정되어 더 많은 정보를 볼 수 있습니다.

## 🎯 성능 최적화

### 1. 매퍼에서 인스턴스화 캐싱

복잡한 라이브러리(Zod, tRPC 등)에서 발생하는 성능 문제를 해결하기 위해 타입 인스턴스화 캐싱이 개선되었습니다.

**개선 효과:**
- 중복된 타입 인스턴스화 작업 방지
- 메모리 할당 최적화
- 복잡한 제네릭 타입 처리 속도 향상

### 2. 클로저 생성 최적화

파일 존재 확인 등의 코드 경로에서 불필요한 클로저 생성을 피하도록 최적화되었습니다.

**성능 향상:**
- 대규모 프로젝트에서 약 11% 속도 향상
- 메모리 사용량 감소
- 파일 시스템 접근 최적화

## 🔄 주목할 만한 행동 변화

### 1. lib.d.ts 변경사항

DOM 타입 생성에 변화가 있어 기존 코드에 영향을 줄 수 있습니다.

**주요 변경사항:**
- \`ArrayBuffer\`가 더 이상 여러 \`TypedArray\` 타입의 상위 타입이 아님
- \`Buffer\` (Node.js)와 관련된 타입 관계 변화

**일반적인 에러 메시지:**
\`\`\`typescript
// 다음과 같은 에러가 발생할 수 있습니다
error TS2345: Argument of type 'ArrayBufferLike' is not assignable to parameter of type 'BufferSource'.
error TS2322: Type 'ArrayBufferLike' is not assignable to type 'ArrayBuffer'.
error TS2322: Type 'Buffer' is not assignable to type 'Uint8Array<ArrayBufferLike>'.
\`\`\`

**해결 방법:**
\`\`\`typescript
// 1. @types/node 업데이트
npm update @types/node --save-dev

// 2. 더 구체적인 타입 지정
let data = new Uint8Array([0, 1, 2, 3, 4]);
- someFunc(data)
+ someFunc(data.buffer) // .buffer 속성 사용

// 3. 명시적 타입 선언
- const arr: Uint8Array = buffer;
+ const arr: Uint8Array<ArrayBuffer> = buffer;
\`\`\`

### 2. 타입 인자 추론 변화

타입 변수 "누출"을 수정하는 과정에서 일부 코드베이스에서 새로운 타입 에러가 발생할 수 있습니다.

**해결 방법:**
\`\`\`typescript
// 제네릭 함수 호출에 명시적인 타입 인자 추가
- someGenericFunction(args)
+ someGenericFunction<SpecificType>(args)
\`\`\`

## 🔮 TypeScript의 미래: 6.0과 7.0

### TypeScript 6.0의 역할
- TypeScript 7.0을 위한 전환점 역할
- 설정 및 타입 검사 동작의 점진적 변화
- API 호환성은 TypeScript 5.9와 완전히 동일

### TypeScript 7.0의 비전
- Native 포트로 완전히 재작성된 버전
- 현재 Visual Studio Code에서 미리 체험 가능
- 획기적인 성능 향상 예상

## 💡 실무 적용 가이드

### 1. 점진적 마이그레이션 전략

**단계 1: 기본 업그레이드**
\`\`\`bash
npm install -D typescript@5.9
\`\`\`

**단계 2: 새로운 기능 활용**
\`\`\`typescript
// import defer 도입
import defer * as heavyModule from './expensive-initialization';

// 조건부 로딩
if (shouldLoadFeature) {
  await heavyModule.initialize();
}
\`\`\`

**단계 3: 최적화된 설정 적용**
\`\`\`bash
npx tsc --init  # 새로운 최적화된 tsconfig.json 생성
\`\`\`

### 2. 성능 최적화 체크리스트

- [ ] 복잡한 타입 라이브러리 사용 시 컴파일 시간 측정
- [ ] \`import defer\`를 활용한 조건부 모듈 로딩 검토
- [ ] 새로운 호버 기능으로 개발 경험 개선
- [ ] DOM API 사용 시 새로운 타입 정의 활용

### 3. 문제 해결 가이드

**타입 에러 발생 시:**
1. \`@types/node\` 최신 버전으로 업데이트
2. 더 구체적인 타입 명시
3. 제네릭 함수에 명시적 타입 인자 추가

**성능 이슈 해결:**
1. 복잡한 타입 인스턴스화 패턴 검토
2. 파일 존재 확인 로직 최적화
3. 불필요한 클로저 생성 방지

## 📈 마이그레이션 체크리스트

### 기본 설정
- [ ] TypeScript 5.9 설치
- [ ] 새로운 \`tsc --init\` 실행 및 설정 검토
- [ ] \`@types/node\` 업데이트 (Node.js 사용 시)

### 새 기능 활용
- [ ] \`import defer\` 적용 가능한 모듈 식별
- [ ] \`--module node20\` 설정 검토 (Node.js 20 사용 시)
- [ ] 호버 최대 길이 설정 조정

### 호환성 확인
- [ ] 타입 에러 검토 및 수정
- [ ] DOM 관련 타입 사용 코드 검증
- [ ] 성능 테스트 및 최적화 효과 확인

### 팀 협업
- [ ] 팀원들에게 새로운 기능 공유
- [ ] 코딩 스타일 가이드 업데이트
- [ ] CI/CD 파이프라인에서 TypeScript 버전 업데이트

## 🎉 결론

TypeScript 5.9는 단순한 버전 업데이트가 아닌, 개발자 경험의 근본적인 개선을 가져다주는 중요한 릴리스입니다. 새로운 \`import defer\` 구문부터 성능 최적화, 그리고 TypeScript 7.0을 위한 준비까지, 이번 업데이트는 TypeScript 생태계의 미래를 위한 탄탄한 기반을 마련했습니다.

특히 대규모 프로젝트에서 체감할 수 있는 성능 향상과 개발자 도구의 개선은 일상적인 개발 워크플로우에 실질적인 도움을 제공할 것입니다. 새로운 기능들을 점진적으로 도입하면서 TypeScript 7.0의 혁신적인 변화에 대비해보세요.

## 📚 추가 자료

더 자세한 내용과 최신 정보는 [TypeScript 5.9 공식 발표](https://devblogs.microsoft.com/typescript/announcing-typescript-5-9/)를 참고하세요.

TypeScript 팀의 지속적인 혁신 덕분에 우리는 더 안전하고 효율적인 개발 환경을 누릴 수 있게 되었습니다. 🚀`,
      category: 'TypeScript',
      postType: 'typescript59',
      tags: [
        'TypeScript',
        'TypeScript5.9',
        'Frontend',
        'JavaScript',
        'Performance',
        'Developer Tools',
      ],
    }),
    createBlogPost({
      id: 3,
      title: 'React Effect의 생명주기와 동기화',
      content: `# React Effect의 생명주기와 동기화

React의 useEffect는 컴포넌트와 다른 생명주기를 가집니다. 컴포넌트는 마운트, 업데이트, 마운트 해제할 수 있지만, effect는 동기화를 시작하고 나중에 동기화를 중지하는 두 가지 작업만 할 수 있습니다. 이 사이클은 시간이 지남에 따라 변하는 props와 state에 의존하는 effect의 경우 여러 번 발생할 수 있습니다.

## 🚀 Effect의 생명주기 이해하기

### 컴포넌트 vs Effect 생명주기

**컴포넌트 생명주기:**
- 컴포넌트는 화면에 추가될 때 **마운트**됩니다
- 컴포넌트는 새로운 props나 state를 수신하면 **업데이트**됩니다
- 컴포넌트가 화면에서 제거되면 **마운트가 해제**됩니다

**Effect 생명주기:**
- Effect는 **동기화 시작**만 할 수 있습니다
- Effect는 **동기화 중지**만 할 수 있습니다
- Effect는 컴포넌트와 독립적인 생명주기를 가집니다

### 핵심 개념: 동기화의 관점

Effect를 작성하고 읽을 때는 컴포넌트의 관점(마운트, 업데이트, 마운트 해제)이 아닌 **개별 effect의 관점(동기화 시작 및 중지 방법)**에서 생각해야 합니다.

## 💡 실제 예시: 채팅방 연결

### 기본 구조

\`\`\`jsx
const serverUrl = 'https://localhost:1234';

function ChatRoom({ roomId }) {
  useEffect(() => {
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    
    return () => {
      connection.disconnect();
    };
  }, [roomId]);
  
  // ...
}
\`\`\`

### Effect의 동작 방식

**동기화 시작 (Effect 본문):**
\`\`\`jsx
const connection = createConnection(serverUrl, roomId);
connection.connect();
\`\`\`

**동기화 중지 (Cleanup 함수):**
\`\`\`jsx
return () => {
  connection.disconnect();
};
\`\`\`

## 🔄 동기화가 여러 번 수행되는 이유

### roomId 변경 시나리오

1. **사용자가 "general" 대화방 선택**
   - Effect 실행 → "general" 방에 연결
   
2. **사용자가 "travel" 대화방 선택**
   - 이전 연결 해제 → "travel" 방에 새로 연결
   
3. **사용자가 "music" 대화방 선택**
   - 이전 연결 해제 → "music" 방에 새로 연결

### 왜 이런 동작이 필요한가?

- **효율성**: 사용하지 않는 연결은 즉시 해제
- **리소스 관리**: 메모리 누수 방지
- **실시간성**: 항상 현재 선택된 방과만 연결

## ⚠️ 주의해야 할 함정들

### 1. 의존성 배열 누락

**잘못된 예시:**
\`\`\`jsx
useEffect(() => {
  const connection = createConnection(serverUrl, roomId);
  connection.connect();
  return () => connection.disconnect();
}); // 🔴 의존성 배열 누락!
\`\`\`

**올바른 예시:**
\`\`\`jsx
useEffect(() => {
  const connection = createConnection(serverUrl, roomId);
  connection.connect();
  return () => connection.disconnect();
}, [roomId]); // ✅ roomId 의존성 명시
\`\`\`

### 2. 불필요한 재연결 방지

**문제 상황:**
- 사용자가 메시지 입력 시마다 채팅방 재연결
- 컴포넌트 리렌더링마다 Effect 재실행

**해결 방법:**
- 의존성 배열에 필요한 값만 포함
- 불필요한 값은 useCallback, useMemo로 메모이제이션

## 🎯 Effect 작성의 핵심 원칙

### 1. 각 Effect는 별도의 동기화 프로세스

\`\`\`jsx
// 채팅 연결을 위한 Effect
useEffect(() => {
  // 채팅 연결 로직
}, [roomId]);

// 알림 설정을 위한 Effect
useEffect(() => {
  // 알림 설정 로직
}, [userId]);

// 테마 변경을 위한 Effect
useEffect(() => {
  // 테마 적용 로직
}, [theme]);
\`\`\`

### 2. 반응형 값의 올바른 처리

**반응형 값이란?**
- 컴포넌트 본문 내부에 선언된 모든 변수
- props, state, 컴포넌트 내부 변수
- 시간이 지남에 따라 변경될 수 있는 값

**올바른 의존성 지정:**
\`\`\`jsx
function ChatRoom({ roomId, serverUrl }) {
  const [message, setMessage] = useState('');
  
  useEffect(() => {
    // roomId와 serverUrl은 반응형 값
    const connection = createConnection(serverUrl, roomId);
    connection.connect();
    return () => connection.disconnect();
  }, [roomId, serverUrl]); // ✅ 모든 반응형 값 포함
  
  // message는 Effect에서 사용되지 않으므로 의존성에 포함하지 않음
}
\`\`\`

## 🛠️ 린터 규칙과 디버깅

### React의 린터 규칙

React는 effect의 의존성을 올바르게 지정했는지 확인하는 린터 규칙을 제공합니다:

1. **의존성 누락 감지**: Effect 내부에서 사용된 모든 반응형 값이 의존성 배열에 포함되었는지 확인
2. **불필요한 의존성 감지**: 의존성 배열에 포함되었지만 실제로는 사용되지 않는 값 감지
3. **무한 루프 방지**: 의존성이 변경될 때마다 Effect가 재실행되어 무한 루프가 발생하는지 확인

### 린터 에러 해결 방법

**린터가 의존성을 제안하지만 무한 루프가 발생하는 경우:**

1. **useCallback 사용:**
\`\`\`jsx
const handleSubmit = useCallback((data) => {
  // 제출 로직
}, []); // 의존성 없음

useEffect(() => {
  // handleSubmit 사용
}, [handleSubmit]); // 이제 안전함
\`\`\`

2. **useMemo 사용:**
\`\`\`jsx
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);

useEffect(() => {
  // expensiveValue 사용
}, [expensiveValue]);
\`\`\`

3. **Effect 외부로 로직 이동:**
\`\`\`jsx
// Effect 외부에서 계산
const shouldConnect = roomId && serverUrl;

useEffect(() => {
  if (!shouldConnect) return;
  
  const connection = createConnection(serverUrl, roomId);
  connection.connect();
  return () => connection.disconnect();
}, [shouldConnect, roomId, serverUrl]);
\`\`\`

## 📚 실무에서 자주 마주치는 패턴들

### 1. API 호출 Effect

\`\`\`jsx
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    let cancelled = false;
    
    const fetchUser = async () => {
      setLoading(true);
      try {
        const userData = await fetchUserById(userId);
        if (!cancelled) {
          setUser(userData);
        }
      } catch (error) {
        if (!cancelled) {
          console.error('사용자 정보 로드 실패:', error);
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };
    
    fetchUser();
    
    return () => {
      cancelled = true; // 컴포넌트 언마운트 시 요청 취소
    };
  }, [userId]);
  
  // ...
}
\`\`\`

### 2. 이벤트 리스너 Effect

\`\`\`jsx
function WindowSizeTracker() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });
  
  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []); // 의존성 없음 - 컴포넌트 마운트 시에만 실행
  
  // ...
}
\`\`\`

### 3. 구독 관리 Effect

\`\`\`jsx
function DataSubscription({ dataId }) {
  useEffect(() => {
    const subscription = dataService.subscribe(dataId, (newData) => {
      // 데이터 업데이트 처리
    });
    
    return () => {
      subscription.unsubscribe();
    };
  }, [dataId]);
  
  // ...
}
\`\`\`

## 🎯 요약 및 모범 사례

### 핵심 원칙

1. **Effect는 동기화 도구**: 외부 시스템을 React 상태와 동기화
2. **독립적인 생명주기**: 각 Effect는 별도의 동기화 프로세스
3. **의존성 명시**: 모든 반응형 값을 의존성 배열에 포함
4. **Cleanup 함수**: 리소스 정리를 위한 cleanup 함수 반환

### 모범 사례 체크리스트

- [ ] Effect 내부에서 사용되는 모든 반응형 값을 의존성 배열에 포함
- [ ] Cleanup 함수로 리소스 정리
- [ ] 불필요한 재실행 방지를 위한 useCallback, useMemo 활용
- [ ] 린터 경고 해결 (무시하지 말고 근본 원인 해결)
- [ ] 각 Effect가 단일 책임을 가지도록 설계

### 디버깅 팁

1. **콘솔 로그 추가**: Effect 실행 시점과 의존성 변경 추적
2. **React DevTools**: Effect 실행 상태 모니터링
3. **의존성 배열 검토**: 불필요한 의존성 제거
4. **성능 측정**: Effect 재실행 빈도와 성능 영향 분석

React Effect의 생명주기를 올바르게 이해하고 활용하면, 더 안정적이고 성능이 좋은 애플리케이션을 구축할 수 있습니다. 각 Effect가 언제 실행되고 정리되는지 명확하게 파악하여, 예측 가능한 동작을 구현해보세요! 🚀`,
      category: 'React',
      postType: 'custom',
      tags: [
        'React',
        'useEffect',
        'Lifecycle',
        'Synchronization',
        'Dependencies',
        'Cleanup',
        'Performance',
        'Best Practices',
      ],
    }),
    createBlogPost({
      id: 4,
      title: '커스텀 Hook으로 로직 재사용하기',
      content: `# 커스텀 Hook으로 로직 재사용하기

React는 useState, useContext, useEffect 같은 내장 Hook들을 제공하지만, 때로는 더 구체적인 목적을 가진 Hook이 필요할 때가 있습니다. 예를 들어, 데이터를 가져오거나, 사용자의 온라인 상태를 확인하거나, 채팅방에 연결하는 등의 특정 기능을 위한 Hook 말입니다. React에서 이런 Hook들을 찾기는 어렵지만, 애플리케이션의 필요에 맞는 본인만의 Hook을 만들 수 있습니다.

## 🚀 커스텀 Hook: 컴포넌트간 로직 공유하기

### 네트워크 상태 추적 예시

네트워크에 크게 의존하는 앱을 개발할 때, 사용자가 앱을 사용하는 동안 네트워크가 갑자기 사라진다면 사용자에게 경고하고 싶을 것입니다. 이런 경우 컴포넌트에는 다음 두 가지가 필요합니다:

1. **네트워크가 온라인 상태인지 추적하는 state**
2. **전역 online/offline 이벤트를 구독하고 state를 업데이트하는 Effect**

### 기본 구현

\`\`\`jsx
import { useState, useEffect } from 'react';

export default function StatusBar() {
  const [isOnline, setIsOnline] = useState(true);
  
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    
    function handleOffline() {
      setIsOnline(false);
    }
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  return <h1>{isOnline ? '✅ 온라인' : '❌ 연결 안 됨'}</h1>;
}
\`\`\`

### 문제 상황: 로직 중복

이제 다른 컴포넌트에서 같은 로직을 사용한다고 상상해보세요. 네트워크가 꺼졌을 때 "저장" 대신 "재연결 중..."을 보여주는 비활성화된 저장 버튼을 구현하고 싶다면, 앞서 사용한 \`isOnline\` state와 Effect를 \`SaveButton\` 안에 복사 붙여넣기 할 수 있습니다.

\`\`\`jsx
export default function SaveButton() {
  const [isOnline, setIsOnline] = useState(true);
  
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    
    function handleOffline() {
      setIsOnline(false);
    }
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  function handleSaveClick() {
    console.log('✅ 진행사항 저장됨');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? '진행사항 저장' : '재연결 중...'}
    </button>
  );
}
\`\`\`

**문제점**: 동일한 로직이 두 컴포넌트에 중복되어 있습니다!

## 💡 해결책: 커스텀 Hook 추출

### useOnlineStatus Hook 생성

\`\`\`jsx
import { useState, useEffect } from 'react';

export function useOnlineStatus() {
  const [isOnline, setIsOnline] = useState(true);
  
  useEffect(() => {
    function handleOnline() {
      setIsOnline(true);
    }
    
    function handleOffline() {
      setIsOnline(false);
    }
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return isOnline;
}
\`\`\`

### 개선된 컴포넌트들

**StatusBar 컴포넌트:**
\`\`\`jsx
export default function StatusBar() {
  const isOnline = useOnlineStatus();
  
  return <h1>{isOnline ? '✅ 온라인' : '❌ 연결 안 됨'}</h1>;
}
\`\`\`

**SaveButton 컴포넌트:**
\`\`\`jsx
export default function SaveButton() {
  const isOnline = useOnlineStatus();
  
  function handleSaveClick() {
    console.log('✅ 진행사항 저장됨');
  }

  return (
    <button disabled={!isOnline} onClick={handleSaveClick}>
      {isOnline ? '진행사항 저장' : '재연결 중...'}
    </button>
  );
}
\`\`\`

## 🎯 커스텀 Hook의 핵심 원칙

### 1. Hook 이름 규칙

**✅ 올바른 이름:**
- \`useOnlineStatus\` - use로 시작하고 대문자로 시작
- \`useCounter\` - 구체적이고 명확한 목적
- \`useLocalStorage\` - 기능을 명확히 표현

**❌ 잘못된 이름:**
- \`useMount\` - 용도가 명확하지 않음
- \`getOnlineStatus\` - use로 시작하지 않음
- \`onlineStatus\` - Hook이 아님

### 2. State 로직만 공유, State 자체는 공유하지 않음

**올바른 접근:**
\`\`\`jsx
// ✅ 각 컴포넌트가 독립적인 state를 가짐
function ComponentA() {
  const isOnline = useOnlineStatus(); // 독립적인 state
  return <div>{isOnline ? 'A 온라인' : 'A 오프라인'}</div>;
}

function ComponentB() {
  const isOnline = useOnlineStatus(); // 독립적인 state
  return <div>{isOnline ? 'B 온라인' : 'B 오프라인'}</div>;
}
\`\`\`

**잘못된 접근:**
\`\`\`jsx
// ❌ Hook에서 state를 직접 공유
let sharedIsOnline = true; // 전역 변수 - 안티패턴

export function useOnlineStatus() {
  return sharedIsOnline; // 모든 컴포넌트가 같은 값 공유
}
\`\`\`

### 3. Hook 간 상호작용

**Hook에서 다른 Hook으로 값 전달:**
\`\`\`jsx
function useCounter(delay) {
  const [count, setCount] = useState(0);
  
  useInterval(() => {
    setCount(c => c + 1);
  }, delay);
  
  return count;
}

function useInterval(callback, delay) {
  useEffect(() => {
    if (delay === null) return;
    
    const id = setInterval(callback, delay);
    return () => clearInterval(id);
  }, [delay, callback]);
}
\`\`\`

**중요한 점**: Hook 사이에 전달되는 값은 최신 상태로 유지됩니다!

## 🛠️ 커스텀 Hook에 이벤트 핸들러 전달하기

### 문제 상황

\`\`\`jsx
function useChatRoom(serverUrl, roomId) {
  const [messages, setMessages] = useState([]);
  
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    
    const connection = createConnection(options);
    connection.connect();
    
    connection.on('message', (msg) => {
      setMessages(msgs => [...msgs, msg]);
    });
    
    return () => connection.disconnect();
  }, [serverUrl, roomId]);
  
  return messages;
}
\`\`\`

### 해결책: useEffectEvent 사용

\`\`\`jsx
import { useEffectEvent } from 'react';

function useChatRoom(serverUrl, roomId, onReceiveMessage) {
  const onMessage = useEffectEvent(onReceiveMessage);
  
  useEffect(() => {
    const options = {
      serverUrl: serverUrl,
      roomId: roomId
    };
    
    const connection = createConnection(options);
    connection.connect();
    
    connection.on('message', (msg) => {
      onMessage(msg);
    });
    
    return () => connection.disconnect();
  }, [serverUrl, roomId]);
}

// 사용 예시
function ChatRoom({ roomId }) {
  const [messages, setMessages] = useState([]);
  
  useChatRoom(
    'https://localhost:1234',
    roomId,
    useCallback((msg) => {
      setMessages(msgs => [...msgs, msg]);
    }, [])
  );
  
  return (
    <>
      <h1>Welcome to the {roomId} room!</h1>
      <MessageList messages={messages} />
    </>
  );
}
\`\`\`

## 🎨 고급 패턴: 애니메이션 Hook

### useFadeIn Hook

\`\`\`jsx
import { useState, useEffect } from 'react';
import { FadeInAnimation } from './animation.js';

export function useFadeIn(ref, duration) {
  useEffect(() => {
    const animation = new FadeInAnimation(ref.current);
    animation.start(duration);
    
    return () => {
      animation.stop();
    };
  }, [ref, duration]);
}

// 사용 예시
function Welcome() {
  const ref = useRef(null);
  
  useFadeIn(ref, 1000);
  
  return (
    <h1 ref={ref} className="welcome">
      Welcome
    </h1>
  );
}
\`\`\`

### 애니메이션 클래스

\`\`\`jsx
// animation.js
export class FadeInAnimation {
  constructor(node) {
    this.node = node;
  }
  
  start(duration) {
    this.duration = duration;
    this.onProgress(0);
    this.startTime = performance.now();
    this.frameId = requestAnimationFrame(() => this.onFrame());
  }
  
  onFrame() {
    const timePassed = performance.now() - this.startTime;
    const progress = Math.min(timePassed / this.duration, 1);
    
    this.onProgress(progress);
    
    if (progress < 1) {
      this.frameId = requestAnimationFrame(() => this.onFrame());
    }
  }
  
  onProgress(progress) {
    this.node.style.opacity = progress;
  }
  
  stop() {
    cancelAnimationFrame(this.frameId);
    this.startTime = null;
    this.frameId = null;
    this.duration = 0;
  }
}
\`\`\`

## 🔄 언제 커스텀 Hook을 사용해야 하는가?

### 사용해야 하는 경우

1. **로직 중복**: 여러 컴포넌트에서 동일한 로직 사용
2. **복잡한 상태 관리**: useState와 useEffect를 조합한 복잡한 로직
3. **외부 시스템 연동**: API 호출, 이벤트 리스너, 구독 관리
4. **재사용 가능한 기능**: 카운터, 폼 검증, 로컬 스토리지 등

### 사용하지 말아야 하는 경우

1. **단순한 계산**: 복잡하지 않은 값 변환
2. **일회성 로직**: 특정 컴포넌트에서만 사용되는 로직
3. **UI 렌더링**: 순수하게 UI 관련된 로직
4. **과도한 추상화**: 간단한 로직을 불필요하게 복잡하게 만드는 경우

### 대안적 접근법

**CSS 애니메이션 사용:**
\`\`\`css
.welcome {
  color: white;
  padding: 50px;
  text-align: center;
  font-size: 50px;
  background-image: radial-gradient(circle, rgba(63,94,251,1) 0%, rgba(252,70,107,1) 100%);
  animation: fadeIn 1000ms;
}

@keyframes fadeIn {
  0% { opacity: 0; }
  100% { opacity: 1; }
}
\`\`\`

**일반 함수 사용:**
\`\`\`jsx
function formatDate(date) {
  return new Intl.DateTimeFormat('ko-KR').format(date);
}

// Hook이 필요하지 않음 - 단순한 유틸리티 함수
\`\`\`

## 📚 실무에서 자주 사용되는 커스텀 Hook 패턴들

### 1. API 호출 Hook

\`\`\`jsx
function useApi(endpoint) {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch(endpoint);
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [endpoint]);
  
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  
  return { data, loading, error, refetch: fetchData };
}

// 사용 예시
function UserProfile({ userId }) {
  const { data: user, loading, error } = useApi(\`/api/users/\${userId}\`);
  
  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!user) return <div>사용자를 찾을 수 없습니다</div>;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

### 2. 로컬 스토리지 Hook

\`\`\`jsx
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error('로컬 스토리지 읽기 실패:', error);
      return initialValue;
    }
  });
  
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error('로컬 스토리지 쓰기 실패:', error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setValue];
}

// 사용 예시
function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
  
  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };
  
  return (
    <button onClick={toggleTheme}>
      현재 테마: {theme}
    </button>
  );
}
\`\`\`

### 3. 디바운스 Hook

\`\`\`jsx
function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);
  
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);
  
  return debouncedValue;
}

// 사용 예시
function SearchInput() {
  const [searchTerm, setSearchTerm] = useState('');
  const debouncedSearchTerm = useDebounce(searchTerm, 500);
  
  useEffect(() => {
    if (debouncedSearchTerm) {
      // API 호출 로직
      searchAPI(debouncedSearchTerm);
    }
  }, [debouncedSearchTerm]);
  
  return (
    <input
      type="text"
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
      placeholder="검색어를 입력하세요..."
    />
  );
}
\`\`\`

## 🎯 모범 사례와 주의사항

### 모범 사례

1. **단일 책임 원칙**: 각 Hook은 하나의 명확한 목적만 가져야 함
2. **의존성 최소화**: 필요한 의존성만 포함하고 불필요한 재실행 방지
3. **에러 처리**: 적절한 에러 상태와 로딩 상태 관리
4. **타입 안전성**: TypeScript를 사용하여 타입 안전성 확보
5. **테스트 가능성**: Hook을 독립적으로 테스트할 수 있도록 설계

### 주의사항

1. **무한 루프 방지**: 의존성 배열에 함수나 객체를 직접 포함하지 않기
2. **메모리 누수 방지**: cleanup 함수로 리소스 정리
3. **성능 최적화**: useCallback, useMemo를 적절히 사용
4. **과도한 추상화**: 간단한 로직을 불필요하게 복잡하게 만들지 않기

### 디버깅 팁

1. **React DevTools**: Hook의 상태 변화 추적
2. **의존성 배열 검토**: 불필요한 재실행 원인 파악
3. **콘솔 로그**: Hook 실행 시점과 값 변화 모니터링
4. **린터 규칙**: ESLint 규칙을 활용한 잠재적 문제 감지

## 📋 요약 및 체크리스트

### 핵심 원칙

- **커스텀 Hook은 컴포넌트 간 로직을 공유하는 도구**
- **Hook 이름은 'use'로 시작하고 대문자로 시작**
- **State 로직만 공유, State 자체는 공유하지 않음**
- **Hook 간 상호작용 시 최신 값 유지**
- **이벤트 핸들러는 useEffectEvent로 감싸기**

### 체크리스트

- [ ] 로직 중복이 있는가?
- [ ] Hook 이름이 'use'로 시작하는가?
- [ ] 단일 책임을 가지는가?
- [ ] 적절한 의존성 배열을 사용하는가?
- [ ] cleanup 함수로 리소스를 정리하는가?
- [ ] 에러 상태와 로딩 상태를 관리하는가?
- [ ] TypeScript 타입을 정의했는가?
- [ ] 테스트 가능한가?

### 언제 사용할지 결정하는 기준

1. **복잡성**: useState와 useEffect를 조합한 복잡한 로직
2. **재사용성**: 여러 컴포넌트에서 사용될 가능성
3. **테스트 용이성**: 독립적으로 테스트할 수 있는지
4. **유지보수성**: 로직 변경 시 한 곳에서만 수정 가능한지

커스텀 Hook을 올바르게 사용하면 코드의 재사용성과 유지보수성을 크게 향상시킬 수 있습니다. 하지만 모든 로직을 Hook으로 만들 필요는 없으며, 적절한 균형을 찾는 것이 중요합니다. 각 Hook이 명확한 목적을 가지고, 실제로 재사용될 수 있는지 신중하게 판단하여 설계해보세요! 🚀`,
      category: 'React',
      postType: 'custom',
      tags: [
        'React',
        'Custom Hooks',
        'Logic Reuse',
        'useEffect',
        'State Management',
        'Code Organization',
        'Best Practices',
        'Performance',
      ],
    }),
    createBlogPost({
      id: 5,
      title: '자동로그인 구현의 기술적 도전과 해결책',
      content: `# 자동로그인 구현의 기술적 도전과 해결책

웹 애플리케이션에서 자동로그인은 사용자 경험을 크게 향상시키는 핵심 기능입니다. 하지만 이 기능을 구현하면서 겪게 되는 다양한 기술적 도전과 보안 문제들을 해결하는 것은 개발자에게 중요한 과제입니다. 실제 프로젝트에서 경험한 문제들과 그 해결책을 바탕으로 자동로그인 구현의 모든 것을 정리해보겠습니다.

## 🚀 자동로그인의 핵심 개념과 동작 원리

### 자동로그인이란?

**자동로그인**은 사용자가 한 번 로그인한 후, 브라우저를 닫았다가 다시 열어도 자동으로 로그인 상태를 유지하는 기능입니다. 이는 사용자가 매번 아이디와 비밀번호를 입력할 필요 없이 즉시 서비스를 이용할 수 있게 해줍니다.

### 동작 원리

1. **최초 로그인**: 사용자가 아이디/비밀번호로 로그인
2. **토큰 생성**: 서버에서 JWT나 세션 토큰 발급
3. **토큰 저장**: 클라이언트에 토큰을 안전하게 저장
4. **자동 인증**: 페이지 새로고침 시 저장된 토큰으로 자동 인증
5. **토큰 갱신**: 토큰 만료 시 자동으로 새로운 토큰 발급

## 💡 실제 프로젝트에서 겪은 문제들

### 1. 토큰 저장 방식의 선택

**문제 상황**: JWT 토큰을 어디에 저장할지 결정해야 했습니다.

**고려사항:**
- **localStorage**: 간단하지만 XSS 공격에 취약
- **sessionStorage**: 탭별로 독립적이지만 탭 닫으면 사라짐
- **httpOnly 쿠키**: 보안성은 높지만 CSRF 공격 위험
- **메모리**: 가장 안전하지만 새로고침 시 사라짐

**최종 선택**: httpOnly 쿠키 + 메모리 조합
\`\`\`jsx
// 토큰 저장 전략
const tokenStorage = {
  // 메모리에 액세스 토큰 저장 (XSS 방지)
  accessToken: null,
  
  // httpOnly 쿠키에 리프레시 토큰 저장 (보안성)
  refreshToken: 'httpOnly 쿠키로 자동 설정',
  
  // 로컬 스토리지에 사용자 기본 정보만 저장
  userInfo: localStorage.getItem('userInfo')
};
\`\`\`

### 2. 토큰 만료 처리의 복잡성

**문제 상황**: 액세스 토큰이 만료되었을 때 사용자 경험을 끊기지 않게 하는 것이 어려웠습니다.

**발생한 문제들:**
- 토큰 만료 시 API 호출 실패
- 사용자가 갑자기 로그아웃되는 상황
- 여러 API 호출이 동시에 실패하는 경우

**해결책**: 토큰 갱신 인터셉터 구현
\`\`\`jsx
// axios 인터셉터로 토큰 갱신 처리
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  timeout: 10000,
});

// 요청 인터셉터: 토큰 자동 추가
apiClient.interceptors.request.use(
  (config) => {
    const token = getAccessToken();
    if (token) {
      config.headers.Authorization = \`Bearer \${token}\`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// 응답 인터셉터: 토큰 만료 시 자동 갱신
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // 리프레시 토큰으로 새로운 액세스 토큰 발급
        const newToken = await refreshAccessToken();
        setAccessToken(newToken);
        
        // 실패했던 요청 재시도
        originalRequest.headers.Authorization = \`Bearer \${newToken}\`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // 리프레시 토큰도 만료된 경우 로그아웃
        logout();
        return Promise.reject(refreshError);
      }
    }
    
    return Promise.reject(error);
  }
);
\`\`\`

### 3. 동시 요청 시 토큰 갱신 중복 문제

**문제 상황**: 여러 API 호출이 동시에 401 에러를 받으면 토큰 갱신이 여러 번 실행되는 문제가 발생했습니다.

**해결책**: 토큰 갱신 요청을 하나로 제한
\`\`\`jsx
class TokenManager {
  constructor() {
    this.refreshPromise = null;
    this.isRefreshing = false;
  }
  
  async refreshToken() {
    // 이미 갱신 중이면 기존 Promise 반환
    if (this.isRefreshing) {
      return this.refreshPromise;
    }
    
    this.isRefreshing = true;
    this.refreshPromise = this.performRefresh();
    
    try {
      const result = await this.refreshPromise;
      return result;
    } finally {
      this.isRefreshing = false;
      this.refreshPromise = null;
    }
  }
  
  async performRefresh() {
    try {
      const response = await apiClient.post('/auth/refresh', {
        refreshToken: getRefreshToken()
      });
      
      const { accessToken } = response.data;
      setAccessToken(accessToken);
      
      return accessToken;
    } catch (error) {
      // 갱신 실패 시 로그아웃
      logout();
      throw error;
    }
  }
}

const tokenManager = new TokenManager();
\`\`\`

## 🛡️ 보안 고려사항과 해결책

### 1. XSS 공격 방지

**문제**: localStorage나 sessionStorage에 토큰을 저장하면 XSS 공격에 취약합니다.

**해결책**: httpOnly 쿠키 사용
\`\`\`jsx
// 서버 측 쿠키 설정 (Node.js/Express 예시)
app.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await validateUser(email, password);
    
    if (user) {
      const accessToken = generateAccessToken(user);
      const refreshToken = generateRefreshToken(user);
      
      // httpOnly 쿠키로 리프레시 토큰 설정
      res.cookie('refreshToken', refreshToken, {
        httpOnly: true,        // JavaScript에서 접근 불가
        secure: true,          // HTTPS에서만 전송
        sameSite: 'strict',    // CSRF 공격 방지
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7일
        path: '/'
      });
      
      // 액세스 토큰은 응답 본문으로 전송
      res.json({
        success: true,
        accessToken,
        user: {
          id: user.id,
          email: user.email,
          name: user.name
        }
      });
    } else {
      res.status(401).json({ success: false, message: '로그인 실패' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: '서버 오류' });
  }
});
\`\`\`

### 2. CSRF 공격 방지

**문제**: httpOnly 쿠키를 사용하면 CSRF 공격 위험이 있습니다.

**해결책**: CSRF 토큰과 SameSite 쿠키 설정
\`\`\`jsx
// CSRF 토큰 생성 및 검증
app.use((req, res, next) => {
  if (req.method === 'GET') {
    // GET 요청 시 CSRF 토큰 생성
    const csrfToken = crypto.randomBytes(32).toString('hex');
    res.cookie('csrfToken', csrfToken, {
      httpOnly: false,  // JavaScript에서 접근 가능
      secure: true,
      sameSite: 'strict'
    });
  }
  next();
});

// POST/PUT/DELETE 요청 시 CSRF 토큰 검증
app.use('/auth', (req, res, next) => {
  if (['POST', 'PUT', 'DELETE'].includes(req.method)) {
    const { csrfToken } = req.body;
    const cookieToken = req.cookies.csrfToken;
    
    if (!csrfToken || !cookieToken || csrfToken !== cookieToken) {
      return res.status(403).json({ 
        success: false, 
        message: 'CSRF 토큰이 유효하지 않습니다' 
      });
    }
  }
  next();
});
\`\`\`

### 3. 토큰 탈취 대응

**문제**: 토큰이 탈취되었을 때의 대응 방안이 필요합니다.

**해결책**: 토큰 블랙리스트와 사용자별 토큰 관리
\`\`\`jsx
// 토큰 블랙리스트 관리
class TokenBlacklist {
  constructor() {
    this.blacklist = new Set();
  }
  
  // 토큰 블랙리스트에 추가
  blacklistToken(token) {
    this.blacklist.add(token);
    
    // Redis나 데이터베이스에 저장 (영구 보존)
    this.persistToStorage(token);
  }
  
  // 토큰이 블랙리스트에 있는지 확인
  isBlacklisted(token) {
    return this.blacklist.has(token);
  }
  
  // 로그아웃 시 모든 토큰 무효화
  async invalidateAllUserTokens(userId) {
    try {
      // 데이터베이스에서 사용자의 모든 토큰 무효화
      await db.query(
        'UPDATE user_tokens SET is_valid = false WHERE user_id = ?',
        [userId]
      );
      
      // 현재 세션의 토큰도 블랙리스트에 추가
      const currentToken = getCurrentToken();
      if (currentToken) {
        this.blacklistToken(currentToken);
      }
    } catch (error) {
      console.error('토큰 무효화 실패:', error);
    }
  }
}

const tokenBlacklist = new TokenBlacklist();
\`\`\`

## 🔄 자동로그인 상태 관리 구현

### 1. React Context를 활용한 전역 상태 관리

\`\`\`jsx
// AuthContext.js
import React, { createContext, useContext, useReducer, useEffect } from 'react';

const AuthContext = createContext();

const initialState = {
  isAuthenticated: false,
  user: null,
  accessToken: null,
  isLoading: true,
  error: null
};

const authReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN_START':
      return { ...state, isLoading: true, error: null };
      
    case 'LOGIN_SUCCESS':
      return {
        ...state,
        isAuthenticated: true,
        user: action.payload.user,
        accessToken: action.payload.accessToken,
        isLoading: false,
        error: null
      };
      
    case 'LOGIN_FAILURE':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
        isLoading: false,
        error: action.payload
      };
      
    case 'LOGOUT':
      return {
        ...state,
        isAuthenticated: false,
        user: null,
        accessToken: null,
        isLoading: false,
        error: null
      };
      
    case 'TOKEN_REFRESHED':
      return {
        ...state,
        accessToken: action.payload.accessToken
      };
      
    default:
      return state;
  }
};

export const AuthProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);
  
  // 앱 시작 시 자동로그인 시도
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const token = getAccessToken();
        if (token) {
          // 토큰 유효성 검증
          const user = await validateToken(token);
          if (user) {
            dispatch({
              type: 'LOGIN_SUCCESS',
              payload: { user, accessToken: token }
            });
          } else {
            // 토큰이 유효하지 않으면 제거
            removeAccessToken();
          }
        }
      } catch (error) {
        console.error('자동로그인 실패:', error);
        removeAccessToken();
      } finally {
        dispatch({ type: 'LOGIN_FAILURE', payload: null });
      }
    };
    
    initializeAuth();
  }, []);
  
  const login = async (email, password) => {
    dispatch({ type: 'LOGIN_START' });
    
    try {
      const response = await apiClient.post('/auth/login', { email, password });
      const { accessToken, user } = response.data;
      
      // 액세스 토큰을 메모리에 저장
      setAccessToken(accessToken);
      
      // 사용자 정보를 로컬 스토리지에 저장 (기본 정보만)
      localStorage.setItem('userInfo', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email
      }));
      
      dispatch({
        type: 'LOGIN_SUCCESS',
        payload: { user, accessToken }
      });
      
      return { success: true };
    } catch (error) {
      const errorMessage = error.response?.data?.message || '로그인에 실패했습니다';
      dispatch({ type: 'LOGIN_FAILURE', payload: errorMessage });
      return { success: false, message: errorMessage };
    }
  };
  
  const logout = async () => {
    try {
      // 서버에 로그아웃 요청
      await apiClient.post('/auth/logout');
    } catch (error) {
      console.error('로그아웃 요청 실패:', error);
    } finally {
      // 클라이언트 상태 정리
      removeAccessToken();
      localStorage.removeItem('userInfo');
      dispatch({ type: 'LOGOUT' });
    }
  };
  
  const refreshToken = async () => {
    try {
      const newToken = await tokenManager.refreshToken();
      dispatch({
        type: 'TOKEN_REFRESHED',
        payload: { accessToken: newToken }
      });
      return newToken;
    } catch (error) {
      // 토큰 갱신 실패 시 로그아웃
      logout();
      throw error;
    }
  };
  
  const value = {
    ...state,
    login,
    logout,
    refreshToken
  };
  
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth는 AuthProvider 내부에서 사용되어야 합니다');
  }
  return context;
};
\`\`\`

### 2. 커스텀 Hook으로 인증 로직 분리

\`\`\`jsx
// useAutoLogin.js
import { useEffect, useCallback } from 'react';
import { useAuth } from './AuthContext';

export const useAutoLogin = () => {
  const { isAuthenticated, isLoading, login, logout } = useAuth();
  
  // 자동로그인 시도
  const attemptAutoLogin = useCallback(async () => {
    try {
      const refreshToken = getRefreshToken();
      if (!refreshToken) {
        return false;
      }
      
      // 리프레시 토큰으로 자동 로그인
      const response = await apiClient.post('/auth/refresh', {
        refreshToken
      });
      
      const { accessToken, user } = response.data;
      
      // 새로운 액세스 토큰 저장
      setAccessToken(accessToken);
      
      // 사용자 정보 업데이트
      localStorage.setItem('userInfo', JSON.stringify({
        id: user.id,
        name: user.name,
        email: user.email
      }));
      
      return true;
    } catch (error) {
      console.error('자동로그인 실패:', error);
      // 실패 시 토큰 제거
      removeRefreshToken();
      return false;
    }
  }, []);
  
  // 토큰 만료 시 자동 로그아웃
  useEffect(() => {
    if (isAuthenticated) {
      const checkTokenExpiry = setInterval(() => {
        const token = getAccessToken();
        if (token && isTokenExpired(token)) {
          logout();
        }
      }, 60000); // 1분마다 체크
      
      return () => clearInterval(checkTokenExpiry);
    }
  }, [isAuthenticated, logout]);
  
  return {
    attemptAutoLogin,
    isAuthenticated,
    isLoading
  };
};
\`\`\`

## 📱 모바일 환경에서의 특별한 고려사항

### 1. 앱 상태 변화 대응

**문제**: 모바일에서 앱이 백그라운드로 가거나 포그라운드로 돌아올 때 토큰 상태를 적절히 관리해야 합니다.

**해결책**: App State 이벤트 리스너 활용
\`\`\`jsx
// useAppState.js
import { useEffect } from 'react';
import { AppState } from 'react-native'; // React Native 예시

export const useAppState = () => {
  useEffect(() => {
    const handleAppStateChange = (nextAppState) => {
      if (nextAppState === 'active') {
        // 앱이 포그라운드로 돌아올 때 토큰 유효성 검증
        validateCurrentToken();
      } else if (nextAppState === 'background') {
        // 앱이 백그라운드로 갈 때 민감한 정보 보호
        protectSensitiveData();
      }
    };
    
    const subscription = AppState.addEventListener('change', handleAppStateChange);
    
    return () => subscription?.remove();
  }, []);
};

// 웹 환경에서는 Page Visibility API 사용
export const usePageVisibility = () => {
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        // 페이지가 보이게 될 때 토큰 검증
        validateCurrentToken();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);
};
\`\`\`

### 2. 네트워크 상태 변화 대응

**문제**: 모바일에서 네트워크 연결이 불안정할 때 토큰 갱신이 실패할 수 있습니다.

**해결책**: 네트워크 상태 모니터링과 재시도 로직
\`\`\`jsx
// useNetworkStatus.js
import { useState, useEffect } from 'react';

export const useNetworkStatus = () => {
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  
  useEffect(() => {
    const handleOnline = () => {
      setIsOnline(true);
      // 온라인 상태가 되면 토큰 유효성 재검증
      validateCurrentToken();
    };
    
    const handleOffline = () => {
      setIsOnline(false);
    };
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);
  
  return isOnline;
};

// 네트워크 복구 시 자동 재연결
export const useAutoReconnect = () => {
  const isOnline = useNetworkStatus();
  
  useEffect(() => {
    if (isOnline) {
      // 네트워크 복구 시 자동으로 토큰 갱신 시도
      const attemptReconnect = async () => {
        try {
          await refreshToken();
          console.log('자동 재연결 성공');
        } catch (error) {
          console.error('자동 재연결 실패:', error);
        }
      };
      
      // 네트워크 복구 후 약간의 지연을 두고 재연결 시도
      const timeoutId = setTimeout(attemptReconnect, 2000);
      
      return () => clearTimeout(timeoutId);
    }
  }, [isOnline]);
};
\`\`\`

## 🧪 테스트 전략과 디버깅

### 1. 자동로그인 테스트 시나리오

\`\`\`jsx
// 자동로그인 테스트 케이스
describe('자동로그인 기능', () => {
  test('페이지 새로고침 후 자동로그인 성공', async () => {
    // 1. 로그인 상태 설정
    const mockUser = { id: 1, email: 'test@example.com', name: 'Test User' };
    const mockToken = 'valid-jwt-token';
    
    // 2. 토큰과 사용자 정보 저장
    setAccessToken(mockToken);
    localStorage.setItem('userInfo', JSON.stringify(mockUser));
    
    // 3. 페이지 새로고침 시뮬레이션
    window.location.reload();
    
    // 4. 자동로그인 확인
    await waitFor(() => {
      expect(screen.getByText('Test User')).toBeInTheDocument();
    });
  });
  
  test('토큰 만료 시 자동 로그아웃', async () => {
    // 1. 만료된 토큰 설정
    const expiredToken = 'expired-jwt-token';
    setAccessToken(expiredToken);
    
    // 2. API 호출 시뮬레이션
    fireEvent.click(screen.getByText('프로필 보기'));
    
    // 3. 자동 로그아웃 확인
    await waitFor(() => {
      expect(screen.getByText('로그인이 필요합니다')).toBeInTheDocument();
    });
  });
  
  test('토큰 갱신 성공', async () => {
    // 1. 만료된 토큰으로 설정
    const expiredToken = 'expired-jwt-token';
    setAccessToken(expiredToken);
    
    // 2. 토큰 갱신 API 모킹
    mockApiClient.post.mockResolvedValueOnce({
      data: { accessToken: 'new-valid-token' }
    });
    
    // 3. API 호출로 토큰 갱신 트리거
    fireEvent.click(screen.getByText('데이터 로드'));
    
    // 4. 토큰 갱신 확인
    await waitFor(() => {
      expect(mockApiClient.post).toHaveBeenCalledWith('/auth/refresh');
    });
  });
});
\`\`\`

### 2. 디버깅 도구와 로깅

\`\`\`jsx
// 인증 관련 로깅 유틸리티
class AuthLogger {
  static log(message, data = null, level = 'info') {
    const timestamp = new Date().toISOString();
    const logData = {
      timestamp,
      level,
      message,
      data,
      userId: getCurrentUserId(),
      userAgent: navigator.userAgent
    };
    
    if (process.env.NODE_ENV === 'development') {
      console.group(\`[Auth] \${message}\`);
      console.log('Timestamp:', timestamp);
      console.log('Level:', level);
      console.log('Data:', data);
      console.log('User ID:', getCurrentUserId());
      console.groupEnd();
    }
    
    // 프로덕션에서는 서버로 로그 전송
    if (process.env.NODE_ENV === 'production') {
      this.sendToServer(logData);
    }
  }
  
  static error(message, error = null) {
    this.log(message, error, 'error');
  }
  
  static warn(message, data = null) {
    this.log(message, data, 'warn');
  }
  
  static info(message, data = null) {
    this.log(message, data, 'info');
  }
  
  static async sendToServer(logData) {
    try {
      await fetch('/api/logs/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(logData)
      });
    } catch (error) {
      console.error('로그 전송 실패:', error);
    }
  }
}

// 사용 예시
AuthLogger.info('자동로그인 시도', { hasRefreshToken: !!getRefreshToken() });
AuthLogger.error('토큰 갱신 실패', { error: error.message });
\`\`\`

## 🚀 성능 최적화와 모니터링

### 1. 토큰 검증 최적화

**문제**: 매번 API 호출로 토큰 유효성을 검증하면 성능이 저하됩니다.

**해결책**: JWT 클라이언트 사이드 검증과 캐싱
\`\`\`jsx
// JWT 토큰 검증 최적화
class JWTValidator {
  constructor() {
    this.cache = new Map();
    this.cacheTimeout = 5 * 60 * 1000; // 5분
  }
  
  // 토큰 유효성 검증 (클라이언트 사이드)
  validateToken(token) {
    try {
      // 캐시된 결과 확인
      const cacheKey = this.getCacheKey(token);
      if (this.cache.has(cacheKey)) {
        const cached = this.cache.get(cacheKey);
        if (Date.now() < cached.expiresAt) {
          return cached.isValid;
        }
        this.cache.delete(cacheKey);
      }
      
      // JWT 디코딩
      const decoded = jwt_decode(token);
      const now = Date.now() / 1000;
      
      // 만료 시간 확인
      const isValid = decoded.exp > now;
      
      // 결과 캐싱
      this.cache.set(cacheKey, {
        isValid,
        expiresAt: Date.now() + this.cacheTimeout
      });
      
      return isValid;
    } catch (error) {
      console.error('토큰 검증 실패:', error);
      return false;
    }
  }
  
  // 토큰 만료 시간까지 남은 시간 계산
  getTimeUntilExpiry(token) {
    try {
      const decoded = jwt_decode(token);
      const now = Date.now() / 1000;
      return Math.max(0, decoded.exp - now) * 1000; // 밀리초 단위
    } catch (error) {
      return 0;
    }
  }
  
  // 캐시 키 생성
  getCacheKey(token) {
    return token.substring(0, 20); // 토큰의 앞부분만 사용
  }
  
  // 캐시 정리
  clearCache() {
    this.cache.clear();
  }
}

const jwtValidator = new JWTValidator();
\`\`\`

### 2. 성능 모니터링

\`\`\`jsx
// 인증 성능 모니터링
class AuthPerformanceMonitor {
  constructor() {
    this.metrics = {
      loginTime: [],
      tokenRefreshTime: [],
      autoLoginTime: [],
      apiCallTime: []
    };
  }
  
  // 성능 측정 시작
  startTimer(operation) {
    return performance.now();
  }
  
  // 성능 측정 종료
  endTimer(operation, startTime) {
    const duration = performance.now() - startTime;
    this.metrics[operation].push(duration);
    
    // 성능 임계값 체크
    this.checkPerformanceThreshold(operation, duration);
    
    return duration;
  }
  
  // 성능 임계값 체크
  checkPerformanceThreshold(operation, duration) {
    const thresholds = {
      loginTime: 3000,        // 3초
      tokenRefreshTime: 2000, // 2초
      autoLoginTime: 1500,    // 1.5초
      apiCallTime: 1000       // 1초
    };
    
    if (duration > thresholds[operation]) {
      console.warn(\`\${operation}이 임계값을 초과했습니다: \${duration}ms\`);
      
      // 성능 이슈 알림
      this.reportPerformanceIssue(operation, duration);
    }
  }
  
  // 성능 이슈 리포트
  async reportPerformanceIssue(operation, duration) {
    try {
      await fetch('/api/monitoring/performance', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          operation,
          duration,
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent
        })
      });
    } catch (error) {
      console.error('성능 이슈 리포트 실패:', error);
    }
  }
  
  // 성능 통계 반환
  getStats() {
    const stats = {};
    
    Object.keys(this.metrics).forEach(operation => {
      const times = this.metrics[operation];
      if (times.length > 0) {
        stats[operation] = {
          count: times.length,
          average: times.reduce((a, b) => a + b, 0) / times.length,
          min: Math.min(...times),
          max: Math.max(...times),
          p95: this.getPercentile(times, 95)
        };
      }
    });
    
    return stats;
  }
  
  // 백분위수 계산
  getPercentile(values, percentile) {
    const sorted = values.sort((a, b) => a - b);
    const index = Math.ceil((percentile / 100) * sorted.length) - 1;
    return sorted[index];
  }
}

const authPerformanceMonitor = new AuthPerformanceMonitor();
\`\`\`

## 📋 구현 체크리스트와 모범 사례

### 구현 전 체크리스트

- [ ] **보안 요구사항 정의**
  - [ ] 토큰 저장 방식 결정 (httpOnly 쿠키 vs localStorage)
  - [ ] CSRF 공격 방지 전략
  - [ ] XSS 공격 방지 전략
  - [ ] 토큰 탈취 대응 방안

- [ ] **사용자 경험 설계**
  - [ ] 자동로그인 실패 시 대응 방안
  - [ ] 토큰 만료 시 사용자 알림 방식
  - [ ] 로딩 상태 표시 방법
  - [ ] 오프라인 상태 대응

- [ ] **기술적 구현 계획**
  - [ ] 토큰 갱신 전략
  - [ ] 에러 처리 방식
  - [ ] 성능 최적화 방안
  - [ ] 테스트 전략

### 모범 사례

1. **보안 우선**: 사용자 편의성보다 보안을 우선시
2. **점진적 개선**: 기본 기능부터 시작하여 점진적으로 개선
3. **사용자 통제**: 자동로그인 해제 옵션 제공
4. **투명성**: 자동로그인 상태를 사용자에게 명확히 표시
5. **모니터링**: 지속적인 성능과 보안 모니터링

### 주의사항

1. **과도한 자동화**: 모든 상황을 자동화하려 하지 말기
2. **사용자 경험**: 보안과 편의성의 균형 유지
3. **에러 처리**: 예외 상황에 대한 적절한 대응
4. **성능 고려**: 자동로그인으로 인한 성능 저하 방지

## 🎯 결론

자동로그인 구현은 단순한 기능이 아닌, 보안, 성능, 사용자 경험을 모두 고려해야 하는 복잡한 시스템입니다. 실제 프로젝트에서 겪은 문제들과 그 해결책을 바탕으로, 안전하고 효율적인 자동로그인 시스템을 구축할 수 있습니다.

핵심은 **보안을 우선시하면서도 사용자 경험을 해치지 않는 것**입니다. 적절한 토큰 관리, 보안 전략, 에러 처리, 성능 최적화를 통해 사용자에게 편리하면서도 안전한 서비스를 제공할 수 있습니다.

자동로그인은 한 번 제대로 구현하면 사용자 만족도를 크게 향상시킬 수 있는 중요한 기능이므로, 충분한 계획과 테스트를 거쳐 신중하게 구현해보세요! 🚀`,
      category: '경험했던 문제들',
      postType: 'custom',
      tags: [
        '자동로그인',
        'JWT',
        '보안',
        'React',
        'Authentication',
        '토큰관리',
        'XSS',
        'CSRF',
        '성능최적화',
        '실무경험',
      ],
    }),
    createBlogPost({
      id: 6,
      title: 'TanStack Query로 서버 상태 관리 마스터하기',
      content: `# TanStack Query로 서버 상태 관리 마스터하기

React 애플리케이션에서 서버 상태를 관리하는 것은 복잡하고 까다로운 작업입니다. API 호출, 로딩 상태, 에러 처리, 캐싱, 동기화 등 다양한 문제들을 해결해야 하는데, TanStack Query(구 React Query)는 이러한 문제들을 우아하게 해결해주는 강력한 라이브러리입니다. 실제 프로젝트에서 경험한 문제들과 TanStack Query를 활용한 해결책을 바탕으로 서버 상태 관리의 모든 것을 정리해보겠습니다.

## 🚀 TanStack Query란?

### 기본 개념

**TanStack Query**는 React 애플리케이션에서 서버 상태를 관리하기 위한 라이브러리입니다. 이전에는 React Query라는 이름으로 알려져 있었지만, TanStack으로 브랜드가 변경되면서 더 넓은 생태계의 일부가 되었습니다.

### 핵심 특징

- **자동 캐싱**: API 응답을 자동으로 캐싱하여 불필요한 요청 방지
- **백그라운드 업데이트**: 사용자가 페이지를 떠났다가 돌아와도 최신 데이터로 자동 업데이트
- **에러 처리**: 일관된 에러 처리와 재시도 로직
- **로딩 상태**: 로딩, 에러, 성공 상태를 자동으로 관리
- **동기화**: 여러 컴포넌트에서 같은 데이터를 사용할 때 자동 동기화

## 💡 실제 프로젝트에서 겪은 문제들

### 1. 수동 상태 관리의 복잡성

**문제 상황**: useState와 useEffect만으로 API 상태를 관리하려니 코드가 복잡해지고 중복이 많았습니다.

**기존 방식의 문제점:**
\`\`\`jsx
// 기존 방식: 수동 상태 관리
function UserProfile({ userId }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await fetch(\`/api/users/\${userId}\`);
        const userData = await response.json();
        setUser(userData);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [userId]);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러: {error}</div>;
  if (!user) return <div>사용자를 찾을 수 없습니다</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
    </div>
  );
}
\`\`\`

**문제점:**
- **상태 변수 3개**: user, loading, error
- **복잡한 useEffect**: try-catch, 상태 업데이트 로직
- **중복 코드**: 다른 컴포넌트에서도 비슷한 패턴 반복
- **에러 처리**: 일관성 없는 에러 처리

### 2. 캐싱과 동기화 부재

**문제 상황**: 같은 데이터를 여러 컴포넌트에서 사용할 때 각각 API 호출이 발생했습니다.

**발생한 문제들:**
- **중복 요청**: 사용자 목록을 여러 곳에서 표시할 때 각각 API 호출
- **데이터 불일치**: 한 곳에서 업데이트해도 다른 곳은 이전 데이터 표시
- **성능 저하**: 불필요한 네트워크 요청으로 인한 느린 응답

### 3. 백그라운드 업데이트 부재

**문제 상황**: 사용자가 페이지를 떠났다가 돌아와도 데이터가 오래된 상태로 남아있었습니다.

**문제점:**
- **오래된 데이터**: 사용자가 다른 작업을 하고 돌아와도 이전 데이터 표시
- **사용자 경험 저하**: 수동으로 새로고침해야 최신 정보 확인 가능

## 🛠️ TanStack Query로 문제 해결하기

### 1. 기본 설정과 Provider

**설치 및 설정:**
\`\`\`bash
npm install @tanstack/react-query
# 또는
yarn add @tanstack/react-query
\`\`\`

**QueryClient 설정:**
\`\`\`jsx
// App.tsx 또는 최상위 컴포넌트
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 전역 설정
      staleTime: 5 * 60 * 1000, // 5분
      cacheTime: 10 * 60 * 1000, // 10분
      retry: 3,
      retryDelay: attemptIndex => Math.min(1000 * 2 ** attemptIndex, 30000),
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      {/* 애플리케이션 컴포넌트들 */}
      <UserProfile userId={1} />
      
      {/* 개발 도구 (프로덕션에서는 제거) */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
\`\`\`

### 2. useQuery로 데이터 가져오기

**기본 사용법:**
\`\`\`jsx
import { useQuery } from '@tanstack/react-query';

function UserProfile({ userId }) {
  const {
    data: user,
    isLoading,
    isError,
    error,
    refetch
  } = useQuery({
    queryKey: ['user', userId],
    queryFn: () => fetchUser(userId),
    staleTime: 5 * 60 * 1000, // 5분간 fresh 상태
    enabled: !!userId, // userId가 있을 때만 실행
  });

  if (isLoading) return <div>로딩 중...</div>;
  if (isError) return <div>에러: {error.message}</div>;
  if (!user) return <div>사용자를 찾을 수 없습니다</div>;

  return (
    <div>
      <h2>{user.name}</h2>
      <p>{user.email}</p>
      <button onClick={() => refetch()}>새로고침</button>
    </div>
  );
}

// API 함수
async function fetchUser(userId) {
  const response = await fetch(\`/api/users/\${userId}\`);
  if (!response.ok) {
    throw new Error('사용자 정보를 가져올 수 없습니다');
  }
  return response.json();
}
\`\`\`

**장점:**
- **상태 자동 관리**: loading, error, data 상태를 자동으로 관리
- **캐싱**: 같은 userId로 요청 시 캐시된 데이터 반환
- **에러 처리**: 일관된 에러 처리와 재시도 로직
- **타입 안전성**: TypeScript와 완벽하게 호환

### 3. useMutation으로 데이터 수정하기

**데이터 생성/수정/삭제:**
\`\`\`jsx
import { useMutation, useQueryClient } from '@tanstack/react-query';

function CreateUserForm() {
  const queryClient = useQueryClient();
  
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (newUser) => {
      // 성공 시 캐시 업데이트
      queryClient.setQueryData(['users'], (oldUsers) => {
        return oldUsers ? [...oldUsers, newUser] : [newUser];
      });
      
      // 관련 쿼리 무효화
      queryClient.invalidateQueries({ queryKey: ['users'] });
      
      // 성공 메시지
      toast.success('사용자가 성공적으로 생성되었습니다');
    },
    onError: (error) => {
      // 에러 처리
      toast.error(\`사용자 생성 실패: \${error.message}\`);
    },
  });

  const handleSubmit = async (formData) => {
    createUserMutation.mutate(formData);
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* 폼 필드들 */}
      <button 
        type="submit" 
        disabled={createUserMutation.isPending}
      >
        {createUserMutation.isPending ? '생성 중...' : '사용자 생성'}
      </button>
    </form>
  );
}

// API 함수
async function createUser(userData) {
  const response = await fetch('/api/users', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(userData),
  });
  
  if (!response.ok) {
    throw new Error('사용자 생성에 실패했습니다');
  }
  
  return response.json();
}
\`\`\`

### 4. 고급 캐싱 전략

**쿼리 키 전략:**
\`\`\`jsx
// 계층적 쿼리 키 구조
const queryKeys = {
  users: ['users'] as const,
  user: (id: number) => [...queryKeys.users, id] as const,
  userPosts: (id: number) => [...queryKeys.user(id), 'posts'] as const,
  userPost: (userId: number, postId: number) => 
    [...queryKeys.userPosts(userId), postId] as const,
};

// 사용 예시
function UserPosts({ userId }) {
  const { data: posts } = useQuery({
    queryKey: queryKeys.userPosts(userId),
    queryFn: () => fetchUserPosts(userId),
  });
  
  // ...
}
\`\`\`

**캐시 무효화 전략:**
\`\`\`jsx
function UserActions({ userId }) {
  const queryClient = useQueryClient();
  
  const updateUserMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedUser) => {
      // 특정 사용자 데이터만 업데이트
      queryClient.setQueryData(
        queryKeys.user(userId), 
        updatedUser
      );
      
      // 사용자 목록도 무효화
      queryClient.invalidateQueries({ 
        queryKey: queryKeys.users 
      });
    },
  });
  
  // ...
}
\`\`\`

## 🔄 실시간 데이터 동기화

### 1. 자동 백그라운드 업데이트

**설정:**
\`\`\`jsx
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // 자동 백그라운드 업데이트
      refetchOnWindowFocus: true,
      refetchOnMount: true,
      refetchOnReconnect: true,
      
      // 폴링 (실시간 데이터가 필요한 경우)
      refetchInterval: 30000, // 30초마다
      refetchIntervalInBackground: true,
    },
  },
});
\`\`\`

**사용 예시:**
\`\`\`jsx
function RealTimeNotifications() {
  const { data: notifications } = useQuery({
    queryKey: ['notifications'],
    queryFn: fetchNotifications,
    refetchInterval: 10000, // 10초마다
    refetchIntervalInBackground: true,
  });
  
  return (
    <div>
      {notifications?.map(notification => (
        <NotificationItem key={notification.id} notification={notification} />
      ))}
    </div>
  );
}
\`\`\`

### 2. WebSocket과 연동

**실시간 채팅 예시:**
\`\`\`jsx
function ChatRoom({ roomId }) {
  const queryClient = useQueryClient();
  
  // 채팅 메시지 가져오기
  const { data: messages } = useQuery({
    queryKey: ['chat', roomId],
    queryFn: () => fetchChatMessages(roomId),
    staleTime: 0, // 항상 최신 데이터 필요
  });
  
  // WebSocket 연결
  useEffect(() => {
    const ws = new WebSocket(\`ws://localhost:8080/chat/\${roomId}\`);
    
    ws.onmessage = (event) => {
      const newMessage = JSON.parse(event.data);
      
      // 캐시에 새 메시지 추가
      queryClient.setQueryData(['chat', roomId], (oldMessages) => {
        return oldMessages ? [...oldMessages, newMessage] : [newMessage];
      });
    };
    
    return () => ws.close();
  }, [roomId, queryClient]);
  
  return (
    <div>
      {messages?.map(message => (
        <ChatMessage key={message.id} message={message} />
      ))}
    </div>
  );
}
\`\`\`

## 🎯 성능 최적화 기법

### 1. 선택적 데이터 가져오기

**필요한 필드만 선택:**
\`\`\`jsx
function UserList() {
  const { data: users } = useQuery({
    queryKey: ['users', 'list'],
    queryFn: () => fetchUsers({ fields: ['id', 'name', 'email'] }),
    select: (data) => data.map(user => ({
      id: user.id,
      name: user.name,
      email: user.email,
    })),
  });
  
  // ...
}
\`\`\`

### 2. 가상화와 페이지네이션

**무한 스크롤:**
\`\`\`jsx
import { useInfiniteQuery } from '@tanstack/react-query';

function InfiniteUserList() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ['users', 'infinite'],
    queryFn: ({ pageParam = 1 }) => fetchUsers({ page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
    initialPageParam: 1,
  });
  
  const allUsers = data?.pages.flatMap(page => page.users) ?? [];
  
  return (
    <div>
      {allUsers.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
      
      {hasNextPage && (
        <button
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? '로딩 중...' : '더 보기'}
        </button>
      )}
    </div>
  );
}
\`\`\`

### 3. 메모이제이션과 최적화

**React.memo와 useMemo 활용:**
\`\`\`jsx
const UserItem = React.memo(({ user }) => {
  const userDisplayName = useMemo(() => {
    return \`\${user.firstName} \${user.lastName}\`;
  }, [user.firstName, user.lastName]);
  
  return (
    <div>
      <h3>{userDisplayName}</h3>
      <p>{user.email}</p>
    </div>
  );
});

// 사용자 목록 컴포넌트
function UserList() {
  const { data: users } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  
  return (
    <div>
      {users?.map(user => (
        <UserItem key={user.id} user={user} />
      ))}
    </div>
  );
}
\`\`\`

## 🧪 테스트 전략

### 1. 단위 테스트

**컴포넌트 테스트:**
\`\`\`jsx
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserProfile } from './UserProfile';

// 테스트용 QueryClient
const createTestQueryClient = () => new QueryClient({
  defaultOptions: {
    queries: { retry: false },
    mutations: { retry: false },
  },
});

// 테스트 래퍼
const TestWrapper = ({ children }) => {
  const queryClient = createTestQueryClient();
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
};

test('사용자 프로필을 성공적으로 로드합니다', async () => {
  // API 모킹
  const mockUser = { id: 1, name: 'John Doe', email: 'john@example.com' };
  global.fetch = jest.fn(() =>
    Promise.resolve({
      ok: true,
      json: () => Promise.resolve(mockUser),
    })
  );
  
  render(
    <TestWrapper>
      <UserProfile userId={1} />
    </TestWrapper>
  );
  
  // 로딩 상태 확인
  expect(screen.getByText('로딩 중...')).toBeInTheDocument();
  
  // 데이터 로드 완료 확인
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('john@example.com')).toBeInTheDocument();
  });
});
\`\`\`

### 2. 통합 테스트

**API 연동 테스트:**
\`\`\`jsx
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { render, screen, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserList } from './UserList';

// MSW 서버 설정
const server = setupServer(
  rest.get('/api/users', (req, res, ctx) => {
    return res(
      ctx.json([
        { id: 1, name: 'John Doe', email: 'john@example.com' },
        { id: 2, name: 'Jane Smith', email: 'jane@example.com' },
      ])
    );
  })
);

beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

test('사용자 목록을 성공적으로 로드합니다', async () => {
  render(
    <TestWrapper>
      <UserList />
    </TestWrapper>
  );
  
  await waitFor(() => {
    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('Jane Smith')).toBeInTheDocument();
  });
});
\`\`\`

## 🚀 실제 프로젝트 적용 사례

### 1. 전자상거래 플랫폼

**상품 목록과 상세 정보:**
\`\`\`jsx
function ProductList() {
  const { data: products, isLoading } = useQuery({
    queryKey: ['products', 'list'],
    queryFn: fetchProducts,
    staleTime: 5 * 60 * 1000, // 5분간 fresh
  });
  
  if (isLoading) return <ProductListSkeleton />;
  
  return (
    <div className="product-grid">
      {products?.map(product => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}

function ProductDetail({ productId }) {
  const { data: product } = useQuery({
    queryKey: ['product', productId],
    queryFn: () => fetchProduct(productId),
    staleTime: 10 * 60 * 1000, // 10분간 fresh
  });
  
  // ...
}
\`\`\`

### 2. 소셜 미디어 앱

**게시물과 댓글:**
\`\`\`jsx
function PostList() {
  const { data: posts, fetchNextPage, hasNextPage } = useInfiniteQuery({
    queryKey: ['posts'],
    queryFn: ({ pageParam = 1 }) => fetchPosts({ page: pageParam }),
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.hasMore ? allPages.length + 1 : undefined;
    },
  });
  
  // ...
}

function PostDetail({ postId }) {
  const { data: post } = useQuery({
    queryKey: ['post', postId],
    queryFn: () => fetchPost(postId),
  });
  
  const { data: comments } = useQuery({
    queryKey: ['post', postId, 'comments'],
    queryFn: () => fetchComments(postId),
    enabled: !!postId,
  });
  
  // ...
}
\`\`\`

## 📋 모범 사례와 주의사항

### 모범 사례

1. **쿼리 키 설계**: 계층적이고 예측 가능한 구조로 설계
2. **에러 경계**: React Error Boundary와 함께 사용
3. **로딩 상태**: 사용자 경험을 위한 적절한 로딩 UI 제공
4. **캐시 전략**: 데이터 특성에 맞는 staleTime과 cacheTime 설정
5. **타입 안전성**: TypeScript와 함께 사용하여 타입 안전성 확보

### 주의사항

1. **과도한 캐싱**: 모든 데이터를 캐싱하려 하지 말기
2. **메모리 누수**: 적절한 cacheTime 설정으로 메모리 관리
3. **에러 처리**: 사용자 친화적인 에러 메시지와 재시도 옵션 제공
4. **성능 모니터링**: React DevTools와 Query DevTools로 성능 추적

## 🎯 결론

TanStack Query는 React 애플리케이션에서 서버 상태를 관리하는 가장 강력하고 직관적인 솔루션입니다. 자동 캐싱, 백그라운드 업데이트, 에러 처리 등 복잡한 상태 관리 로직을 간단한 Hook으로 해결할 수 있습니다.

실제 프로젝트에서 TanStack Query를 도입한 결과, 코드의 복잡성이 크게 줄어들고 사용자 경험이 향상되었습니다. 특히 캐싱과 동기화 기능으로 인해 불필요한 API 호출이 줄어들고, 백그라운드 업데이트로 항상 최신 데이터를 제공할 수 있게 되었습니다.

서버 상태 관리에 어려움을 겪고 있다면, TanStack Query의 도입을 강력히 추천합니다. 한 번 제대로 설정하면 개발 생산성과 사용자 경험을 크게 향상시킬 수 있는 강력한 도구입니다! 🚀`,
      category: 'React',
      postType: 'custom',
      tags: [
        'TanStack Query',
        'React Query',
        '서버 상태 관리',
        '캐싱',
        'API 관리',
        'React',
        '성능 최적화',
        '실시간 동기화',
        'TypeScript',
        '실무 경험',
      ],
    }),
  ];

  const categories = ['전체', 'React', 'TypeScript', '경험했던 문제들'];

  const filteredPosts =
    selectedCategory === '전체'
      ? blogPosts
      : blogPosts.filter(post => post.category === selectedCategory);

  const handlePostClick = (post: BlogPost) => {
    console.log('블로그 포스트 클릭됨:', post.title);
    setSelectedPost(post);
    openModal(post);
  };

  const handleCategoryClick = (category: string) => {
    setSelectedCategory(category);
  };

  return (
    <>
      <main style={{ padding: '2rem 0' }}>
        <div
          style={{
            maxWidth: '800px',
            margin: '0 auto',
            padding: '0 1.5rem',
          }}
        >
          {/* 카테고리 필터 */}
          <div
            style={{
              display: 'flex',
              gap: '0.5rem',
              marginBottom: '2rem',
              flexWrap: 'wrap',
              justifyContent: 'center',
            }}
          >
            {categories.map(category => {
              // 각 카테고리별로 다른 색상 적용 (새로운 카테고리도 자동으로 색상 할당)
              const getCategoryColors = (cat: string, isSelected: boolean) => {
                // 미리 정의된 색상 팔레트
                const colorPalette = [
                  { bg: '#3b82f6', color: 'white', border: '#3b82f6' }, // 파란색
                  { bg: '#06b6d4', color: 'white', border: '#06b6d4' }, // 청록색
                  { bg: '#8b5cf6', color: 'white', border: '#8b5cf6' }, // 보라색
                  { bg: '#10b981', color: 'white', border: '#10b981' }, // 초록색
                  { bg: '#f59e0b', color: 'white', border: '#f59e0b' }, // 주황색
                  { bg: '#ef4444', color: 'white', border: '#ef4444' }, // 빨간색
                  { bg: '#ec4899', color: 'white', border: '#ec4899' }, // 분홍색
                  { bg: '#84cc16', color: 'white', border: '#84cc16' }, // 연두색
                ];

                const lightColorPalette = [
                  { bg: '#dbeafe', color: '#1e40af', border: '#93c5fd' }, // 연한 파란색
                  { bg: '#cffafe', color: '#0891b2', border: '#67e8f9' }, // 연한 청록색
                  { bg: '#e9d5ff', color: '#7c3aed', border: '#c4b5fd' }, // 연한 보라색
                  { bg: '#d1fae5', color: '#047857', border: '#6ee7b7' }, // 연한 초록색
                  { bg: '#fed7aa', color: '#ea580c', border: '#fdba74' }, // 연한 주황색
                  { bg: '#fecaca', color: '#dc2626', border: '#fca5a5' }, // 연한 빨간색
                  { bg: '#fce7f3', color: '#be185d', border: '#f9a8d4' }, // 연한 분홍색
                  { bg: '#ecfccb', color: '#65a30d', border: '#bef264' }, // 연한 연두색
                ];

                // 카테고리 인덱스 찾기
                const categoryIndex = categories.indexOf(cat);

                if (isSelected) {
                  // 선택된 상태: 진한 색상
                  if (cat === '전체') {
                    return { bg: '#3b82f6', color: 'white', border: '#3b82f6' };
                  }
                  return (
                    colorPalette[categoryIndex % colorPalette.length] ||
                    colorPalette[0]
                  );
                } else {
                  // 선택되지 않은 상태: 연한 색상
                  if (cat === '전체') {
                    return {
                      bg: '#dbeafe',
                      color: '#1e40af',
                      border: '#93c5fd',
                    };
                  }
                  return (
                    lightColorPalette[
                      categoryIndex % lightColorPalette.length
                    ] || lightColorPalette[0]
                  );
                }
              };

              const colors = getCategoryColors(
                category,
                selectedCategory === category
              );

              return (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  style={{
                    padding: '0.5rem 1rem',
                    borderRadius: '1.5rem',
                    border: `1px solid ${colors.border}`,
                    backgroundColor: colors.bg,
                    color: colors.color,
                    fontSize: '0.875rem',
                    fontWeight: '500',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                    boxShadow:
                      selectedCategory === category
                        ? '0 4px 12px rgba(0, 0, 0, 0.15)'
                        : 'none',
                  }}
                  onMouseEnter={e => {
                    if (selectedCategory !== category) {
                      const hoverColors = getCategoryColors(category, false);
                      e.currentTarget.style.backgroundColor = hoverColors.bg;
                      e.currentTarget.style.color = hoverColors.color;
                      e.currentTarget.style.borderColor = hoverColors.border;
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow =
                        '0 4px 8px rgba(0, 0, 0, 0.1)';
                    }
                  }}
                  onMouseLeave={e => {
                    if (selectedCategory !== category) {
                      const normalColors = getCategoryColors(category, false);
                      e.currentTarget.style.backgroundColor = normalColors.bg;
                      e.currentTarget.style.color = normalColors.color;
                      e.currentTarget.style.borderColor = normalColors.border;
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }
                  }}
                >
                  {category}
                </button>
              );
            })}
          </div>

          {/* 포스트 개수 표시 */}
          <div
            style={{
              textAlign: 'center',
              marginBottom: '2rem',
              color: 'var(--text-secondary)',
              fontSize: '0.875rem',
            }}
          >
            {filteredPosts.length}개의 포스트
          </div>

          {/* 블로그 포스트 그리드 */}
          <div
            style={{
              display: 'grid',
              gap: '2rem',
              gridTemplateColumns: 'repeat(2, 1fr)',
              maxWidth: '800px',
              margin: '0 auto',
            }}
          >
            {filteredPosts.map(post => (
              <article
                key={post.id}
                className="rainbow-border"
                style={{
                  backgroundColor: 'var(--bg-secondary)',
                  borderRadius: '0.75rem',
                  overflow: 'hidden',
                  border: '1px solid var(--border-color)',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer',
                  position: 'relative',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.transform = 'translateY(-4px)';
                  e.currentTarget.style.boxShadow =
                    '0 10px 25px var(--shadow-medium)';
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }}
                onClick={() => handlePostClick(post)}
              >
                {/* 썸네일 이미지 */}
                <div
                  style={{
                    height: '200px',
                    backgroundColor: getCategoryThumbnailColor(post.category),
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: getCategoryTextColor(post.category),
                    fontSize: '1.5rem',
                    fontWeight: '700',
                  }}
                >
                  {post.category}
                </div>

                {/* 포스트 내용 */}
                <div style={{ padding: '1.5rem' }}>
                  {/* 태그 */}
                  <div style={{ marginBottom: '0.75rem' }}>
                    <span
                      style={{
                        backgroundColor: getCategoryThumbnailColor(
                          post.category
                        ),
                        color: getCategoryTextColor(post.category),
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '500',
                        border: `1px solid ${getCategoryTextColor(post.category)}`,
                      }}
                    >
                      {post.category}
                    </span>
                  </div>

                  {/* 제목 */}
                  <h3
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '600',
                      color: 'var(--text-primary)',
                      marginBottom: '0.75rem',
                      lineHeight: '1.4',
                    }}
                  >
                    {post.title}
                  </h3>

                  {/* 요약 */}
                  <p
                    style={{
                      color: 'var(--text-secondary)',
                      fontSize: '0.875rem',
                      lineHeight: '1.6',
                      marginBottom: '1rem',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                    }}
                  >
                    {post.content.split('\n')[0]}
                  </p>

                  {/* 메타 정보 */}
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'flex-end',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span>{post.date}</span>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* 더보기 버튼 */}
          <div style={{ textAlign: 'center', marginTop: '3rem' }}>
            <button
              style={{
                padding: '0.75rem 2rem',
                backgroundColor: 'var(--accent-color)',
                color: 'white',
                border: 'none',
                borderRadius: '0.5rem',
                fontSize: '1rem',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow =
                  '0 4px 12px var(--shadow-medium)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              더 많은 포스트 보기
            </button>
          </div>
        </div>
      </main>

      {/* 블로그 포스트 모달 */}
      {isOpen && selectedPost && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 1000,
            padding: '1rem',
          }}
          onClick={closeModal}
        >
          <div
            style={{
              backgroundColor: 'var(--bg-primary)',
              borderRadius: '1rem',
              maxWidth: '800px',
              width: '100%',
              maxHeight: '95vh',
              overflow: 'auto',
              position: 'relative',
              border: '1px solid var(--border-color)',
              boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* 모달 헤더 */}
            <div
              style={{
                padding: '1rem 2rem 0.75rem 2rem',
                borderBottom: '1px solid var(--border-color)',
                position: 'sticky',
                top: 0,
                backgroundColor: 'var(--bg-primary)',
                zIndex: 10,
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                }}
              >
                <div>
                  <h2
                    style={{
                      fontSize: '1.25rem',
                      fontWeight: '700',
                      color: 'var(--text-primary)',
                      marginBottom: '0.25rem',
                      lineHeight: '1.3',
                    }}
                  >
                    {selectedPost.title}
                  </h2>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      fontSize: '0.75rem',
                      color: 'var(--text-secondary)',
                    }}
                  >
                    <span>{selectedPost.date}</span>
                  </div>
                </div>
                <button
                  onClick={closeModal}
                  style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '1.125rem',
                    color: 'var(--text-secondary)',
                    cursor: 'pointer',
                    padding: '0.25rem',
                    borderRadius: '0.25rem',
                    transition: 'all 0.2s ease',
                  }}
                  onMouseEnter={e => {
                    e.currentTarget.style.backgroundColor =
                      'var(--bg-secondary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                  }}
                  onMouseLeave={e => {
                    e.currentTarget.style.backgroundColor = 'transparent';
                    e.currentTarget.style.color = 'var(--text-secondary)';
                  }}
                >
                  ×
                </button>
              </div>
            </div>

            {/* 모달 내용 */}
            <div
              style={{
                padding: '0.75rem',
                maxHeight: '75vh',
                overflowY: 'auto',
                scrollbarWidth: 'thin',
                scrollbarColor: 'var(--accent-color) var(--bg-secondary)',
              }}
              className="custom-scrollbar"
            >
              <div
                style={{
                  color: 'var(--text-primary)',
                  lineHeight: '1.4',
                  fontSize: '1rem',
                }}
              >
                {(() => {
                  const lines = selectedPost.content.split('\n');
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
                              <span style={{ marginLeft: '0.5rem' }}>
                                {codeLanguage}
                              </span>
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
                      elements.push(
                        <div key={key} style={{ height: '1rem' }} />
                      );
                    } else if (line.startsWith('- ')) {
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
                              marginTop: '0.5rem',
                              fontSize: '1.5rem',
                              lineHeight: 1,
                            }}
                          >
                            •
                          </span>
                          <span style={{ flex: 1, lineHeight: '1.7' }}>
                            {line.replace('- ', '')}
                          </span>
                        </div>
                      );
                    } else if (line.startsWith('**') && line.endsWith('**')) {
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
                    } else if (
                      line.startsWith('**Q:') ||
                      line.startsWith('**A:')
                    ) {
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
                                e.currentTarget.style.textDecoration =
                                  'underline';
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
                          {line}
                        </p>
                      );
                    }
                  }

                  return elements;
                })()}
              </div>

              {/* 태그 섹션 */}
              <div
                style={{
                  marginTop: '2rem',
                  paddingTop: '1.5rem',
                  borderTop: '2px solid var(--border-color)',
                }}
              >
                <h5
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '0.75rem',
                  }}
                >
                  📍 관련 태그
                </h5>
                <div
                  style={{
                    display: 'flex',
                    gap: '0.75rem',
                    flexWrap: 'wrap',
                  }}
                >
                  {selectedPost.tags.map((tag, index) => (
                    <span
                      key={index}
                      style={{
                        backgroundColor: 'var(--bg-secondary)',
                        color: 'var(--text-secondary)',
                        padding: '0.5rem 1rem',
                        borderRadius: '1.5rem',
                        fontSize: '0.875rem',
                        border: '1px solid var(--border-color)',
                        transition: 'all 0.2s ease',
                        cursor: 'pointer',
                      }}
                      onMouseEnter={e => {
                        e.currentTarget.style.backgroundColor =
                          'var(--accent-color)';
                        e.currentTarget.style.color = 'white';
                        e.currentTarget.style.borderColor =
                          'var(--accent-color)';
                      }}
                      onMouseLeave={e => {
                        e.currentTarget.style.backgroundColor =
                          'var(--bg-secondary)';
                        e.currentTarget.style.color = 'var(--text-secondary)';
                        e.currentTarget.style.borderColor =
                          'var(--border-color)';
                      }}
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Blog;
