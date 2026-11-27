## v1.00i (BETA) — 2026-11-27

- 주식·코인 조회 중 일시적인 오류가 발생해도 마지막 정상 가격과 등락률을 유지합니다.
- 실패 시 10초 후 재시도하며, 정상 조회 시 기존 1분 갱신 주기를 유지합니다.
- PXL1·PXL2·PXL3 공통으로 적용했습니다.

## English

- Retain the last successful stock/crypto quote during temporary connection or fetch failures.
- Retry after 10 seconds on failure and keep the one-minute interval on success.
- Applied across PXL1, PXL2 and PXL3.
