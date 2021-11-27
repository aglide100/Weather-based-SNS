# Weather-base-SNS

## 1. 목적

이 프로젝트는 postgresql와 static webapp의 테스트 코드입니다!

react + nodejs로 구성을 하였으며

`/ui` 폴더에서 집중적으로 react를 다룹니다!

react는 nextjs을 이용하여 static으로 만들어 사용하며,

nodejs의 express로 정적파일을 라우팅을 하는 webd와 restful한 api로 데이터를 제공하는 apid로 구성합니다.

## 2. 실행방법

---

### Database

Database는 docker로 구성였으며

> cd ./cmd/db

> docker-compose build && docker-compose up -d

을 실행하거나 로컬로 올리셔도 상관없습니다.

---

### UI 실행

스테틱 생성

> cd ui/

> npm run make

또는 로컬에서 dev로 실행 (ui폴더에서)

> npm run dev

입니다.

---

### apid 및 webd 실행

npm script로 실행하며 

> npm run build && npm run start

docker을 사용하신다면 전체 프로젝트 빌드는

> docker-compose build && docker-compose up -d

## 3. 의존성

---

본 레포는 기본적으로 typescript을 이용하며 루트디렉터링에서의 js는 tsc를 통해 보일러플레이트된 코드입니다.

그래서 작업은 ts파일을 통해서 작업을 해주시면 되겠습니다.


DB나 프로젝트를 위해 docker와 docker-compose를 사용하였습니다.

아래의 환경에서 테스트 하였으며 macos에서 테스트하였으며

docker버전은 아래와 같습니다.

```
Docker version 20.10.7, build f0df350

Client:
 Cloud integration: 1.0.17
 Version:           20.10.7
 API version:       1.41
 Go version:        go1.16.4
 Git commit:        f0df350
 Built:             Wed Jun  2 11:56:22 2021
 OS/Arch:           darwin/amd64
 Context:           default
 Experimental:      true

Server: Docker Engine - Community
 Engine:
  Version:          20.10.7
  API version:      1.41 (minimum version 1.12)
  Go version:       go1.13.15
  Git commit:       b0f5bc3
  Built:            Wed Jun  2 11:54:58 2021
  OS/Arch:          linux/amd64
  Experimental:     false
 containerd:
  Version:          1.4.6
  GitCommit:        d71fcd7d8303cbf684402823e425e9dd2e99285d
 runc:
  Version:          1.0.0-rc95
  GitCommit:        b9ee9c6314599f1b4a7f497e1f1f856fe433d3b7
 docker-init:
  Version:          0.19.0
  GitCommit:        de40ad0
```

node의 버전은 아래와 같습니다.

```
node v16.8.0
```
