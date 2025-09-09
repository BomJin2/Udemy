import { useState } from "react";
import Header from "./components/Header";
import UserInput from "./components/UserInput";
import Result from "./components/Result";

function App() {
  const [userInput, setUserInput] = useState({
    initialInverstment: 10000,
    annualInverstment: 1200,
    expectedReturn: 6,
    duration: 10,
  });

  function handleChange(inputIdentifier, newValue) {
    setUserInput((pre) => {
      return {
        ...pre,
        [inputIdentifier]: +newValue,
      };
    });
  }
  return (
    <>
      <Header />
      <UserInput onChange={handleChange} userInput={userInput} />
      <Result userInput={userInput} />
    </>
  );
}

export default App;
