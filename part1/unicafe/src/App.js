import { useState } from "react";

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const totalClicks = () => good + neutral + bad;
  const average = () => (good - bad) / totalClicks();
  const positive = () => (good / totalClicks()) * 100;

  return (
    <div>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StatisticLine text="good" value={good} />
          <StatisticLine text="neutral" value={neutral} />
          <StatisticLine text="bad" value={bad} />
          <StatisticLine text="all" value={totalClicks()} />
          <StatisticLine text="average" value={average()} />
          <StatisticLine text="positive" value={`${positive()} %`} />
        </tbody>
      </table>
    </div>
  );
};

const Button = ({ feedbackType, setValue }) => {
  const handleClick = () => setValue(prev => prev + 1);

  return <button onClick={handleClick}>{feedbackType}</button>;
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const hasFeedback = () => good > 0 || neutral > 0 || bad > 0;

  return (
    <div>
      <div>
        <h1>give feedback</h1>
        <Button feedbackType="good" setValue={setGood} />
        <Button feedbackType="neutral" setValue={setNeutral} />
        <Button feedbackType="bad" setValue={setBad} />
      </div>

      {hasFeedback() && <Statistics good={good} bad={bad} neutral={neutral} />}
    </div>
  );
};

export default App;
