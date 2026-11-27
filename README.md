# Mayday Deskgear

ESP32-S3 JC3248W535 3.5인치 터치 보드용 탁상 디스플레이입니다. PXL1, PXL2, PXL3 Meridian 중에서 선택해 시계·날씨·타이머·집중 타이머·시세·유튜브 구독자 수를 표시합니다.

[설치 및 업데이트](https://maydaycom.github.io/mayday-deskgear/) · [Installation in English](https://maydaycom.github.io/mayday-deskgear/en/) · [버전별 다운로드](https://github.com/MayDayCom/mayday-deskgear/releases)

## 업데이트 기록 / Release history

### v1.00i BETA — 2026-11-27

- 주식·코인 시세 조회 실패 시 마지막 정상 가격과 등락률 유지.
- 조회 실패 시 10초 후 재시도, 성공 시 1분 갱신 간격 유지 (PXL1·PXL2·PXL3 공통).
- Retain the last valid market quote during temporary connection failures; retry after 10 seconds.

[v1.00i 릴리즈 / Release](https://github.com/MayDayCom/mayday-deskgear/releases/tag/v1.00i)

### v1.00h BETA — 2026-11-24

- 메인 설정창에 OBI 스타일 배터리 전압 표시 추가 (IO9, 측정 불가 시 `-- V`).
- 국내 주식 프리마켓·정규장·애프터마켓 시세 자동 전환 (1분 갱신).
- PXL1·PXL2의 시계와 PXL3의 주요 수치 변경 시 짧은 색상 전환 효과 추가.
- Added board battery voltage in Settings, Korean extended-session quotes, and subtle value-change animations.

[v1.00h 릴리즈 / Release](https://github.com/MayDayCom/mayday-deskgear/releases/tag/v1.00h)

### v1.00g BETA — 2026-11-23

- 국내 주식 네이버 금융 연동 및 거래일 검증
- PXL1·PXL2 날씨 정렬, PXL2 가격 표시와 스크린세이버 개선
- PXL3 현재가·등락률 동시 표시 및 유튜브 재생 아이콘·스크린세이버 개선
- AM/PM 표시 및 설정 글씨·버튼 정렬 개선
- Naver Finance for Korean stocks, refined weather and quote layouts, simultaneous PXL3 price/change, YouTube screensavers and settings polish.

[v1.00g 릴리즈 / Release](https://github.com/MayDayCom/mayday-deskgear/releases/tag/v1.00g)

### v1.00e BETA

- USB 버전 확인, 반대편 슬롯 업데이트 및 자동 재부팅 / USB version detection and verified inactive-slot updates.

## USB 업데이트

홈페이지의 USB 설치 버튼에서 Deskgear v1.00e 이상을 인식하면 반대편 슬롯에 일반 BIN을 저장합니다. 확인되지 않는 보드는 최초 설치·복구를 명시적으로 선택해야 합니다. v1.00d 이하 또는 OBI를 유지하려면 Wi-Fi로 한 번 전환하세요. [전체 화면 갤러리](https://maydaycom.github.io/mayday-deskgear/#screens)

## MAYDAY OBI와 함께 사용하기

[배터리 진단용 MAYDAY OBI](https://maydaycom.github.io/mayday-obi/)와 같은 보드를 사용합니다. **OBI 사용자는 먼저 v1.10w 이상으로 업데이트해 주세요.** 이후 현재 펌웨어의 Wi-Fi 업데이트 화면에서 일반 `firmware.bin`을 선택하면 반대편 슬롯에 설치합니다. 두 슬롯에 서로 다른 제품이 들어 있으면 복구 메뉴에서 제품명을 확인한 뒤 재부팅해 전환할 수 있습니다. 추가 업데이트는 반대편 슬롯을 교체합니다. `firmware.factory.bin`은 USB 최초 설치·복구용입니다.

The [MAYDAY OBI project](https://maydaycom.github.io/mayday-obi/en/) provides battery diagnostics for the same board. **Update OBI to v1.10w or newer first.** Use the app BIN over Wi-Fi to write the inactive slot. Each new update replaces that slot. Use the factory BIN for USB installation or recovery.

## 배포

같은 빌드의 두 BIN을 `firmware/`에 함께 넣고 변경 내용을 `RELEASE_NOTES.md`에 기록해 main에 커밋합니다. Actions가 두 파일과 슬롯 크기를 대조하고 펌웨어에서 버전을 읽어 릴리즈와 홈페이지를 갱신합니다. 두 파일의 이름은 그대로 유지합니다. 내부 제품 식별자는 기존 OBI와의 호환을 위해 PXL을 사용합니다.
