# Mayday Deskgear

ESP32-S3 JC3248W535 3.5인치 터치 보드용 탁상 디스플레이입니다. PXL1, PXL2, PXL3 Meridian 중에서 선택해 시계·날씨·타이머·집중 타이머·시세·유튜브 구독자 수를 표시합니다.

[설치 및 업데이트](https://maydaycom.github.io/mayday-deskgear/) · [Installation in English](https://maydaycom.github.io/mayday-deskgear/en/) · [버전별 다운로드](https://github.com/MayDayCom/mayday-deskgear/releases)

## MAYDAY OBI와 함께 사용하기

[배터리 진단용 MAYDAY OBI](https://maydaycom.github.io/mayday-obi/)와 같은 보드를 사용합니다. 현재 펌웨어의 Wi-Fi 업데이트 화면에서 일반 `firmware.bin`을 선택하면 반대편 슬롯에 설치합니다. 두 슬롯에 서로 다른 제품이 들어 있으면 복구 메뉴에서 제품명을 확인한 뒤 재부팅해 전환할 수 있습니다. 추가 업데이트는 반대편 슬롯을 교체합니다. `firmware.factory.bin`은 USB 최초 설치·복구용입니다.

The [MAYDAY OBI project](https://maydaycom.github.io/mayday-obi/en/) provides battery diagnostics for the same board. Use the app BIN over Wi-Fi to write the inactive slot. Each new update replaces that slot. Use the factory BIN for USB installation or recovery.

## 배포

같은 빌드의 두 BIN을 `firmware/`에 함께 넣고 변경 내용을 `RELEASE_NOTES.md`에 기록해 main에 커밋합니다. Actions가 두 파일과 슬롯 크기를 대조하고 펌웨어에서 버전을 읽어 릴리즈와 홈페이지를 갱신합니다. 두 파일의 이름은 그대로 유지합니다. 내부 제품 식별자는 기존 OBI와의 호환을 위해 PXL을 사용합니다.
