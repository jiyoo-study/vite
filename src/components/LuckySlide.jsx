export default function LuckySlide({ type, title, image, desc, onAdd }) {
  return (
    <div className="swiper-slide" data-luck-type={type}>
      <div className="itemTitle">{title}</div>
      <img className="itemImage" src={image} alt={title} />
      <div className="itemDesc">{desc}</div>
      <button className="itemBtn add-luck-button" onClick={onAdd}>
        행운 추가하기
      </button>
    </div>
  );
}
