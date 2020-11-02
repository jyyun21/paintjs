const canvas = document.getElementById("jsCanvas");
// context 라는걱 우리가 픽셀에 접근할 수 있는 방법 , 2d말고 다른 context들도 있다.
// canvas안에서 픽셀을 다루는 것
const ctx = canvas.getContext("2d");
// classname이 jsColor인 색깔들을 가져옴.
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE = 770;
const saveBtn = document.getElementById("jsSave");

// canvas element는 2개의 사이즈를 가져야함, css사이즈랑 canvas사이즈 
// canvas element의 width와 height를 지정해줘야함
// 실제 픽셀 사이즈를 지정해줘야 선을 그릴 수 있음 
// 픽셀을 다루는 윈도우가 얼마나 큰지 canvas에게 알려주는것
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

// 맨 처음 캔버스 배경 하얀색으로 만들기
ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
// 선 색상
ctx.strokeStyle = INITIAL_COLOR;
// 선 굵기
ctx.lineWidth = 2.5;
// 다 채울 사각형 범위 설정
// ctx.fillStyle = "green";
// ctx.fillRect(50, 20, 100, 50);
// ctx.fillStyle = "orange";
// ctx.fillRect(80, 100, 100, 50);
ctx.fillStyle = INITIAL_COLOR;

//######### 디폴트값 설정
let painting = false;
let filling = false;

function stopPainting(){
    painting = false;
}

function startPainting(){
    painting = true;
}

// 여기세서 모든 움직임을 감지하고 라인을 만들꺼다

function onMouseMove(event) {
    //console.log(event);
    // offsetX, Y canvas내에서의 마우스의 위치 client X, Y 는 전체 스크린에서의 마우스 위치이다.
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x, y);

    // path는 기본적으로 선, 라인이다.
    if(!painting){
        // false일때 계속 시작점을 만들고있다가 
        // true가 되면 해당 시작점에서 부터 계속 storke를 실행
        //console.log("createing path", x, y);
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        //console.log("createing line", x, y);
        ctx.lineTo(x, y);
        ctx.stroke(); // 마우스를 클릭하고 움직이는 내내 발생 , 계속 작은 선을 만들어가는 것임.
        //ctx.closePath(); // path를 닫음 선이끝남. 시작지점음 오로지 beginPath인거임.
    }

}


function handleColorClick(event){
    //console.log(event.target.style); 여기서 backgroundColor가 필요
    const color =  event.target.style.backgroundColor;
    console.log(color);
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    // 선의 굵기 값을 알 수 있다.
    //console.log(event.target.value);
    size = event.target.value;
    ctx.lineWidth = size;
}

function handleCanvasClick(){
    if(filling == true){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    }
}

function handleModeClick(){
    if(filling == true){
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}

function handleCM(event){
    // event가 안나오도록 하자
    //console.log(event);
    event.preventDefault();
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a"); //anchor태그의 
    link.href = image;  // href는 image(URL)이 되어야 하고
    link.download = "PaintJS[EXPORT]";
    console.log(link);
    link.click(); // <a href=".~~~" download="PaintJS[EXPORT]"></a> 가 클릭된것과 같음
}

if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting); // 마우스를 클릭했을때
    canvas.addEventListener("mouseup", stopPainting); // 클락한 걸 땠을때
    canvas.addEventListener("mouseleave", stopPainting); // canvas밖으로 나갔을때
    canvas.addEventListener("click", handleCanvasClick); // canvas를 눌렀을때
    canvas.addEventListener("contextmenu", handleCM); // context menu가 나올때, 마우스 우클릭하면 나오는 메뉴
}

// Array.from 은 obeject를 가져와서 array를 만듬
//console.log(Array.from(colors));
// array를 만들어 주면 그 안에서 forEach로 각각의 값을 color를 가질 수 있다.
// 각각의 array에서 원하는 색깔을 클릭했을때에만 handleColorClick이 작동.
// color 변수는 array안에있는 각각의 아이템들을 대표하는 것 뿜임
Array.from(colors).forEach(color => color.addEventListener("click", handleColorClick));

//###### 선 굵기 변경
if(range){
    range.addEventListener("input", handleRangeChange);
}

//###### fill , 브러쉬 모드 변경
if(mode){
    mode.addEventListener("click", handleModeClick );
}

if(saveBtn){
    saveBtn.addEventListener("click", handleSaveClick);
}