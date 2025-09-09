import Answers from "./Answers";
import QuestionTimer from "./QuestionTimer";

function Question({ questionText, answers, onSelectedAnswer, selectedAnswer, answerState, onSkipAnswer }) {
  return (
    <div id="question">
      <QuestionTimer timeout={10000} onTimeout={onSkipAnswer} />
      <h2>{questionText}</h2>
      <Answers answers={answers} selectedAnswer={selectedAnswer} answerState={answerState} onSelect={onSelectedAnswer} />
    </div>
  );
}
export default Question;
