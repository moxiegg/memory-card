/* eslint-disable react/prop-types */
export default function Scorecard({ score, bestScore }) {
  return (
    <div className="scorecard">
      <div>Score : {score}</div>
      <div>Best Score : {bestScore}</div>
    </div>
  );
}
