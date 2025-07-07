import FinalButton from "../styles/FinalButton";
import calendar1 from "../images/calendar_month_icon_137828 4.png";
import calendar2 from "../images/event-available_119182 4.png";
import { useNavigate } from "react-router-dom";
import HomePage from "../styles/HomePage";
import Header from "../components/Header";

import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { useEffect, useState, useContext } from "react";
import axios from "axios";
import AuthContext from "../context/AuthContext";
import UserContext from "../context/UserContext";

import HabitToday from "../components/HabitToday";
import LoadingCenter from "../styles/LoadingCenter";

export default function Today() {
  const [habits, setHabits] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const[activeButton,setActiveButton] = useState("today")

  const [token] = useContext(AuthContext);
  const [user] = useContext(UserContext);

  const today = dayjs().locale("pt-br").format("dddd, DD/MM");

  useEffect(() => {
    if (!token) {
      navigate("/");
      return;
    }

    const URL =
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today";
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .get(URL, config)
      .then((res) => {
        setHabits(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [token, navigate]);

  function goHabitsPage() {
    navigate("/habitos");
  }

  if (loading) {
    return <LoadingCenter>Carregando...</LoadingCenter>;
  }

  return (
    <HomePage>
      <Header />
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
          style={{
            backgroundColor: activeButton === "today" ? "#52B6FF" : "white",
            color: activeButton === "today" ? "white" : "#d4d4d4",
          }}
        >
          <img src={calendar2} alt="Today" />
          Hoje
        </button>
      </FinalButton>
      <div className="Info" style={{marginTop:"10px", marginBottom: "5px"}}>
        <h1>{today.charAt(0).toUpperCase() + today.slice(1)}</h1>
      </div>

      {habits.length === 0 ? (
        <p style={{marginTop: "20px", fontSize: "15px", color: "#666666"}}>Você não tem nenhum hábito cadastrado para hoje!</p>
      ) : (
        habits.map((habit) => (
          <HabitToday
            key={habit.id}
            habit={habit}
            token={token}
            setHabits={setHabits}
          />
        ))
      )}
    </HomePage>
  );
}