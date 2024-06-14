const action1 = document.getElementById('action1');
const action2 = document.getElementById('action2');
const action3 = document.getElementById('action3');
const action4 = document.getElementById('action4');

// 각 버튼에 클릭 이벤트 리스너를 추가합니다.
action1.addEventListener('click', () => changeCursor('image/free-icon-pet-food-1566763.png'));
action2.addEventListener('click', () => changeCursor('image/free-icon-move-4151706.png'));
action3.addEventListener('click', () => changeCursor('image/free-icon-sponge-2377008.png'));
action4.addEventListener('click', () => changeCursor('image/free-icon-bed-linen-10004063.png'));

// 커서를 변경하는 함수입니다.
function changeCursor(cursorImage) {
    document.body.style.cursor = `url(${cursorImage}), auto`;
}

const rabbit = document.getElementById('rabbit');
const damagochi = document.getElementById('damagochi');
const rabbitCommonImage = 'image/rabbitcommon.png';
const rabbitLeftImage = 'image/rabbitleft.png';
const rabbitRightImage = 'image/rabbitright.png';
const happyRabbitImage = 'image/happyrabbit.png';
const moveDistance = 50; 

// 다마고치 크기와 위치를 기반으로 경계 설정
const damagochiRect = damagochi.getBoundingClientRect();
const containerLeftBoundary = -damagochiRect.width / 2 + rabbit.offsetWidth / 2;
const containerRightBoundary = damagochiRect.width / 2 - rabbit.offsetWidth / 2 + 10;

let rabbitPosition = 0; // 초기 위치 (화면 중앙)
let isMovingRight = true; // 이동 방향 초기값
let mood = 0; // 토끼의 기분

function moveRabbit() {
    // 방향에 따라 위치 변경
    if (isMovingRight) {
        rabbitPosition += moveDistance;
        rabbit.style.backgroundImage = `url(${rabbitRightImage})`;
    } else {
        rabbitPosition -= moveDistance;
        rabbit.style.backgroundImage = `url(${rabbitLeftImage})`;
    }

    // 경계 체크 및 방향 반전
    if (rabbitPosition >= containerRightBoundary) {
        isMovingRight = false;
    } else if (rabbitPosition <= containerLeftBoundary) {
        isMovingRight = true;
    }

    // 래빗의 위치를 업데이트
    rabbit.style.transform = `translateX(${rabbitPosition}px)`;

    // 일정 시간 후에 rabbitCommonImage로 변경
setTimeout(() => {
    if (mood < 300) {
        rabbit.style.backgroundImage = `url(${rabbitCommonImage})`;
    } else {
        rabbit.style.backgroundImage = `url(${happyRabbitImage})`;
    }
}, 500);

}

function randomMoveRabbit() {
    // 일정 시간 동안 이동 후 랜덤 시간에 다시 이동
    moveRabbit();
    const randomTime = Math.floor(Math.random() * 5000) + 3000; 
    setTimeout(randomMoveRabbit, randomTime);
}

// 일정 시간 간격으로 moveRabbit 함수 호출
randomMoveRabbit();

// 토끼를 클릭했을 때의 이벤트 리스너를 추가합니다.
rabbit.addEventListener('click', () => {
    // 변경된 커서의 이미지에 따라 토끼의 기분 스탯을 증가시킵니다.
    switch(document.body.style.cursor) {
        case 'url("image/free-icon-pet-food-1566763.png"), auto':
            // 액션 1의 이미지로 클릭했을 때의 처리
            mood += 10;
            break;
        case 'url("image/free-icon-move-4151706.png"), auto':
            // 액션 2의 이미지로 클릭했을 때의 처리
            mood += 20;
            break;
        case 'url("image/free-icon-sponge-2377008.png"), auto':
            // 액션 3의 이미지로 클릭했을 때의 처리
            mood += 15;
            break;
        case 'url("image/free-icon-bed-linen-10004063.png"), auto':
            // 액션 4의 이미지로 클릭했을 때의 처리
            mood += 5;
            break;
        default:
            // 다른 이미지로 클릭한 경우에 대한 처리
            break;
    }
    // 업데이트된 토끼의 기분을 화면에 표시합니다.
    document.getElementById('rabbitMood').textContent = mood;
    // 기분이 300 이상이면 토끼의 이미지를 변경합니다.
    if (mood >= 300) {
        rabbit.style.backgroundImage = `url(${happyRabbitImage})`;
    }
});


