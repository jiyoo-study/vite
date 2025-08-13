import { useState, useEffect } from "react";

export default function TodoList() {
  // ✅ 초기 로드 시 localStorage에서 할 일 목록 불러오기
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");

  // ✅ tasks 상태 바뀔 때마다 localStorage에 저장
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ 할 일 추가
  const addTask = () => {
    if (!input.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text: input, done: false }
    ]);
    setInput("");
  };

  // ✅ 완료 상태 토글
  const toggleDone = (id) => {
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  // ✅ 할 일 삭제
  const deleteTask = (id) => {
    setTasks(tasks.filter(task => task.id !== id));
  };

  return (
    <div className="todo-container">
    <div className="title">오늘의 할 일 📝</div>
      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="할 일을 입력하세요!!"
        />
        <button onClick={addTask}>추가하기</button>
      </div>

      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id}>
            {/* 체크박스는 CSS에서 크기/색상 적용 */}
            <input
              type="checkbox"
              className="todo-checkbox"
              checked={task.done}
              onChange={() => toggleDone(task.id)}
            />
            <span
              style={{
                textDecoration: task.done ? "line-through" : "none"
              }}
            >
              {task.text}
            </span>
            <button onClick={() => deleteTask(task.id)}>삭제</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
