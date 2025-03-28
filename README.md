# next-ssr-scaffold

The combination of Next.js, React-query, Zustand and Tailwind

## Features

* Next.js의 App Router를 사용하기 위해 Redux를 과감하게 포기하고 Zustand 도입
* SSR을 위한 react-query 설정
* 토큰 쿠키를 브라우저에서 사용할 수 없도록 모든 API 호출은 내부 서버를 거쳐가도록 설정
* 프로덕션 환경에서 정적 파일의 CDN 이용을 위해 assetPrefix 설정
* lint나 tsc에서 에러 발생시 커밋을 막아주는 husky 설정
* 빌드 단계에서 필요한 환경변수를 받는 Dockerfile 설정

## Directory Structure

```
src/
├─ app/
│  ├─ pokemons/
│  │  └─ [id]
│  │     ├─ page.tsx
│  │     └─ pokemon.tsx
│  ├─ globals.css
│  ├─ layout.tsx
│  └─ page.tsx
├─ components/
│  ├─ pagination
│  │  ├─ index.ts
│  │  └─ pagination.tsx
│  └─ ...
├─ providers/
│  ├─ reactQuery.tsx
│  └─ ...
├─ stores/
│  ├─ viewer
│  │  ├─ index.ts
│  │  ├─ provider.tsx
│  │  └─ store.ts
│  └─ ...
└─ middleware.js
```

## SSR with React-Query

[React-Query](https://tanstack.com/query/latest/docs/framework/react/guides/advanced-ssr)

CUD를 API를 호출 할 때 React-Query의 _Mutation_ 을 이용하면 임시로 캐싱된 API 데이터를 다시 불러와 화면에 갱신된 데이터를 표시할 수 있습니다. 

eg. queryKey에 "user", "query" 가 포함된 캐시 초기화
```
const mutation = useMutation({
  mutationFn: () => fetch("postUser", { data: { phone } }),
  onSuccess: ({ status, data }) => {
    if (status !== 200) return
    queryClient.invalidateQueries({ queryKey: ["users", "query"] })
    router.push(`/users/${data._id}`)
  }
})
```

## Todo

* Storybook 도입
