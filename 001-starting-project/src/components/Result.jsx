import { calculateInvestmentResults } from "../util/investment";

function Result({ userInput }) {
  const resultData = calculateInvestmentResults(userInput);
  return <p>Result...</p>;
}
export default Result;
