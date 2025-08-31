import { useBlogModal, type BlogPost } from '../hooks/useBlogModal';
import { useState } from 'react';

const Blog = () => {
  const { isOpen, openModal, closeModal } = useBlogModal();
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  const blogPosts: BlogPost[] = [
    {
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
      date: '2025.09.01',
      thumbnailColor: '#f1f5f9',
      categoryColor: '#3b82f6',
      tags: [
        'React',
        'React19',
        'Frontend',
        'JavaScript',
        'Actions',
        'useOptimistic',
      ],
    },
  ];

  const categories = ['전체', 'React'];

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
            {categories.map(category => (
              <button
                key={category}
                onClick={() => handleCategoryClick(category)}
                style={{
                  padding: '0.5rem 1rem',
                  borderRadius: '1.5rem',
                  border: '1px solid var(--border-color)',
                  backgroundColor:
                    selectedCategory === category
                      ? 'var(--accent-color)'
                      : 'var(--bg-secondary)',
                  color:
                    selectedCategory === category
                      ? 'white'
                      : 'var(--text-primary)',
                  fontSize: '0.875rem',
                  fontWeight: '500',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                }}
                onMouseEnter={e => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor =
                      'var(--accent-color)';
                    e.currentTarget.style.color = 'white';
                    e.currentTarget.style.borderColor = 'var(--accent-color)';
                  }
                }}
                onMouseLeave={e => {
                  if (selectedCategory !== category) {
                    e.currentTarget.style.backgroundColor =
                      'var(--bg-secondary)';
                    e.currentTarget.style.color = 'var(--text-primary)';
                    e.currentTarget.style.borderColor = 'var(--border-color)';
                  }
                }}
              >
                {category}
              </button>
            ))}
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
                    backgroundColor: post.thumbnailColor,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: post.categoryColor,
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
                        backgroundColor: post.categoryColor,
                        color: 'white',
                        padding: '0.25rem 0.75rem',
                        borderRadius: '1rem',
                        fontSize: '0.75rem',
                        fontWeight: '500',
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
                padding: '2rem',
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
                  lineHeight: '1.8',
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
                            marginTop: '2.5rem',
                            marginBottom: '1.5rem',
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
                            marginTop: '2rem',
                            marginBottom: '1rem',
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
                        <div key={key} style={{ height: '1.5rem' }} />
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
                            marginBottom: '1rem',
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
                            marginBottom: '1.5rem',
                            padding: '1.5rem',
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
                              marginBottom: '0.75rem',
                              fontSize: '1rem',
                            }}
                          >
                            {line.startsWith('**Q:') ? '❓ 질문' : '💡 답변'}
                          </div>
                          <div style={{ lineHeight: '1.7' }}>
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
                              marginBottom: '1.25rem',
                              lineHeight: '1.8',
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
                  }

                  return elements;
                })()}
              </div>

              {/* 태그 섹션 */}
              <div
                style={{
                  marginTop: '3rem',
                  paddingTop: '2rem',
                  borderTop: '2px solid var(--border-color)',
                }}
              >
                <h5
                  style={{
                    fontSize: '1.125rem',
                    fontWeight: '600',
                    color: 'var(--text-primary)',
                    marginBottom: '1rem',
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
