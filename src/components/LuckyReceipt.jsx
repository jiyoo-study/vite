export default function LuckyReceipt({ luckData, onChangeCount, totalScore }) {
  const selectedLuck = Object.entries(luckData).filter(
    ([, value]) => value.count > 0
  );

  return (
    <div className="receipt">
      <div className="title">오늘의 운세🍀</div>
      <div className="listGroup">
        <div className="list luck-list">
          {selectedLuck.map(([type, value]) => (
            <div className="luck-item" key={type} data-luck-type={type}>
              <span className="luck-type">{type}</span>
              <div className="counter">
                <button className="minus-btn" onClick={() => onChangeCount(type, -1)}>-</button>
                <span className="count-display">{value.count}</span>
                <button className="plus-btn" onClick={() => onChangeCount(type, 1)}>+</button>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="result-area">
        <span>행운지수</span>
        <span className="total-score">{totalScore}점</span>
      </div>
    </div>
  );
}
