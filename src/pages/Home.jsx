import HomePage from "../styles/HomePage";
import Habit from "../components/Habit";
import FinalButton from "../styles/FinalButton";
import Header from "../components/Header";

import calendar1 from "../images/calendarhabits.png";
import calendar2 from "../images/calendarToday.png";
import { useEffect, useState } from "react";
import { styled } from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../context/UserContext";
import { useContext } from "react";
import LoadingCenter from "../styles/LoadingCenter";
import { ThreeDots } from "react-loader-spinner";

export default function Home({ token }) {
  const [nohabits, setNohabits] = useState(true);
  const [habits, setHabits] = useState([]);
  const [boxhabit, setBoxhabit] = useState(false);
  const [newhabit, setNewhabit] = useState("");
  const days = ["D", "S", "T", "Q", "Q", "S", "S"];
  const [selectedDays, setSelectedDays] = useState([]);
  const [activeButton, setActiveButton] = useState("habits");

  const [user] = useContext(UserContext);

  const [loadingHabits, setLoadingHabits] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setLoadingHabits(true);
    if (!token) {
      navigate("/");
      return;
    }

    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(URL, config)
      .then((res) => {
        setHabits(res.data);
        if (res.data.length > 0) {
          setNohabits(false);
        }
        setLoadingHabits(false);
      })
      .catch((err) => console.log(err.response.data));
  }, [token]);

  if (loadingHabits) {
    return <LoadingCenter>Carregando...</LoadingCenter>;
  }

  function submitHabit() {
    setBoxhabit(true);
  }

  function closeHabit() {
    setBoxhabit(false);
  }

  function toggleDay(index, e) {
    e.preventDefault();

    setSelectedDays((prevSelectedDays) => {
      if (prevSelectedDays.includes(index)) {
        return prevSelectedDays.filter((d) => d !== index);
      } else {
        return [...prevSelectedDays, index];
      }
    });
  }

  function goTodayPage() {
    setActiveButton("today");
    navigate("/hoje");
  }

  function goHabitsPage() {
    setActiveButton("habits");
    navigate("/habitos");
  }

  function submitHabits(e) {
    e.preventDefault();

    if (!newhabit || selectedDays.length === 0) {
      alert("Por favor, preencha o nome do hábito e selecione os dias.");
      return;
    }

    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits";

    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const body = {
      name: newhabit,
      days: selectedDays,
    };

    setLoadingSubmit(true);

    axios
      .post(URL, body, config)
      .then((res) => {
        setHabits([...habits, res.data]);
        setNohabits(false);
        setNewhabit("");
        setSelectedDays([]);
        setBoxhabit(false);
      })
      .catch((err) => {
        console.error("Erro ao criar hábito:", err.response?.data || err);
        alert("Erro ao criar o hábito. Tente novamente!");
        setLoadingSubmit(false);
      })
      .finally(() => {
        setLoadingSubmit(false);
      });
  }

  return (
    <HomePage>
      <Header />
      <div className="Info">
        <h1>Meus hábitos</h1>
        <button type="button" onClick={submitHabit}>
          +
        </button>
      </div>

      {boxhabit && (
        <BoxHabit>
          <form onSubmit={submitHabits}>
            <input
              type="text"
              placeholder="nome do hábito"
              value={newhabit}
              disabled={loadingSubmit}
              onChange={(e) => setNewhabit(e.target.value)}
            ></input>
            <div className="ButtonBox">
              {days.map((day, index) => (
                <button
                  key={index}
                  style={{
                    backgroundColor: selectedDays.includes(index)
                      ? "#d4d4d4"
                      : "white",
                    color: selectedDays.includes(index) ? "white" : "#d4d4d4",
                  }}
                  onClick={(e) => toggleDay(index, e)}
                >
                  {day}
                </button>
              ))}
            </div>

            <div className="FinalButton">
              <button
                type="button"
                onClick={closeHabit}
                style={{
                  backgroundColor: "white",
                  color: "#52B6FF",
                }}
              >
                Cancelar
              </button>
              <button
                type="submit"
                disabled={loadingSubmit}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {loadingSubmit ? (
                  <ThreeDots
                    height="40"
                    width="40"
                    color="#FFFFFF"
                    ariaLabel="loading"
                    backgroundColor="#52B6FF"
                  />
                ) : (
                  "Salvar"
                )}
              </button>
            </div>
          </form>
        </BoxHabit>
      )}

      <div className="Box">
        <p>
          {nohabits
            ? "Você não tem nenhum hábito cadastrado ainda. Adicione um hábito para começar a trackear!"
            : ""}
        </p>
        {habits &&
          habits.map((h) => <Habit key={h.id} name={h.name} days={h.days} />)}
      </div>
      <FinalButton>
        <button
          onClick={goHabitsPage}
          style={{
            backgroundColor: activeButton === "habits" ? "#52B6FF" : "white",
            color: activeButton === "habits" ? "white" : "#d4d4d4",
          }}
        >
          <img src={calendar1} alt="Habits" />
          Hábitos
        </button>
        <button
          onClick={goTodayPage}
          style={{
            backgroundColor: activeButton === "today" ? "#52B6FF" : "white",
            color: activeButton === "today" ? "white" : "#d4d4d4",
          }}
        >
          <img src={calendar2} alt="Today" />
          Hoje
        </button>
      </FinalButton>
    </HomePage>
  );
}

const BoxHabit = styled.div`
  background-color: white;
  height: 180px;
  border-radius: 5px;
  margin-top: 10px;
  padding: 10px;
  margin-bottom:20px;

  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-wrap: wrap;
    height: 100%;

    input {
      width: 100%;
      height: 45px;
      border: 1px solid #d4d4d4;
      border-radius: 5px;
      padding-left: 10px;
      font-size: 16px;
      margin-top: 10px;

      &::placeholder {
        color: #d4d4d4;
      }
    }

    & .ButtonBox {
      width: 100%;
      display: flex;
      flex-wrap: wrap;
      margin-top: 15px;
      align-items: flex-start;
      gap: 5px;

      button {
        width: 31px;
        height: 31px;
        background-color: white;
        color: #d4d4d4;
        border: 1px solid #d4d4d4;
        border-radius: 5px;
        font-size: 16px;
      }
    }

    & .FinalButton {
      margin-top: 20px;
      display: flex;
      justify-content: flex-end;
      width: 100%;

      button {
        width: 84px;
        height: 35px;
        border-radius: 5px;
        background-color: #52b6ff;
        color: white;
        border: none;
      }
    }
  }
`;