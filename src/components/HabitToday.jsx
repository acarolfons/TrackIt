import axios from "axios";
import styled from "styled-components";

function HabitToday({ habit, token, setHabits }) {
  const isDone = habit.done;

  function toggleDone() {
    const urlCheck = `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${
      habit.id
    }/${isDone ? "uncheck" : "check"}`;
    const config = { headers: { Authorization: `Bearer ${token}` } };

    axios
      .post(urlCheck, {}, config)
      .then(() => {
        const URL =
          "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
        return axios.get(URL, config);
      })
      .then((res) => setHabits(res.data))
      .catch((err) => console.error("Erro no toggleDone:", err));
  }

  return (
    <HabitBox className={habit.done ? "done" : ""}>
      <div className="info">
        <h2>{habit.name}</h2>
        <p>
          Sequência atual:{" "}
          <span className={habit.done ? "green" : ""}>
            {habit.currentSequence}{" "}
            {habit.currentSequence === 1 ? "dia" : "dias"}
          </span>
        </p>
        <p>
          Seu recorde:{" "}
          <span
            className={
              habit.currentSequence === habit.highestSequence &&
              habit.highestSequence !== 0
                ? "green"
                : ""
            }
          >
            {habit.highestSequence}{" "}
            {habit.highestSequence === 1 ? "dia" : "dias"}
          </span>
        </p>
      </div>
      <CheckButton className={habit.done ? "done" : ""} onClick={toggleDone}>
        ✔
      </CheckButton>
    </HabitBox>
  );
}

const HabitBox = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  margin-top: 20px;
  color: #666;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex: 1 1 auto;
  min-width: 0;

  h2 {
    font-size: 20px;
    margin-bottom: 8px;

  }

  p {
    font-size: 14px;
    margin: 2px 0;
    padding:2px;
  }
`;

const CheckButton = styled.button`
width: 60px;
height: 60px;
  background-color: #ebebeb;
  border: 1px solid #e7e7e7;
  border-radius: 5px;
  color: white;
  font-size: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  flex-shrink: 0;
  &.done {
    background-color: #8fc549;
  }
`;

export default HabitToday;