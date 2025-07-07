import { styled } from "styled-components";

function Habit({ name, days }) {
  const daysOfTheWeek = ["D", "S", "T", "Q", "Q", "S", "S"];

  return (
    <ItemBox>
      <h2>{name}</h2>
      <div className="Days">
        {daysOfTheWeek.map((day, index) => (
          <span
            key={index}
            style={{
              backgroundColor: days.includes(index) ? "#d4d4d4" : "white",
              color: days.includes(index) ? "white" : "#d4d4d4",
            }}
          >
            {day}
          </span>
        ))}
      </div>
    </ItemBox>
  );
}

const ItemBox = styled.div`
  background-color: white;
  border-radius: 5px;
  padding: 15px;
  margin-top: 10px;
  
  h2 {
    font-size: 18px;
    color: #666;
  }

  & .Days {
    margin-top: 10px;
    display: flex;
    gap: 5px;
  }

  .Days span {
    width: 31px;
    height: 31px;
    background-color: white;
    color: #d4d4d4;
    border: 1px solid #d4d4d4;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 16px;
  }
`;

export default Habit;