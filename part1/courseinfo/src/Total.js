const Total = ({ parts }) => {
  function computeTotal() {
    return parts.reduce((acc, part) => acc + part.exercises, 0);
  }

  return <p>Number of exercises {computeTotal()}</p>;
};
export default Total;
