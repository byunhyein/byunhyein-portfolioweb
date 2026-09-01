# 디자인 린트 보고서 — PORTFOLIO / Desktop / Draft 2 (node 7170-110)

> **검사 범위**: `7170:110` PORTFOLIO / Desktop / Draft 2 + 직속 자식 노드 (Footer `7170:115`, Main Content `7170:135`) 전체

---

## ⚡ 요약

| 분류 | 건수 |
|---|---|
| **자동 수정 가능** | 0 (쓰기 API 스코프 미확보) |
| **판단 필요 — 미바인딩 fills** | 4 |
| **판단 필요 — 미바인딩 strokes** | 1 |
| **판단 필요 — 미바인딩 effects** | 1 |
| **판단 필요 — 미바인딩 text style** | 1 |
| **시스템 미적용 (spacing·radius·폰트)** | - (변수 API 스코프 없어 판단 불가) |
| **미실행 (detach 컴포넌트 정밀 검사)** | J |
| **비시멘틱 로컬 스타일 이름** | 다수 (아래 목록 참고) |

---

## 1. 미바인딩 FILLS (4건) — 판단 필요

| 노드 ID | 이름 | 타입 | 현재 값 |
|---|---|---|---|
| `I7170:643;7057:28` | Slider Showcase / Pagination Dot 1 | RECTANGLE | `#FFFFFF` |
| `I7170:643;7057:29` | Slider Showcase / Pagination Dot 2 | RECTANGLE | `#FFFFFF` |
| `I7170:643;7057:30` | Slider Showcase / Pagination Dot 3 | RECTANGLE | `#FFFFFF` |
| `7170:645` | ⚠ Stray / Experience Timeline Dot | ELLIPSE | `#FFFFFF` |

> **참고**: Pagination Dot 노드들은 `opacity`가 변수에 바인딩(`VARIABLE_ALIAS`)돼 있고, fill 색상만 미바인딩입니다. `#FFFFFF`(흰색)이 의도된 고정값인지, 아니면 `color/White` 스타일/변수로 바인딩해야 하는지 확인 필요합니다.

---

## 2. 미바인딩 STROKES (1건)

| 노드 ID | 이름 | 현재 값 |
|---|---|---|
| `7170:645` | ⚠ Stray / Experience Timeline Dot | `#8273FA` (strokeWeight: 4px) |

> 로컬 스타일 목록에 `color/Mauvelous`, `color/Blue` 등이 있지만 `#8273FA`(보라계)와 정확히 일치하는 로컬 스타일이 없습니다. **판단 필요**: 신규 토큰 제안 또는 유사 토큰 대치 검토가 필요합니다.

---

## 3. 미바인딩 EFFECTS (1건)

| 노드 ID | 이름 | 이펙트 |
|---|---|---|
| `7170:645` | ⚠ Stray / Experience Timeline Dot | `DROP_SHADOW: rgba(130,115,250,0.22)` |

> 파일에 `Minimal Elementor/Card Subtle`, `Minimal Elementor/Card Elevated` 이펙트 스타일이 있습니다. 이 그림자가 해당 스타일과 일치하는지 확인 후 바인딩 여부 결정이 필요합니다.

---

## 4. 미바인딩 TEXT STYLE (1건)

| 노드 ID | 이름 | 폰트 | 굵기 | 크기 |
|---|---|---|---|---|
| `7170:641` | Works / Description | SUIT Variable | 600 | 20px |

> 텍스트 스타일(`textStyleId`)도 없고, `fontFamily` 변수 바인딩도 없습니다. 파일 내 텍스트 스타일 중 `font/Semantic/*` 또는 `Minimal Elementor/*` 계열로 바인딩 가능한지 확인 필요합니다.

---

## 5. 로컬 스타일 현황 (검사 항목 6·8번)

### 5-1. 사용된 폰트 패밀리
- `Pretendard Variable` ✅ (url.md에 CDN 확인됨)
- `SUIT Variable` ✅ (url.md에 CDN 확인됨)

### 5-2. 비시멘틱 색상 스타일 이름 (검사 항목 8번)

아래 로컬 Fill 스타일들은 **색상 이름이 역할(semantic role)이 아닌 색상 자체**로 명명돼 있습니다:

| 스타일 ID | 이름 | 비고 |
|---|---|---|
| `2924:22` | `color/Seashell Peach` | 색상명 |
| `2924:23` | `color/Conifer` | 색상명 |
| `2924:39` | `color/Fruit Salad` | 색상명 |
| `2924:40` | `color/Black` | 원시값에 가까움 |
| `2924:41` | `color/Bright Sun` | 색상명 |
| `2924:42` | `color/Flamingo` | 색상명 |
| `2924:43` | `color/Mauvelous` | 색상명 |
| `2924:64` | `color/Viking` | 색상명 |
| `2924:65` | `color/Champagne` | 색상명 |
| `2924:77` | `color/Witch Haze` | 색상명 |
| `2924:96` | `color/Snowy Mint` | 색상명 |
| `2924:104` | `color/White Pointer` | 색상명 |
| `2924:114` | `color/Fog` | 색상명 |
| `2924:123` | `color/Green Haze` | 색상명 |
| `2924:127` | `color/Shark` | 색상명 |
| `2924:141` | `color/Salem` | 색상명 |
| `2924:173` | `color/White 0.2%` | 값 그대로 이름 |
| `2924:226` | `color/White Black` | 의미 불명확 |

### 5-3. 중복 스타일 이름 (검사 항목 6번 — 로컬 스타일 남용 의심)

| 이름 | 중복 ID |
|---|---|
| `font/Inter/Regular` | `2924:170` 외 2개 (`2924:443`, `2924:507`, `2924:610`) |
| `color/Sushi` | `2924:145`, `2924:155` |
| `font/Semantic/Link` | `2924:342`, `2924:628`, `2924:637` |

---

## 6. 검사 항목별 상태

| 항목 | 상태 | 비고 |
|---|---|---|
| 1. 미바인딩 색상·간격·반경·타이포 | ⚠️ 부분 검출 | fills·strokes·effects·text 7건 발견. 간격·반경은 변수 API 스코프 없어 미검사 |
| 2. Detach된 공통 컴포넌트 | 미실행 (J) | `Pagination Dots / White` 인스턴스는 INSTANCE 타입 유지 중. detach 여부 확정 불가 |
| 3. 기본 이름 레이어 | ✅ 위반 없음 | `Frame 123` 류 없음 |
| 4. 스페이싱 스케일 이탈 | 시스템 미적용 (K) | 변수 API 스코프(`file_variables:read`) 없어 spacing 토큰 확인 불가 |
| 5. 컨테이너 최대폭 초과 | 시스템 미적용 (K) | 기준 변수 확인 불가 |
| 6. 로컬 스타일 남용 | ⚠️ 중복 발견 | `font/Inter/Regular`, `color/Sushi`, `font/Semantic/Link` 각 중복 |
| 7. 잠금 규칙 위반 흔적 | 이상 없음 | 발견 없음 |
| 8. 비시멘틱 변수·스타일 명명 | ⚠️ 다수 | 색상 스타일 18개+ 가 색상 이름 그대로 명명 |
| 9. 승인 폰트 외 사용 | ✅ 이상 없음 | `Pretendard Variable`, `SUIT Variable` — url.md 기준 모두 CDN 등록됨 |

---

## ⚠️ API 제약 사항

현재 Figma API 토큰의 스코프에 `file_variables:read`가 없어:
- **로컬 Variables** 전체 목록·이름 조회 불가 → spacing, radius, color 변수 이름 기반 매핑 불가
- `/variables/local` 엔드포인트가 403 반환

**해결 방법**: Figma → Settings → Personal access tokens에서 토큰 재발급 시 `file_variables:read` 스코프 추가 후 재검사하면 더 정밀한 린트가 가능합니다.

---

## 다음 단계 (승인 요청)

아래 항목 중 수정을 승인해 주세요:

1. **`7170:645` ⚠ Stray / Experience Timeline Dot**:
   - fill `#FFFFFF` → 파일 내 흰색 스타일(`color/White`)에 바인딩
   - stroke `#8273FA` → 해당 색상의 토큰 확인/생성 후 바인딩
   - drop-shadow `rgba(130,115,250,0.22)` → 이펙트 스타일 바인딩

2. **Pagination Dot 1·2·3 fill `#FFFFFF`** → `color/White` 스타일 바인딩

3. **`7170:641` Works / Description** 텍스트 스타일 → 적절한 텍스트 스타일에 바인딩

4. **비시멘틱 색상 스타일 이름 변경** → 역할 기반 이름으로 리네임 (값 자체는 변경 없음)
