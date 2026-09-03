// ─────────────────────────────────────────────────────────────────────────
// 대전 홍보 랜딩페이지 — 순수 HTML/CSS/JS 버전
// ─────────────────────────────────────────────────────────────────────────

// ── 아이콘 경로 ──────────────────────────────────────────────────────────
const ICONS = {
  arboretum: "images/icons/arboretum.png",
  bicycle: "images/icons/bicycle.png",
  bread: "images/icons/bread.png",
  bus: "images/icons/bus.png",
  car: "images/icons/car.png",
  coffee: "images/icons/coffee.png",
  tower: "images/icons/tower.png",
  flower: "images/icons/flower.png",
  soboro: "images/icons/soboro.png",
  lake: "images/icons/lake.png",
  leaf: "images/icons/leaf.png",
  mountain: "images/icons/mountain.png",
  observatory: "images/icons/observatory.png",
  atom: "images/icons/atom.png",
  subway: "images/icons/subway.png",
  train: "images/icons/train.png",
  tree: "images/icons/tree.png",
  museum: "images/icons/museum.png",
  market: "images/icons/market.png",
  ticket: "images/icons/ticket.png",
  artMuseum: "images/icons/art-museum.png",
  drive: "images/icons/drive.png",
  telescope: "images/icons/telescope.png",
  kalguksu: "images/icons/kalguksu.png",
  tofu: "images/icons/tofu.png",
  spa: "images/icons/spa.png",
  jinro: "images/icons/jinro.png",
  park: "images/icons/park.png",
  game: "images/icons/game.png",
  food: "images/icons/food.png",
  nightview: "images/icons/nightview.png",
  rakepark: "images/icons/rakepark.png",
  motel: "images/icons/motel.png",
  sport: "images/icons/sport.png",
  station: "images/icons/station.png",
  supark: "images/icons/supark.png",
};

// ── 팔레트 ───────────────────────────────────────────────────────────────
const C = {
  food: { main: "#ff7b54", soft: "#fff0eb", light: "#ffe4d8" },
  heal: { main: "#52c27a", soft: "#edf9f2", light: "#d0f0e0" },
  active: { main: "#6aabf7", soft: "#eef5ff", light: "#cde2ff" },
  culture: { main: "#a07ee0", soft: "#f5f0ff", light: "#e8dcff" },
  spa: { main: "#f0a050", soft: "#fff8f0", light: "#ffe8cc" },
  yellow: "#ffd166",
  navy: "#3a5a8a",
  text: "#3a3a3a",
  sub: "#9a9a9a",
};

const TYPE_C = {
  미식: C.food,
  힐링: C.heal,
  액티비티: C.active,
};

const TYPE_ICON = {
  미식: ICONS.soboro,
  힐링: ICONS.leaf,
  액티비티: ICONS.mountain,
};

const TYPE_KEY = {
  미식: "food",
  힐링: "heal",
  액티비티: "active",
};

// ── 아이콘 헬퍼 ──────────────────────────────────────────────────────────
function ico(src, size = 28) {
  return `<img class="ico" src="${src}" alt="" style="width:${size}px;height:${size}px;">`;
}

function transportIcon(text) {
  if (text.includes("지하철")) return ICONS.subway;
  if (text.includes("버스")) return ICONS.bus;
  if (text.includes("기차") || text.includes("KTX")) return ICONS.train;
  if (text.includes("차로") || text.includes("주차")) return ICONS.car;
  if (text.includes("자전거")) return ICONS.bicycle;

  return null;
}

// ── 드래그 스크롤 ────────────────────────────────────────────────────────
function enableDragScroll(el, axis = "x") {
  if (!el || el.dataset.dragScrollBound === "1") return;

  el.dataset.dragScrollBound = "1";

  let isDown = false;
  let startPos = 0;
  let startScroll = 0;

  const getPos = (e) => (axis === "x" ? e.pageX : e.pageY);

  el.addEventListener("mousedown", (e) => {
    isDown = true;
    el.classList.add("dragging");

    startPos = getPos(e);
    startScroll = axis === "x" ? el.scrollLeft : el.scrollTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (!isDown) return;

    e.preventDefault();

    const delta = getPos(e) - startPos;

    if (axis === "x") {
      el.scrollLeft = startScroll - delta;
    } else {
      el.scrollTop = startScroll - delta;
    }
  });

  document.addEventListener("mouseup", () => {
    isDown = false;
    el.classList.remove("dragging");
  });

  el.addEventListener("dragstart", (e) => e.preventDefault());
}

// 컨테이너 안의 첫 N개 항목까지만 보이도록 높이 제한
function limitVisibleItems(scrollEl, itemSelector, maxVisible) {
  if (!scrollEl) return;

  const items = scrollEl.querySelectorAll(itemSelector);

  if (items.length <= maxVisible) {
    scrollEl.style.maxHeight = "none";
    scrollEl.classList.remove("scroll-y");
    return;
  }

  const containerTop = scrollEl.getBoundingClientRect().top;
  const lastVisible = items[maxVisible - 1];

  const height =
    lastVisible.getBoundingClientRect().bottom - containerTop;

  scrollEl.style.maxHeight = `${height}px`;
  scrollEl.classList.add("scroll-y");
}

// ── 코스 데이터 ──────────────────────────────────────────────────────────
const COURSE_DATA = {
  자차: {
    미식: {
      day1: [
        {
          time: "12:00",
          name: "진로집",
          desc: "두부두루치기와 수육으로 유명한 대전의 노포 맛집",
          icon: ICONS.jinro,
          transport: "",
        },
        {
          time: "13:30",
          name: "대전근현대사 전시관",
          desc: "옛 충남도청사에서 대전의 근현대 역사를 만나보는 전시 공간",
          icon: ICONS.museum,
          transport: "차로 약 5분",
        },
        {
          time: "15:30",
          name: "테미오래",
          desc: "옛 충남도지사 관사를 따라 산책하며 즐기는 감성 문화공간",
          icon: ICONS.park,
          transport: "차로 약 5분",
        },
        {
          time: "17:30",
          name: "성심당 본점",
          desc: "튀김소보로부터 부추빵까지 맛보는 대전 대표 베이커리",
          icon: ICONS.soboro,
          transport: "차로 약 5분",
        },
        {
          time: "18:30",
          name: "쿵스 게임랜드",
          desc: "롤러스케이트와 오락실을 한 번에 즐기는 실내 놀거리",
          icon: ICONS.game,
          transport: "차로 약 5분",
        },
        {
          time: "19:30",
          name: "한영식당",
          desc: "매콤한 닭도리탕으로 든든하게 하루를 마무리하는 대전 맛집",
          icon: ICONS.food,
          transport: "차로 약 10분",
        },
        {
          time: "20:30",
          name: "목척교 야경",
          desc: "대전천을 따라 야경과 산책을 즐기며 하루를 마무리하는 코스",
          icon: ICONS.nightview,
          transport: "차로 약 10분",
        },
      ],
      day2: [
        {
          time: "10:30",
          name: "투드커피",
          desc: "도심을 벗어나 여유로운 분위기에서 커피를 즐기는 감성 카페",
          icon: ICONS.coffee,
          transport: "",
        },
        {
          time: "11:00",
          name: "장태산자연휴양림",
          desc: "높게 뻗은 메타세쿼이아 숲길을 걸으며 힐링하는 대전 대표 자연 명소",
          icon: ICONS.mountain,
          transport: "차로 약 20분",
        },
        {
          time: "13:00",
          name: "철원식당 막국수",
          desc: "시원한 막국수 한 그릇으로 여행을 마무리하기 좋은 로컬 식당",
          icon: ICONS.kalguksu,
          transport: "차로 약 15분",
        },
      ],
    },

    힐링: {
      day1: [
        {
          time: "10:30",
          name: "장태산자연휴양림",
          desc: "메타세쿼이아 숲길을 산책하며 피톤치드와 자연을 즐기는 힐링 코스",
          icon: ICONS.mountain,
          transport: "차로 약 5~10분",
        },
        {
          time: "13:10",
          name: "학식당",
          desc: "한정식과 지역 백반을 조용한 시골 분위기에서 즐기는 점심 맛집",
          icon: ICONS.food,
          transport: "차로 약 25~30분",
        },
        {
          time: "14:50",
          name: "갑천생태호수공원",
          desc: "호숫가 산책로와 데크길을 천천히 걸으며 물멍하기 좋은 자연 명소",
          icon: ICONS.rakepark,
          transport: "차로 약 30분",
        },
        {
          time: "16:40",
          name: "유성온천역 권역",
          desc: "숙소에 체크인하고 휴식을 즐기며 여행의 피로를 풀어보는 시간",
          icon: ICONS.spa,
          transport: "차로 약 15~20분",
        },
        {
          time: "18:10",
          name: "오씨칼국수 도룡점",
          desc: "칼국수와 만두로 따뜻하고 든든하게 하루를 마무리하는 대전 로컬 맛집",
          icon: ICONS.kalguksu,
          transport: "차로 약 15~20분",
        },
      ],
      day2: [
        {
          time: "10:30",
          name: "대청호자연수변공원",
          desc: "대청호 풍경을 바라보며 호숫가 산책과 수변 데크길을 즐기는 힐링 코스",
          icon: ICONS.rakepark,
          transport: "차로 약 35분",
        },
        {
          time: "12:45",
          name: "들마루식당 대청호점",
          desc: "도리뱅뱅과 민물매운탕으로 든든한 점심을 즐기는 대청호 로컬 맛집",
          icon: ICONS.tofu,
          transport: "차로 약 10분",
        },
        {
          time: "14:30",
          name: "cafe 아마떼 대청호점",
          desc: "대청호 전망을 바라보며 커피와 디저트, 여유로운 대화를 즐기는 카페",
          icon: ICONS.coffee,
          transport: "차로 약 10분",
        },
      ],
    },

    액티비티: {
      day1: [
        {
          time: "10:00",
          name: "장태산 자연휴양림 숲속어드벤처",
          desc: "메타세쿼이아 숲속에서 출렁다리와 숲길을 누비며 즐기는 액티비티",
          icon: ICONS.mountain,
          transport: "차로 약 35~40분",
        },
        {
          time: "12:30",
          name: "성심당 본점",
          desc: "튀김소보로와 부추빵으로 에너지를 충전하는 대전 대표 베이커리",
          icon: ICONS.soboro,
          transport: "차로 약 5~10분",
        },
        {
          time: "14:00",
          name: "레이저태그 스포츠",
          desc: "팀을 나눠 레이저건으로 대결하는 박진감 넘치는 실내 서바이벌",
          icon: ICONS.game,
          transport: "차로 약 5~10분",
        },
        {
          time: "16:00",
          name: "한영식당",
          desc: "매콤한 닭도리탕으로 든든하게 배를 채우는 대전 대표 로컬 맛집",
          icon: ICONS.food,
          transport: "차로 약 5분",
        },
        {
          time: "17:30",
          name: "안흥여관 공포 방탈출",
          desc: "낡은 여관을 배경으로 미션을 해결하는 몰입감 높은 공포 방탈출",
          icon: ICONS.motel,
          transport: "차로 약 5분",
        },
        {
          time: "19:00",
          name: "목척교·스카이로드 야경",
          desc: "화려한 스카이로드와 목척교를 걸으며 즐기는 대전 도심 야경",
          icon: ICONS.nightview,
          transport: "차로 약 25~30분",
        },
        {
          time: "20:30",
          name: "식장산 전망대",
          desc: "대전 시내의 불빛을 한눈에 내려다보며 하루를 마무리하는 야경 명소",
          icon: ICONS.telescope,
          transport: "",
        },
      ],
      day2: [
        {
          time: "10:00",
          name: "남선공원 종합체육관",
          desc: "스쿼시·수영·스케이트 등 다양한 실내 스포츠를 골라 즐기는 액티비티 공간",
          icon: ICONS.sport,
          transport: "차로 약 10분",
        },
        {
          time: "12:30",
          name: "수라면옥",
          desc: "시원한 평양냉면과 불고기로 운동 후 든든하게 즐기는 점심",
          icon: ICONS.kalguksu,
          transport: "차로 약 15~20분",
        },
        {
          time: "14:00",
          name: "갑천 수상스포츠 체험장",
          desc: "도심 속 갑천에서 카약과 수상레저를 직접 체험하며 여행을 마무리하는 코스",
          icon: ICONS.sport,
          transport: "",
        },
      ],
    },
  },

  대중교통: {
    미식: {
      day1: [
        {
          time: "10:30",
          name: "대전역",
          desc: "대전역 도착 후 시작하는 대전 미식 여행",
          icon: ICONS.station,
          transport: "차로 약 10분",
        },
        {
          time: "11:00",
          name: "대선칼국수",
          desc: "진한 멸치육수와 부드러운 면발로 유명한 대전 대표 칼국수 노포",
          icon: ICONS.kalguksu,
          transport: "차로 약 10분",
        },
        {
          time: "12:30",
          name: "한밭수목원",
          desc: "도심 한가운데 넓은 정원과 숲길을 여유롭게 걷기 좋은 산책 명소",
          icon: ICONS.supark,
          transport: "차로 약 5분",
        },
        {
          time: "14:00",
          name: "엑스포다리·갑천 산책",
          desc: "엑스포다리와 갑천을 따라 대전의 도심 풍경을 즐기는 산책 코스",
          icon: ICONS.nightview,
          transport: "차로 약 5분",
        },
        {
          time: "15:30",
          name: "성심당 DCC점",
          desc: "튀김소보로부터 다양한 빵과 디저트까지 즐기는 성심당의 대형 매장",
          icon: ICONS.soboro,
          transport: "차로 약 15분",
        },
        {
          time: "17:00",
          name: "유성온천 족욕체험장",
          desc: "무료 온천 족욕으로 걸어 다닌 여행의 피로를 풀어보는 힐링 코스",
          icon: ICONS.spa,
          transport: "차로 약 10분",
        },
        {
          time: "18:30",
          name: "호연재",
          desc: "차분한 분위기에서 정갈한 한식으로 하루를 마무리하는 저녁 맛집",
          icon: ICONS.food,
          transport: "",
        },
      ],
      day2: [
        {
          time: "10:00",
          name: "유림공원·갑천 산책",
          desc: "푸른 공원과 갑천변을 천천히 걸으며 여유롭게 시작하는 둘째 날",
          icon: ICONS.rakepark,
          transport: "차로 약 10분",
        },
        {
          time: "11:30",
          name: "원조태평소국밥 본관",
          desc: "진한 소고기 국물과 푸짐한 고기로 든든하게 즐기는 대전 대표 소국밥",
          icon: ICONS.food,
          transport: "차로 약 15분",
        },
        {
          time: "13:30",
          name: "화폐박물관",
          desc: "우리나라 화폐의 역사와 다양한 실물 화폐를 둘러보며 여행을 마무리하는 박물관",
          icon: ICONS.museum,
          transport: "",
        },
      ],
    },

    힐링: {
      day1: [
        {
          time: "11:00",
          name: "대전역 도착",
          desc: "대전역에서 시작하는 여유로운 대중교통 힐링 여행",
          icon: ICONS.station,
          transport: "지하철 약 20분",
        },
        {
          time: "11:40",
          name: "점심식사 구르메",
          desc: "깔끔하고 정갈한 한정식으로 든든하게 시작하는 점심",
          icon: ICONS.food,
          transport: "도보 약 15분",
        },
        {
          time: "13:20",
          name: "한밭수목원",
          desc: "도심 속 자연을 천천히 걸으며 여유를 즐기는 대전 대표 수목원",
          icon: ICONS.supark,
          transport: "도보 약 10분",
        },
        {
          time: "15:40",
          name: "대전시립미술관",
          desc: "전시를 감상하며 조용하고 여유로운 오후를 보내는 문화 공간",
          icon: ICONS.artMuseum,
          transport: "도보 약 10분",
        },
        {
          time: "17:10",
          name: "카페 휴식 타르트",
          desc: "한밭수목원 인근에서 커피와 디저트를 즐기며 쉬어가는 카페",
          icon: ICONS.coffee,
          transport: "지하철 약 30분",
        },
        {
          time: "19:30",
          name: "저녁 식사 온천칼국수",
          desc: "따뜻한 칼국수 한 그릇으로 든든하게 마무리하는 저녁 식사",
          icon: ICONS.kalguksu,
          transport: "도보 약 10분",
        },
        {
          time: "20:40",
          name: "유성온천 족욕체험장",
          desc: "무료 온천 족욕으로 하루 동안 쌓인 여행의 피로를 풀어보는 힐링 코스",
          icon: ICONS.spa,
          transport: "도보 약 5분",
        },
        {
          time: "21:30",
          name: "숙소 휴식",
          desc: "유성온천역 인근 숙소에서 편안하게 하루를 마무리",
          icon: ICONS.motel,
          transport: "",
        },
      ],
      day2: [
        {
          time: "09:30",
          name: "숙소에서 여유 시간",
          desc: "천천히 기상하고 체크아웃하며 여유롭게 시작하는 기상하고 둘째 날",
          icon: ICONS.motel,
          transport: "버스 약 20분",
        },
        {
          time: "11:00",
          name: "브라운핸즈 둔산점",
          desc: "감성적인 공간에서 브런치와 커피를 즐기며 시작하는 여유로운 아침",
          icon: ICONS.coffee,
          transport: "도보 약 15분",
        },
        {
          time: "12:50",
          name: "갑천 산책로",
          desc: "도심 속 갑천을 따라 천천히 걸으며 자연과 여유를 즐기는 산책 코스",
          icon: ICONS.rakepark,
          transport: "버스 약 10분",
        },
        {
          time: "14:40",
          name: "소제동 커먼즈필드",
          desc: "넓은 공간에서 전시와 휴식을 즐기며 여행의 여운을 남기는 마지막 코스",
          icon: ICONS.artMuseum,
          transport: "지하철 약 15분",
        },
        {
          time: "16:30",
          name: "대전역 이동 및 귀가",
          desc: "대전역으로 이동해 여유롭게 1박 2일 여행을 마무리",
          icon: ICONS.station,
          transport: "",
        },
      ],
    },

    액티비티: {
      day1: [
        {
          time: "10:30",
          name: "대전역 도착",
          desc: "대전역에서 시작하는 액티비티 가득한 1박 2일 여행",
          icon: ICONS.telescope,
          transport: "도보 약 5분",
        },
        {
          time: "10:40",
          name: "중앙시장",
          desc: "대전 대표 전통시장을 둘러보며 간식과 먹거리를 즐기는 첫 코스",
          icon: ICONS.ticket,
          transport: "도보 약 5분",
        },
        {
          time: "11:30",
          name: "성심당 본점",
          desc: "튀김소보로와 부추빵 등 대전 대표 빵으로 든든하게 에너지 충전",
          icon: ICONS.museum,
          transport: "도보 약 5~10분",
        },
        {
          time: "13:00",
          name: "레이저태그 스포츠",
          desc: "레이저건을 들고 팀을 나눠 대결하는 박진감 넘치는 실내 서바이벌 게임",
          icon: ICONS.observatory,
          transport: "도보 약 5~10분",
        },
        {
          time: "15:00",
          name: "한영식당",
          desc: "매콤한 닭도리탕으로 든든하게 배를 채우는 대전 대표 로컬 맛집",
          icon: ICONS.train,
          transport: "도보 약 5~10분",
        },
        {
          time: "16:30",
          name: "안흥여관 공포 방탈출",
          desc: "낡은 여관을 배경으로 미션을 해결하는 몰입감 높은 공포 방탈출",
          icon: ICONS.bicycle,
          transport: "도보 약 10분",
        },
        {
          time: "18:30",
          name: "목척교 분수대 야경",
          desc: "목척교와 대전천의 불빛을 바라보며 하루를 마무리하는 도심 야경 코스",
          icon: ICONS.observatory,
          transport: "",
        },
      ],
      day2: [
        {
          time: "10:00",
          name: "남선공원 종합체육관",
          desc: "스쿼시·수영·스케이트 등 다양한 실내 스포츠를 골라 즐기는 액티비티 공간",
          icon: ICONS.spa,
          transport: "버스 약 10~15분",
        },
        {
          time: "12:30",
          name: "수라면옥",
          desc: "운동 후 시원한 냉면과 불고기로 든든하게 에너지를 채우는 점심",
          icon: ICONS.arboretum,
          transport: "버스 약 15~20분",
        },
        {
          time: "14:00",
          name: "갑천 수상스포츠 체험장",
          desc: "도심 속 갑천에서 카약과 수상레저를 체험하며 짜릿하게 여행을 마무리",
          icon: ICONS.train,
          transport: "",
        },
      ],
    },
  },
};

// ── 유명한 곳 데이터 ─────────────────────────────────────────────────────
const FAMOUS = [
  {
    category: "먹거리",
    colorKey: "food",
    emoji: "먹거리",
    places: [
      {
        name: "성심당",
        desc: "대전 대표 빵집. 튀김소보로·판타롱부추빵.",
        img: "https://photo.daejeon.go.kr/thumbnail/201512/1920_PDB_201910301118147760.JPG",
        icon: ICONS.soboro,
      },
      {
        name: "소제동 카페",
        desc: "감성 카페 밀집 골목. 인스타 성지.",
        img: "https://photo.daejeon.go.kr/thumbnail/202410/1024_PDB_202505200335216270.jpg",
        icon: ICONS.coffee,
      },
      {
        name: "한영식당",
        desc: "두부두루치기, 납작만두, 생선구이.",
        img: "https://tong.visitkorea.or.kr/cms/resource/42/3071542_image2_1.JPG",
        icon: ICONS.market,
      },
      {
        name: "대선칼국수",
        desc: "대전식 생칼국수 원조 골목. 얼큰하고 시원해요.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYJHEikdCMHKV5ovDIeDuGOkky1IRfIsdl-jmrHcnyow&s=10",
        icon: ICONS.kalguksu,
      },
      {
        name: "원조태평소국밥",
        desc: "대전식 생칼국수 원조 골목. 얼큰하고 시원해요.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpwG32SC6WJ5Ggg7JkfqjOoRmJp_-QJpo1AFfFoSFlVw&s=10",
        icon: ICONS.kalguksu,
      },
    ],
  },
  {
    category: "자연·힐링",
    colorKey: "heal",
    emoji: "자연",
    places: [
      {
        name: "한밭수목원",
        desc: "도심 속 100만㎡ 숲. 사계절 산책.",
        img: "https://photo.daejeon.go.kr/thumbnail/202011/1024_PDB_202107060218302680.jpg",
        icon: ICONS.arboretum,
      },
      {
        name: "계룡산",
        desc: "충청도 명산. 다양한 등산 코스.",
        img: "photo-1701097662947-2f58a95a59aa",
        icon: ICONS.mountain,
      },
      {
        name: "대청호",
        desc: "드라이브·카약·카페·벚꽃길. 물빛이 예뻐요.",
        img: "https://photo.daejeon.go.kr/thumbnail/202002/1024_PDB_202107060228110450.jpg",
        icon: ICONS.drive,
      },
      {
        name: "식장산 야경",
        desc: "차로 등산가능. 대전시내 야경이 한눈에",
        img: "https://photo.daejeon.go.kr/thumbnail/202008/1024_PDB_202107060229336180.JPG",
        icon: ICONS.tree,
      },
      {
        name: "유성온천",
        desc: "알칼리성 라듐 온천. 대전 명물.",
        img: "https://photo.daejeon.go.kr/thumbnail/202603/1024_PDB_202604180836019240.jpg",
        icon: ICONS.spa,
      },
      {
        name: "계족산 황톳길",
        desc: "맨발로 걷는 14.5km 황톳길.",
        img: "https://photo.daejeon.go.kr/thumbnail/201900/1024_PDB_202003031135009860.JPG",
        icon: ICONS.tree,
      },
      {
        name: "대전 타워",
        desc: "대전 랜드마크 야경 포인트.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT2rBIjgaPBDAevgpav-R4IWt5NSXvnMBaOgJOVN2r3Zg&s=10",
        icon: ICONS.tower,
      },
      {
        name: "갑천 수변공원",
        desc: "산책로·자전거·야경 모두 즐길 수 있어요.",
        img: "https://photo.daejeon.go.kr/thumbnail/202509/1024_PDB_202511220442092360.jpg",
        icon: ICONS.bicycle,
      },
    ],
  },
  {
    category: "문화·관광",
    colorKey: "culture",
    emoji: "문화",
    places: [
      {
        name: "엑스포과학공원",
        desc: "1993 세계박람회 부지. 과학 체험.",
        img: "photo-1643051666176-b6472231b313",
        icon: ICONS.telescope,
      },
      {
        name: "대전시립미술관",
        desc: "무료 입장. 수준 높은 기획전시.",
        img: "https://photo.daejeon.go.kr/thumbnail/202510/1024_PDB_202512020827294690.jpg",
        icon: ICONS.artMuseum,
      },
      {
        name: "대전시립박물관",
        desc: "대전의 역사·문화 무료 관람.",
        img: "https://photo.daejeon.go.kr/thumbnail/202404/1024_PDB_202407161046249370.jpg",
        icon: ICONS.museum,
      },
      {
        name: "보문산 전망대",
        desc: "대전 야경이 한눈에 들어오는 뷰포인트.",
        img: "https://photo.daejeon.go.kr/thumbnail/202604/1024_PDB_202605100951586500.jpg",
        icon: ICONS.observatory,
      },
    ],
  },
  {
    category: "액티비티",
    colorKey: "spa",
    emoji: "힐링",
    places: [
      {
        name: "갑천수상스포츠",
        desc: "도심속 갑천에서 즐기는 수상 레포츠",
        img: "https://photo.daejeon.go.kr/thumbnail/202409/1024_PDB_202505200253387930.jpg",
      },
      {
        name: "장태산 숲속어드벤처",
        desc: "울창한 숲속 스카이워크",
        img: "https://photo.daejeon.go.kr/thumbnail/201500/1024_PDB_202004100555131260.jpg",
      },
      {
        name: "남선공원 종합체육관",
        desc: "사계절 실내 스케이트, 스쿼시, 수영",
        img: "https://photo.daejeon.go.kr/thumbnail/201612/1024_PDB_201910250334267220.JPG",
      },
      {
        name: "안흥여관",
        desc: "여관건물 통채로 방탈출. 진짜귀신나와요!",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDU_ZR2siWA0mbMjjsY7AhfURCDoPeck47WaYPaqtZKg&s=10",
      },
      {
        name: "레이저 태그 스포츠",
        desc: "팀을 나눠 레이저건으로 대결하는 박진감 넘치는 실내 서바이벌.",
        img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRxakbmj3gkuh6HFe1oRXyltmPOsgO1_qMy_N4K7wMHfQ&s",
      },

    ],
      },
];

const FAMOUS_TAB_ICONS = [
  ICONS.soboro,
  ICONS.leaf,
  ICONS.atom,
  ICONS.flower,
];

function colorOf(key) {
  return C[key];
}

// ─────────────────────────────────────────────────────────────────────────
// 배경 장식
// ─────────────────────────────────────────────────────────────────────────
function renderBgDecor() {
  const el = document.getElementById("bg-decor");

  const circles = [
    { top: "5%", left: "4%", s: 120, o: 0.06 },
    { top: "30%", right: "2%", s: 80, o: 0.05 },
    { top: "65%", left: "1%", s: 100, o: 0.05 },
  ];

  const stars = [
    {
      top: "8%",
      left: "10%",
      color: C.yellow,
      opacity: 0.5,
      size: 18,
    },
    {
      top: "16%",
      right: "8%",
      color: C.food.main,
      opacity: 0.3,
      size: 12,
    },
    {
      top: "48%",
      right: "5%",
      color: C.yellow,
      opacity: 0.4,
      size: 16,
    },
    {
      bottom: "25%",
      left: "6%",
      color: C.heal.main,
      opacity: 0.35,
      size: 14,
    },
  ];

  let html = "";

  circles.forEach((c) => {
    const pos = c.left
      ? `left:${c.left};`
      : `right:${c.right};`;

    html += `
      <div
        class="circle"
        style="
          top:${c.top};
          ${pos}
          width:${c.s}px;
          height:${c.s}px;
          opacity:${c.o};
        "
      ></div>
    `;
  });

  stars.forEach((s) => {
    const vpos = s.top
      ? `top:${s.top};`
      : `bottom:${s.bottom};`;

    const hpos = s.left
      ? `left:${s.left};`
      : `right:${s.right};`;

    html += `
      <svg
        class="star"
        width="${s.size}"
        height="${s.size}"
        viewBox="0 0 16 16"
        style="
          ${vpos}
          ${hpos}
          color:${s.color};
          opacity:${s.opacity};
        "
      >
        <path
          d="M8 0L9.8 6.2L16 8L9.8 9.8L8 16L6.2 9.8L0 8L6.2 6.2Z"
          fill="currentColor"
        />
      </svg>
    `;
  });

  el.innerHTML = html;
}

// ─────────────────────────────────────────────────────────────────────────
// 히어로: 3개 탭 카드
// ─────────────────────────────────────────────────────────────────────────
function renderHeroTabs() {
  const el = document.getElementById("hero-tabs");

  el.innerHTML = Object.keys(TYPE_C)
    .map((type) => {
      const col = TYPE_C[type];

      return `
        <button
          class="hero-tab"
          data-type="${type}"
          style="background:${col.soft};"
        >
          ${ico(TYPE_ICON[type], 26)}

          <div
            class="hero-tab-label"
            style="color:${col.main};"
          >
            ${type}
          </div>
        </button>
      `;
    })
    .join("");

  el.querySelectorAll(".hero-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      const type = btn.dataset.type;

      courseState.courseType = type;
      courseState.day = 1;

      renderCourseTypeTabs();
      renderCourseTimeline();

      document
        .getElementById("course-type-tabs")
        .scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
    });
  });
}

// ─────────────────────────────────────────────────────────────────────────
// 코스 추천 섹션
// ─────────────────────────────────────────────────────────────────────────
const courseState = {
  transport: "자차",
  courseType: "힐링",
  day: 1,
};

function renderTransportToggle() {
  const el = document.getElementById("transport-toggle");

  el.innerHTML = ["자차", "대중교통"]
    .map((transport) => {
      const active =
        courseState.transport === transport
          ? "active"
          : "";

      const iconSrc =
        transport === "자차"
          ? ICONS.car
          : ICONS.bus;

      return `
        <button
          class="transport-btn ${active}"
          data-transport="${transport}"
        >
          ${ico(iconSrc, 20)}
          ${transport}
        </button>
      `;
    })
    .join("");

  el
    .querySelectorAll(".transport-btn")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        courseState.transport =
          btn.dataset.transport;

        courseState.day = 1;

        renderTransportToggle();
        renderCourseTimeline();
      });
    });
}

function renderCourseTypeTabs() {
  const el =
    document.getElementById("course-type-tabs");

  el.innerHTML = Object.keys(TYPE_C)
    .map((type) => {
      const active =
        courseState.courseType === type;

      const col = TYPE_C[type];

      const style = active
        ? `
          background:${col.main};
          color:#fff;
          box-shadow:0 4px 14px ${col.main}44;
        `
        : `
          background:${col.soft};
          color:${col.main};
        `;

      return `
        <button
          class="type-tab"
          data-type="${type}"
          style="${style}"
        >
          ${ico(TYPE_ICON[type], 18)}
          ${type}
        </button>
      `;
    })
    .join("");

  el.querySelectorAll(".type-tab").forEach((btn) => {
    btn.addEventListener("click", () => {
      courseState.courseType = btn.dataset.type;
      courseState.day = 1;

      renderCourseTypeTabs();
      renderCourseTimeline();
    });
  });
}

function renderCourseTimeline() {
  const el =
    document.getElementById("course-timeline");

  const stops =
    COURSE_DATA[courseState.transport]
      [courseState.courseType]
      [`day${courseState.day}`];

  const tc = TYPE_C[courseState.courseType];

  const items = stops
    .map((stop, index) => {
      const tIcon =
        transportIcon(stop.transport);

      // 데이터에 stop.url이 있으면 해당 주소 사용
      // 없으면 구글 지도 검색으로 이동
      const linkUrl =
        stop.url ||
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `대전 ${stop.name}`
        )}`;

      return `
        <div class="timeline-item">
          <div
            class="timeline-num"
            style="
              background:${tc.soft};
              border:2px solid ${tc.light};
              color:${tc.main};
            "
          >
            ${index + 1}
          </div>

          <a
            class="timeline-card"
            href="${linkUrl}"
            target="_blank"
            rel="noopener noreferrer"
            style="background:${tc.soft};"
          >
            <div class="timeline-card-row">
              ${ico(stop.icon, 32)}

              <div class="timeline-content">
                <div class="timeline-head">
                  <span
                    class="timeline-time"
                    style="background:${tc.main};"
                  >
                    ${stop.time}
                  </span>

                  <span class="timeline-name">
                    ${stop.name}
                  </span>
                </div>

                <p class="timeline-desc">
                  ${stop.desc}
                </p>

                <span class="timeline-transport">
                  ${
                    tIcon
                      ? ico(tIcon, 14)
                      : ""
                  }
                  ${stop.transport}
                </span>
              </div>
            </div>
          </a>
        </div>
      `;
    })
    .join("");

  const isDay1 = courseState.day === 1;

  const dayBadge = `
    <div
      class="day-badge"
      style="background:${tc.main};"
    >
      ${courseState.day}일차
    </div>
  `;

  const dayToggleBtn = `
    <button
      id="day-toggle-btn"
      class="day-toggle-btn"
      style="
        color:${tc.main};
        border-color:${tc.main};
      "
    >
      ${
        isDay1
          ? "2일차로 가기 →"
          : "← 1일차로 가기"
      }
    </button>
  `;

  el.innerHTML = `
    ${dayBadge}

    <div class="timeline-list">
      <div
        class="timeline-line"
        style="background:${tc.light};"
      ></div>

      ${items}
    </div>

    ${dayToggleBtn}
  `;

  recalcTimelineLayout();

  enableDragScroll(
    el.querySelector(".timeline-list"),
    "y"
  );

  document
    .getElementById("day-toggle-btn")
    .addEventListener("click", () => {
      courseState.day = isDay1 ? 2 : 1;

      renderCourseTimeline();

      el.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    });
}

// 세로 연결선과 스크롤 영역 높이 재계산
function recalcTimelineLayout() {
  const el =
    document.getElementById("course-timeline");

  if (!el) return;

  const listEl =
    el.querySelector(".timeline-list");

  const lineEl =
    el.querySelector(".timeline-line");

  if (!listEl || !lineEl) return;

  // 실제 전체 높이를 계산하기 위해 제한 해제
  listEl.style.maxHeight = "none";

  const items =
    listEl.querySelectorAll(".timeline-item");

  if (items.length > 0) {
    const containerTop =
      listEl.getBoundingClientRect().top;

    const lastItemBottom =
      items[items.length - 1]
        .getBoundingClientRect()
        .bottom;

    lineEl.style.height =
      `${lastItemBottom - containerTop - 32}px`;
  }

  limitVisibleItems(
    listEl,
    ".timeline-item",
    5
  );
}

let timelineResizeTimer = null;

window.addEventListener("resize", () => {
  clearTimeout(timelineResizeTimer);

  timelineResizeTimer = setTimeout(
    recalcTimelineLayout,
    150
  );
});

// ─────────────────────────────────────────────────────────────────────────
// 유명한 곳 섹션
// ─────────────────────────────────────────────────────────────────────────
const famousState = {
  activeCat: 0,
};

function renderFamousTabs() {
  const el =
    document.getElementById("famous-tabs");

  el.innerHTML = FAMOUS
    .map((famous, index) => {
      const col =
        colorOf(famous.colorKey);

      const active =
        famousState.activeCat === index;

      const style = active
        ? `
          background:${col.main};
          color:#fff;
          box-shadow:0 4px 12px ${col.main}44;
        `
        : `
          background:${col.soft};
          color:${col.main};
        `;

      return `
        <button
          class="famous-tab"
          data-idx="${index}"
          style="${style}"
        >
          ${ico(FAMOUS_TAB_ICONS[index], 16)}
          ${famous.category}
        </button>
      `;
    })
    .join("");

  el
    .querySelectorAll(".famous-tab")
    .forEach((btn) => {
      btn.addEventListener("click", () => {
        famousState.activeCat =
          parseInt(btn.dataset.idx, 10);

        renderFamousTabs();
        renderFamousGrid();
      });
    });
}

function renderFamousGrid() {
  const el =
    document.getElementById("famous-grid");

  const cat =
    FAMOUS[famousState.activeCat];

  const col =
    colorOf(cat.colorKey);

  el.innerHTML = cat.places
    .map((place) => {
      const linkUrl =
        place.url ||
        `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
          `대전 ${place.name}`
        )}`;

      return `
        <a
          class="famous-card"
          href="${linkUrl}"
          target="_blank"
          rel="noopener noreferrer"
        >
          <div
            class="famous-photo"
            style="background:${col.soft};"
          >
        <img
          src="${
            place.img.startsWith("http")
              ? place.img
              : `https://images.unsplash.com/${place.img}?w=320&h=200&fit=crop&auto=format`
          }"
          alt="${place.name}"
          draggable="false"
        />

          </div>

          <div class="famous-body">
            <div class="famous-name-row">
              <span
                class="famous-dot"
                style="background:${col.main};"
              ></span>

              <span class="famous-name">
                ${place.name}
              </span>
            </div>

            <p class="famous-desc">
              ${place.desc}
            </p>
          </div>
        </a>
      `;
    })
    .join("");

  el.scrollLeft = 0;

  enableDragScroll(el, "x");
}

// ─────────────────────────────────────────────────────────────────────────
// 패스 발급 섹션
// ─────────────────────────────────────────────────────────────────────────
const passState = {
  selected: null,
  issued: null,
  copied: false,
};

// 발급된 패스 이미지 경로
const PASS_IMAGE_PATH = {
  힐링: "images/pass-heal.png",
  미식: "images/pass-food.png",
  액티비티: "images/pass-activity.png",
};
// 카카오 Developers > 앱 > 플랫폼 키에서
// "JavaScript 키"를 복사해 넣으세요.
// REST API 키나 네이티브 앱 키를 넣으면 작동하지 않습니다.
const KAKAO_JAVASCRIPT_KEY =
  "3da708ef896b58f4cba3b49738917b19";

const KAKAO_SDK_URL =
  "https://t1.kakaocdn.net/kakao_js_sdk/2.7.4/kakao.min.js";

const SHARE_BASE_URL =
  "https://daejeon-project.vercel.app/";

function getShareUrl(type) {
  const url = new URL(SHARE_BASE_URL);

  url.searchParams.set("utm_source", "kakao");
  url.searchParams.set("utm_medium", "social");
  url.searchParams.set(
    "utm_campaign",
    "daejeon_pass"
  );

  url.searchParams.set(
    "utm_content",
    TYPE_KEY[type] || "unknown"
  );

  return url.href;
}


function getAbsoluteImageUrl(imagePath) {
  return new URL(
    imagePath,
    SHARE_BASE_URL
  ).href;
}

// 상대경로 이미지를 절대주소로 변환
function getAbsoluteImageUrl(imagePath) {
  return new URL(
    imagePath,
    getShareUrl()
  ).href;
}

let kakaoSdkPromise = null;

// 카카오 SDK 불러오기
function loadKakaoSdk() {
  if (window.Kakao) {
    return Promise.resolve(window.Kakao);
  }

  if (kakaoSdkPromise) {
    return kakaoSdkPromise;
  }

  kakaoSdkPromise = new Promise(
    (resolve, reject) => {
      const script =
        document.createElement("script");

      script.src = KAKAO_SDK_URL;
      script.crossOrigin = "anonymous";

      script.onload = () => {
        if (window.Kakao) {
          resolve(window.Kakao);
        } else {
          reject(
            new Error(
              "카카오 SDK 객체를 찾을 수 없습니다."
            )
          );
        }
      };

      script.onerror = () => {
        reject(
          new Error(
            "카카오 SDK를 불러오지 못했습니다."
          )
        );
      };

      document.head.appendChild(script);
    }
  );

  return kakaoSdkPromise;
}

// 카카오 SDK 초기화
async function getInitializedKakao() {
  if (
    !KAKAO_JAVASCRIPT_KEY ||
    KAKAO_JAVASCRIPT_KEY ===
      "YOUR_KAKAO_JAVASCRIPT_KEY"
  ) {
    throw new Error(
      "KAKAO_JAVASCRIPT_KEY를 실제 JavaScript 키로 바꿔주세요."
    );
  }

  const Kakao = await loadKakaoSdk();

  if (!Kakao) {
    throw new Error(
      "카카오 SDK 초기화에 실패했습니다."
    );
  }

  if (!Kakao.isInitialized()) {
    Kakao.init(KAKAO_JAVASCRIPT_KEY);
  }

  return Kakao;
}

// 패스 선택 이미지 위의 클릭 영역
const CARD_ZONES = [
  {
    type: "힐링",
    left: "2%",
    top: "44%",
    width: "33%",
    height: "50%",
    cls: "active-heal",
  },
  {
    type: "미식",
    left: "35%",
    top: "40%",
    width: "31%",
    height: "54%",
    cls: "active-food",
  },
  {
    type: "액티비티",
    left: "67%",
    top: "44%",
    width: "31%",
    height: "50%",
    cls: "active-active",
  },
];

function renderPassSection() {
  const el =
    document.getElementById(
      "pass-section-content"
    );

  if (!passState.issued) {
    const zones = CARD_ZONES
      .map(
        ({
          type,
          left,
          top,
          width,
          height,
          cls,
        }) => {
          const col = TYPE_C[type];

          const active =
            passState.selected === type;

          const checkMark = active
            ? `
              <div
                class="card-zone-check"
                style="
                  background:${col.main};
                  box-shadow:0 2px 8px ${col.main}66;
                "
              >
                ✓
              </div>
            `
            : "";

          return `
            <button
              class="card-zone ${
                active ? cls : ""
              }"
              data-type="${type}"
              style="
                left:${left};
                top:${top};
                width:${width};
                height:${height};
              "
            >
              ${checkMark}
            </button>
          `;
        }
      )
      .join("");

    const banner = passState.selected
      ? `
        <div
          class="selected-banner"
          style="
            background:${
              TYPE_C[passState.selected].soft
            };
          "
        >
          ${ico(
            TYPE_ICON[passState.selected],
            24
          )}

          <span
            class="selected-banner-text"
            style="
              color:${
                TYPE_C[passState.selected].main
              };
            "
          >
            ${passState.selected} 코스 선택됨
          </span>
        </div>
      `
      : "";

    const btnEnabled =
      Boolean(passState.selected);

    el.innerHTML = `
      <div class="pass-select-frame">
        <img
          src="images/pass-menu.png"
          alt="힐링·미식·액티비티 코스 선택"
        />

        ${zones}
      </div>

      ${banner}

      <button
        id="issue-btn"
        class="
          issue-btn
          ${btnEnabled ? "enabled" : ""}
        "
        ${btnEnabled ? "" : "disabled"}
      >
        🎫 대전 패스 발급받기
      </button>

      ${
        !passState.selected
          ? `
            <p class="issue-hint">
              위 카드를 눌러 코스를 선택해요
            </p>
          `
          : ""
      }
    `;

    el
      .querySelectorAll(".card-zone")
      .forEach((btn) => {
        btn.addEventListener("click", () => {
          passState.selected =
            btn.dataset.type;

          renderPassSection();
        });
      });

    const issueBtn =
      document.getElementById("issue-btn");

    if (issueBtn && btnEnabled) {
      issueBtn.addEventListener(
        "click",
        () => {
          passState.issued =
            passState.selected;

          renderPassSection();
        }
      );
    }
  } else {
    renderIssuedPass();
  }
}

function renderIssuedPass() {
  const el =
    document.getElementById(
      "pass-section-content"
    );

  const type = passState.issued;
  const tc = TYPE_C[type];

  let imageAreaHtml = "";

  if (type === "힐링") {
    imageAreaHtml = `
      <img
        src="images/pass-heal.png"
        alt="힐링 코스 패스"
      />
    `;
  } else if (type === "미식") {
    imageAreaHtml = `
      <img
        src="images/pass-food.png"
        alt="미식 코스 패스"
      />
    `;
  } else if (type === "액티비티") {
    imageAreaHtml = `
      <img
        src="images/pass-activity.png"
        alt="액티비티 패스"
      />
    `;
  } else {
    imageAreaHtml = `
      <div class="pass-placeholder">
        ${ico(TYPE_ICON[type], 56)}

        <p
          class="pass-placeholder-title"
          style="color:${tc.main};"
        >
          ${type} 패스
        </p>

        <p class="pass-placeholder-sub">
          이미지 준비 중
        </p>
      </div>
    `;
  }

  const barHeights = [
    3, 1, 4, 1, 5, 2, 3, 1, 2,
    4, 1, 3, 2, 4, 1, 2, 5,
  ];

  const barcodeHtml = barHeights
    .map(
      (height) => `
        <div
          style="height:${height * 3.5}px;"
        ></div>
      `
    )
    .join("");

  el.innerHTML = `
    <div class="issued-wrap">
      <div
        class="pass-card"
        style="
          box-shadow:
            0 8px 32px ${tc.main}28;
        "
      >
        <div
          class="pass-card-bar top"
          style="background:${tc.main};"
        ></div>

        <div
          class="pass-notch left"
          style="border-color:${tc.light};"
        ></div>

        <div
          class="pass-notch right"
          style="border-color:${tc.light};"
        ></div>

        <div
          class="pass-image-area"
          style="background:${tc.soft};"
        >
          ${imageAreaHtml}

          <div class="pass-stamp">
            <div
              class="pass-stamp-inner"
              style="
                border-color:${tc.main};
                background:${tc.main}14;
              "
            >
              ${ico(TYPE_ICON[type], 22)}

              <span
                class="pass-stamp-label"
                style="color:${tc.main};"
              >
                DAEJEON
              </span>

              <span
                class="pass-stamp-sub"
                style="color:${tc.main};"
              >
                대전 인증
              </span>
            </div>
          </div>
        </div>

        <div
          class="pass-divider"
          style="border-color:${tc.light};"
        ></div>

        <div class="pass-info">
          <div class="pass-info-row">
            <div>
              <p class="pass-info-eyebrow">
                DAEJEON PASS · 1 NIGHT 2 DAYS
              </p>

              <p class="pass-info-title">
                대전 ${type} 코스
              </p>
            </div>

            <div
              class="pass-info-badge"
              style="background:${tc.soft};"
            >
              ${ico(TYPE_ICON[type], 18)}

              <span style="color:${tc.main};">
                ${type}
              </span>
            </div>
          </div>

          <div
            class="pass-barcode-area"
            style="border-color:${tc.light};"
          >
            <div class="pass-barcode">
              ${barcodeHtml}
            </div>

            <p class="pass-code-text">
              DJ-${type.toUpperCase()}-PASS-2026
            </p>
          </div>
        </div>

        <div
          class="pass-card-bar bottom"
          style="background:${tc.main};"
        ></div>
      </div>

      <div class="share-card">
        <p class="share-title">
          친구한테 공유해요! 🤙
        </p>

        <p class="share-sub">
          패스를 공유하고 대전 여행 메이트를
          모아보세요
        </p>

        <div class="share-actions">
          <button
            id="share-btn"
            class="
              share-btn
              ${
                passState.copied
                  ? "copied"
                  : ""
              }
            "
          >
            ${
              passState.copied
                ? "✓ 링크 복사됨!"
                : "🔗 친구에게 공유하기"
            }
          </button>

          <button
            id="reset-btn"
            class="reset-btn"
          >
            다시 발급
          </button>
        </div>
      </div>
    </div>
  `;

  document
    .getElementById("share-btn")
    .addEventListener(
      "click",
      handleShare
    );

  document
    .getElementById("reset-btn")
    .addEventListener("click", () => {
      passState.issued = null;
      passState.selected = null;
      passState.copied = false;

      renderPassSection();
    });

  async function handleShare() {
    const shareTitle =
      `대전 ${type} 패스 발급 완료!`;

    const shareText =
      `나는 대전 ${type} 패스를 받았어! ` +
      `같이 대전 가자 🎫`;

    // 선택한 패스 종류에 맞는 UTM 링크 생성
    const shareUrl = getShareUrl(type);

    const imagePath =
      PASS_IMAGE_PATH[type];

    if (!imagePath) {
      alert(
        "공유할 패스 이미지를 찾을 수 없습니다."
      );

      return;
    }

    try {
      const Kakao =
        await getInitializedKakao();

      Kakao.Share.sendDefault({
        objectType: "feed",

        content: {
          title: shareTitle,
          description: shareText,

          imageUrl:
            getAbsoluteImageUrl(imagePath),

          link: {
            mobileWebUrl: shareUrl,
            webUrl: shareUrl,
          },
        },

        buttons: [
          {
            title:
              "나도 대전 패스 받기 🎫",

            link: {
              mobileWebUrl: shareUrl,
              webUrl: shareUrl,
            },
          },
        ],
      });
    } catch (error) {
      console.error(
        "카카오톡 공유 실패:",
        error
      );

      alert(
        `카카오톡 공유를 시작할 수 없습니다.\n${error.message}`
      );
    }
  }
}

// ─────────────────────────────────────────────────────────────────────────
// 초기화
// ─────────────────────────────────────────────────────────────────────────
document.addEventListener(
  "DOMContentLoaded",
  () => {
    renderBgDecor();
    renderHeroTabs();

    renderTransportToggle();
    renderCourseTypeTabs();
    renderCourseTimeline();

    renderFamousTabs();
    renderFamousGrid();

    renderPassSection();
  }
);