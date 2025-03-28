# next-ssr-scaffold

The combination of Next.js, React-query, Zustand and Tailwind

## Features

* Next.js의 App Router를 사용하기 위해 Redux를 과감하게 포기하고 Zustand 도입
* SSR을 위한 react-query 설정
* 토큰 쿠키를 브라우저에서 사용할 수 없도록 모든 API 호출은 내부 서버를 거쳐가도록 설정
* 프로덕션 환경에서 정적 파일의 CDN 이용을 위해 assetPrefix 설정
* lint나 tsc에서 에러 발생시 커밋을 막아주는 husky 설정
* 빌드 단계에서 필요한 환경변수를 받는 Dockerfile 설정

## 

## Directory Structure

```
src/
├─ app/
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

## API

API 호출은 from client to server to server 방식을 사용합니다. 브라우저에서 호출한 API는 next.js 서버를 호출하고, next.js 서버는 같은 VPC에 있는 API 서버를 호출하는 방식입니다. 이 방식은 accessToken 쿠키를 js로 핸들링 할 수 없게 만들어도 괜찮기 때문에 보안에 유리합니다. 

_libs/apis/routes.ts_ 파일은 API의 목록이 정의되어 있고 URL은 `/api` 프리픽스가 붙어있습니다. 이 요청은 next.js 서버로 전송되고 _middleware.ts_ 파일은 실제 API 서버로 재호출합니다. 이 때 _next.config.ts_ 파일에 정의된대로 `/api/:path*`은 `${process.env.NEXT_PUBLIC_API_HOST}/:path*`로 호출하게 됩니다.

만약 basic auth가 필요한 API를 호출하는 경우 위와 같은 패턴으로 _routes.ts_ 파일의 URL에 `/basic` 프리픽스를 붙여서 사용할 수 있습니다.

## Todo

* Storybook 도입
