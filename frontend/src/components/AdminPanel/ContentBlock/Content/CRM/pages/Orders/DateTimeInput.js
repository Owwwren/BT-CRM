import React, { useState } from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns"; // Используем date-fns
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker"; // Используем DateTimePicker
import { TextField } from "@mui/material";
import { styled } from "@mui/system";
import { format } from "date-fns"; // Для форматирования времени

// Стилизация TextField, чтобы он соответствовал вашим инпутам
const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    color: "white", // Цвет текста
    backgroundColor: "#191919", // Цвет фона
    border: "2px solid #686868", // Граница
    borderRadius: "5px", // Скругление углов
    "&:hover": {
      borderColor: "#3e3e3e", // Цвет границы при наведении
    },
    "&.Mui-focused": {
      borderColor: "#3e3e3e", // Цвет границы при фокусе
    },
  },
  "& .MuiInputLabel-root": {
    color: "#0f0f0f", // Цвет лейбла
  },
  "& .MuiSvgIcon-root": {
    color: "white", // Цвет иконки календаря
  },
}));

const DateTimeInput = () => {
  const [selectedDateTime, setSelectedDateTime] = useState(null);

  const handleDateTimeChange = (dateTime) => {
    setSelectedDateTime(dateTime);
  };

  // Форматирование времени в 24-часовой формат
  const formatDateTime = (date) => {
    return date ? format(date, "dd.MM.yyyy HH:mm") : ""; // Формат: день.месяц.год часы:минуты
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <DateTimePicker
        label="Выберите дату и время"
        value={selectedDateTime}
        onChange={handleDateTimeChange}
        renderInput={(params) => (
          <StyledTextField
            {...params}
            fullWidth // Чтобы поле занимало всю ширину
          />
        )}
        inputFormat="dd.MM.yyyy HH:mm" // Формат ввода: день.месяц.год часы:минуты
        ampm={false} // Отключаем AM/PM
      />
    </LocalizationProvider>
  );
};

export default DateTimeInput;