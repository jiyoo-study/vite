import { useState } from "react";
import LuckySlider from "./components/LuckySlider.jsx";
import LuckyReceipt from "./components/LuckyReceipt.jsx";
import "./styles/lucky.css";

export default function App() {
  const [luckData, setLuckData] = useState({
    금전운: { score: 10, count: 0 },
    애정운: { score: 10, count: 0 },
    건강운: { score: 10, count: 0 },
    웃음운: { score: 10, count: 0 },
    음식운: { score: 10, count: 0 },
    동물운: { score: 10, count: 0 },
  });

  const handleAddLuck = (type) => {
    setLuckData((prev) => ({
      ...prev,
      [type]: { ...prev[type], count: prev[type].count + 1 },
    }));
  };

  const handleChangeCount = (type, diff) => {
    setLuckData((prev) => {
      const updatedCount = Math.max(prev[type].count + diff, 0);
      return {
        ...prev,
        [type]: { ...prev[type], count: updatedCount },
      };
    });
  };

  const totalScore = Object.values(luckData).reduce(
    (sum, luck) => sum + luck.score * luck.count,
    0
  );

  return (
    <div className="content">
      <LuckySlider onAdd={handleAddLuck} />
      <LuckyReceipt
        luckData={luckData}
        onChangeCount={handleChangeCount}
        totalScore={totalScore}
      />
    </div>
  );
}
