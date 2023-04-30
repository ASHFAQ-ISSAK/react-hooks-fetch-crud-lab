import { useState } from "react";

function QuestionForm(props) {
  const [formData, setFormData] = useState({
    prompt: "",
    answers: ["", "", "", ""],
    correctIndex: 0,
  });

  function handleSubmit(e) {
    e.preventDefault();

    fetch("http://localhost:4000/questions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        props.setQuestions((prevQuestions) => [...prevQuestions, data]);
        setFormData({
          prompt: "",
          answers: ["", "", "", ""],
          correctIndex: 0,
        });
      });
  }

  function handleChange(e) {
    const name = e.target.name;
    const value =
      e.target.type === "checkbox" ? e.target.checked : e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  }

  function handleAnswerChange(e, index) {
    const newAnswers = [...formData.answers];
    newAnswers[index] = e.target.value;
    setFormData((prevFormData) => ({
      ...prevFormData,
      answers: newAnswers,
    }));
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Prompt:
        <input
          type="text"
          name="prompt"
          value={formData.prompt}
          onChange={handleChange}
        />
      </label>

      <fieldset>
        <legend>Answers:</legend>
        <label>
          A:
          <input
            type="text"
            name="answer1"
            value={formData.answers[0]}
            onChange={(e) => handleAnswerChange(e, 0)}
          />
        </label>
        <label>
          B:
          <input
            type="text"
            name="answer2"
            value={formData.answers[1]}
            onChange={(e) => handleAnswerChange(e, 1)}
          />
        </label>
        <label>
          C:
          <input
            type="text"
            name="answer3"
            value={formData.answers[2]}
            onChange={(e) => handleAnswerChange(e, 2)}
          />
        </label>
        <label>
          D:
          <input
            type="text"
            name="answer4"
            value={formData.answers[3]}
            onChange={(e) => handleAnswerChange(e, 3)}
          />
        </label>
      </fieldset>

      <label>
        Correct Answer:
        <select
          name="correctIndex"
          value={formData.correctIndex}
          onChange={handleChange}
        >
          <option value="0">A</option>
          <option value="1">B</option>
          <option value="2">C</option>
          <option value="3">D</option>
        </select>
      </label>

      <button type="submit">Submit</button>
    </form>
  );
}

export default QuestionForm;
