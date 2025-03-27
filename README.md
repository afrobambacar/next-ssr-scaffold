# next-ssr-scaffold

The combination of Next.js, React-query, Zustand and Tailwind

## Features

* Next.js의 App Router를 사용하기 위해 Redux를 과감하게 포기하고 Zustand 도입
* 토큰 쿠키를 브라우저에서 사용할 수 없도록 모든 API 호출은 내부 서버를 거쳐가도록 설정
* 프로덕션 환경에서 정적 파일의 CDN 이용을 위해 assetPrefix 설정
* lint나 tsc에서 에러 발생시 커밋을 막아주는 husky 설정
* 빌드 단계에서 필요한 환경변수를 받는 Dockerfile 설정

## Todo

* Storybook 도입
