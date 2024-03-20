## Parrot-World-Server

### Intro

> 패럿 월드 서버 소스 코드

### Tech Stack

| Name       |      Description      |
| ---------- | :-------------------: |
| Node.js    |  자바스크립트 런타임  |
| TypeScript |     타입스크립트      |
| Nest.js    |     웹 프레임워크     |
| MySQL      |          DB           |
| TypeORM    |          ORM          |
| Docker     |     컨테이너 관리     |
| SonarCloud |    코드 품질 관리     |
| Jest       |        테스트         |
| Github     |       형상관리        |

### Project Structure

```bash
.
├── src
│   ├── main.ts
│   ├── @types
│   ├── config
│   ├── libs
│   ├── middlewares
│   ├── migrations
│   ├── services
│   |   ├── 각 도메인별 폴더
│   |   |   ├── presentation
│   |   |   ├── application
│   |   |   ├── domain
│   |   |   ├── infrastructure
│   |   |   ├── dto
│   |   |   └── module.ts
```
