import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import LuckySlide from "./LuckySlide.jsx";

export default function LuckySlider({ onAdd }) {
  const items = [
    { type: "금전운", title: "금전운", image: import.meta.env.BASE_URL + "/assets/lucky/01.jpg", desc: "$돈이 자꾸만 굴러들어와요$ 쓰면 쓸수록 돈이 더 생기는 날이에요!" },
    { type: "애정운", title: "애정운", image: import.meta.env.BASE_URL + "/assets/lucky/02.jpg", desc: "사랑이 우수수 쏟아지는 하루 ❤︎ 마음껏 사랑을 표현하면 좋은 결과만 뒤따라요!" },
    { type: "건강운", title: "건강운", image: import.meta.env.BASE_URL + "/assets/lucky/03.jpg", desc: "몸에서 활력이 솟아요. 몸이 튼튼해지니 마음까지 건강해져서 기운이 넘쳐요!" },
    { type: "웃음운", title: "웃음운", image: import.meta.env.BASE_URL + "/assets/lucky/04.jpg", desc: "무슨 얘기를 해도 상대가 빵 터져요. 오늘의 웃음사냥꾼은 바로 당신입니다!" },
    { type: "음식운", title: "음식운", image: import.meta.env.BASE_URL + "/assets/lucky/05.jpg", desc: "오늘은 어떤 음식을 먹어도 성공⚡︎⚡︎ 맛있는 음식이 자꾸만 당신에게 찾아옵니다!" },
    { type: "동물운", title: "동물운", image: import.meta.env.BASE_URL + "/assets/lucky/06.jpg", desc: "✭동물들의 사랑을 한몸에✭ 유독 동물들이 당신에게 다가갑니다!" },
  ];

  return (
    <div className="items">
      <div className="title">오늘의 운세 포장하기⭐️</div>
      <Swiper slidesPerView={3.4} spaceBetween={32} freeMode={true}>
        {items.map((item, idx) => (
          <SwiperSlide key={idx}>
            <LuckySlide {...item} onAdd={() => onAdd(item.type)} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
