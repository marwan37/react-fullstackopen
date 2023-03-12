const Total = ({ parts }) => {
  function computeTotal() {
    return parts.reduce((acc, part) => acc + part.exercises, 0);
  }

  return <p style={{ fontWeight: "bold" }}>total of {computeTotal()} exercises</p>;
};
export default Total;
