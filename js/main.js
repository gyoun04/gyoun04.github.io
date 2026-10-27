
"use strict";
// Figma 시안의 예시 데이터. 실제 공고나 계정에 연결하지 않습니다.
const deadlineJobs = [3, 5, 2, 1, 0].map((days, id) => ({id, days, company:"키움증권", field:"금융", role:"서비스 기획/운영", type:"신입, 계약직"}));
let sortMode = "deadline";
let hasSorted = false;
const bookmarks = new Set();
const cards = document.getElementById("deadline-cards");
function renderJobs() {
  const query = document.getElementById("search-input").value.trim().toLowerCase();
  const jobs = deadlineJobs.filter(job => [job.company,job.field,job.role,job.type].join(" ").toLowerCase().includes(query));
  if (hasSorted) jobs.sort((a,b) => sortMode === "deadline" ? a.days-b.days : b.id-a.id);
  cards.innerHTML = jobs.map(job => '<article class="deadline-card"><div class="deadline-head"><strong>'+(job.days===0?"D-DAY":"D-"+job.days)+'</strong><span>'+job.field+'</span></div><h3>'+job.company+'</h3><p><span>'+job.role+'</span></p><p><span>'+job.type+'</span></p><button class="bookmark" data-bookmark="'+job.id+'" aria-label="'+job.company+' 공고 '+(job.id+1)+' 스크랩" aria-pressed="'+bookmarks.has(job.id)+'">'+(bookmarks.has(job.id)?"▣":"♧")+'</button></article>').join("");
  document.getElementById("search-status").textContent = query ? "검색 결과 "+jobs.length+"건" : "";
}
renderJobs();
document.getElementById("search-form").addEventListener("submit", event => {event.preventDefault();renderJobs();});
document.getElementById("search-input").addEventListener("input", renderJobs);
document.querySelectorAll("[data-sort]").forEach(button => button.addEventListener("click", () => {
  sortMode=button.dataset.sort;hasSorted=true;
  document.querySelectorAll("[data-sort]").forEach(item => item.setAttribute("aria-pressed",String(item===button)));
  renderJobs();
}));
cards.addEventListener("click",event => {
  const button=event.target.closest("[data-bookmark]");if(!button)return;
  const id=Number(button.dataset.bookmark);
  if(bookmarks.has(id))bookmarks.delete(id);else bookmarks.add(id);
  button.setAttribute("aria-pressed",String(bookmarks.has(id)));button.textContent=bookmarks.has(id)?"▣":"♧";
});
const events={
  1:[["자소서 작성하기","note"],["서류 확인하기","note"]],
  4:[["SK 하이닉스 서류 접수","purple"]],
  9:[["유라헬 강연","pink"]],12:[["공채","note"]],13:[["프린트, 서류 준비","note"]],
  15:[["면접날짜 발표","note"]],17:[["1차 합격 발표","note"]],
  19:[["면접일, 복장 준수!!","pink"]],26:[["자소서 작성 교육","purple"]],34:[["2차 합격 발표","note"]]
};
// 시안 그대로 이전 달 30일, 1~31일, 다음 달 1~3일을 표시합니다.
document.getElementById("calendar-days").innerHTML=Array.from({length:35},(_,index)=>{
  const day=index===0?30:index>31?index-31:index;const outside=index===0||index>31;
  return '<div class="calendar-day'+(outside?' outside':'')+'"><time aria-label="'+(outside?(index===0?'이전 달 ':'다음 달 '):'')+day+'일">'+day+'</time>'+(events[index]||[]).map(([label,color])=>'<span class="calendar-event '+color+'">'+label+'</span>').join("")+'</div>';
}).join("");
const calendarPanel=document.getElementById("calendar-panel");
const calendarControls=[document.getElementById("calendar-toggle"),document.querySelector(".calendar-icon")];
calendarControls.forEach(button=>button.addEventListener("click",()=>{
  calendarPanel.hidden=!calendarPanel.hidden;
  calendarControls.forEach(item=>item.setAttribute("aria-expanded",String(!calendarPanel.hidden)));
  calendarControls[0].textContent=calendarPanel.hidden?"달력 펼치기":"달력 숨기기";
}));
const savedJobs=[
  {company:"네이버",logo:"NAVER",className:"naver",title:"2026 하반기 UX/UI 디자이너 채용"},
  {company:"쿠팡",logo:"coupang",className:"coupang",title:"[2026] 역량 증진 교육",education:true},
  ...Array.from({length:3},()=>({company:"네이버",logo:"NAVER",className:"naver",title:"2026 하반기 UX/UI 디자이너 채용"}))
];
document.getElementById("saved-jobs").innerHTML=savedJobs.map(job=>'<article class="saved-card'+(job.education?' education':'')+'"><span class="saved-deadline">D-14 (~12.07)</span><div class="saved-logo"><span class="company-logo '+job.className+'">'+job.logo+'</span></div><h3>'+job.company+'</h3><p>'+job.title+'</p><div class="saved-details"><div class="tag-list"><span>서비스 기획 / UX 디자인</span><span>'+(job.education?'서울특별시 여의도':'경기 성남시 분당구')+'</span><span>신입 · 정규직</span><span>'+(job.education?'4시간':'Figma')+'</span></div><div class="saved-actions"><button data-demo="자소서 쓰기">자소서 쓰기</button><button data-demo="지원하기">지원하기</button></div></div></article>').join("");
const comparisonRows=[
  ["직무/분야","서비스 기획","IT/개발","마케팅"],["고용 형태","계약직","정규직","정규직"],
  ["근무지","서울","서울","서울"],["급여","급여","급여","급여"],["복지","복지","복지","복지"],
  ["마감일","마감일","마감일","마감일"],["지원수","지원수","지원수","지원수"],
  ["자격 요건","자격 요건","자격 요건","자격 요건"],
  ["합격수기","키워드","키워드","키워드"],["자소서","키워드","키워드","키워드"],["키워드","키워드","키워드","키워드"]
];
const differenceOnly=document.getElementById("difference-only");
function renderComparison(){
  const rows=comparisonRows.filter(row=>!differenceOnly.checked||new Set(row.slice(1)).size>1);
  document.getElementById("comparison-rows").innerHTML=rows.map(([label,...values])=>'<tr><th scope="row">'+label+'</th>'+values.map(value=>'<td>'+value+'</td>').join("")+'</tr>').join("");
  document.getElementById("compare-status").textContent=differenceOnly.checked?"서로 다른 항목 "+rows.length+"개 표시 중":"";
}
differenceOnly.addEventListener("change",renderComparison);
document.getElementById("reset-compare").addEventListener("click",()=>{differenceOnly.checked=false;renderComparison();});
renderComparison();
const menuButton=document.getElementById("menu-toggle");
const expandedMenu=document.getElementById("expanded-menu");
menuButton.addEventListener("click",()=>{expandedMenu.hidden=!expandedMenu.hidden;menuButton.setAttribute("aria-expanded",String(!expandedMenu.hidden));});
expandedMenu.addEventListener("click",event=>{if(event.target.closest("a")){expandedMenu.hidden=true;menuButton.setAttribute("aria-expanded","false");}});
document.addEventListener("keydown",event=>{if(event.key==="Escape"&&!expandedMenu.hidden){expandedMenu.hidden=true;menuButton.setAttribute("aria-expanded","false");menuButton.focus();}});
let toastTimer;
function showDemoNotice(feature){
  const toast=document.getElementById("toast");clearTimeout(toastTimer);
  toast.textContent=feature+": 디자인 시연 화면입니다. 실제 서비스에는 연결되지 않습니다.";
  toast.hidden=false;toastTimer=setTimeout(()=>{toast.hidden=true;},4000);
}
document.addEventListener("click",event=>{const button=event.target.closest("[data-demo]");if(button)showDemoNotice(button.dataset.demo);});
document.getElementById("add-compare").addEventListener("click",()=>showDemoNotice("비교 공고 추가"));
