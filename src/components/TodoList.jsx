import { useState, useEffect } from "react";
import { CheckCircleOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';

export default function TodoList() {
  // ✅ 초기 로드 시 localStorage에서 할 일 목록 불러오기
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  const [input, setInput] = useState("");
  const [isComposing, setIsComposing] = useState(false);


  // 수정 기능을 위한 state 추가
  const [editingId, setEditingId] = useState(null); // 수정 중인 항목 id (없으면 null)
  const [editInput, setEditInput] = useState("");  // 수정 중 텍스트

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // ✅ 할 일 추가
  const addTask = (newTaskText) => {
    const trimmed = newTaskText.trim();
    if (!trimmed) return;

    setTasks(prev => [
      ...prev,
      { id: Date.now(), text: trimmed, done: false }
    ]);
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
    // 혹시 삭제한 게 수정중이면 입력값 초기화
    if (editingId === id) {
      setEditingId(null);
      setEditInput("");
    }
  };

  // ✅ 할 일 수정
  const startEdit = (task) => {
    setEditingId(task.id);
    setEditInput(task.text);
  };

  const handleEditInput = (e) => {
    setEditInput(e.target.value);
  };

  const saveEdit = (id) => {
    if (!editInput.trim()) return;
    setTasks(
      tasks.map(task =>
        task.id === id ? { ...task, text: editInput } : task
      )
    );
    setEditingId(null);
    setEditInput("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditInput("");
  };

  return (
    <div className="todo-container">
      <div className="title">오늘의 할 일 📝</div>
      <div className="todo-input">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}

          onCompositionStart={() => setIsComposing(true)}       // 조합 시작
          onCompositionEnd={(e) => {
            setIsComposing(false);
            // 조합 종료 후 커서에 입력된 최종 값 반영, 필요시 여기서 추가 처리 가능
          }}

          onKeyDown={(e) => {
            if (e.key === 'Enter' && !isComposing) {            // 조합 중이 아닐 때만 실행
              e.preventDefault();                                // 폼 제출 등 기본 이벤트 방지
              addTask(input);
              setInput('');
            }
          }}
          placeholder="할 일을 입력하세요!!"
        />

        <button onClick={() => {
          addTask(input);
          setInput("");
        }}>
          <PlusOutlined />추가하기
        </button>
      </div>

      <ul className="todo-list">
        {tasks.map((task) => (
          <li key={task.id} className={editingId === task.id ? "editing" : ""}>
            {editingId === task.id ? (
              <>
                <div className="left-content">
                  <input
                    type="text"
                    value={editInput}
                    onChange={handleEditInput}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') {
                        saveEdit(task.id);
                      }
                    }}
                    autoFocus
                    className="edit-input"
                  />
                </div>
                <div className="button-group">
                  <button className="save-btn" onClick={() => saveEdit(task.id)}>
                    <CheckCircleOutlined />저장</button>
                  <button className="cancel-btn" onClick={cancelEdit}>취소</button>
                </div>
              </>
            ) : (
              <>
                <div className="left-content">
                  <input
                    type="checkbox"
                    className="todo-checkbox"
                    checked={task.done}
                    onChange={() => toggleDone(task.id)}
                  />
                  <span
                    className={task.done ? "todo-text done" : "todo-text"}
                    style={{ userSelect: 'none' }}
                  >
                    {task.text}
                  </span>
                </div>
                <div className="button-group">
                  <button className="edit-btn" onClick={() => startEdit(task)}>
                    <EditOutlined />수정</button>
                  <button onClick={() => deleteTask(task.id)}>
                    <DeleteOutlined />삭제</button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

    </div>
  );
}
