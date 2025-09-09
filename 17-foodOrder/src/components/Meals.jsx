import useHttp from "../hooks/useHttp";
import MealItem from "./MealItem";

const requestConfig = {};

function Meals() {
  const { data: loadedMeals, isLoading, error } = useHttp("http://localhost:3000/meals", requestConfig, []);

  if (isLoading) {
    return <p className="center">Fetching meals...</p>;
  }

  if (error) {
    return <Error title="Failed to fetch meals" message={error} />;
  }

  // if (!data) {
  //   return <p>Fetching meals...</p>;
  // }
  return (
    <ul id="meals">
      {loadedMeals.map((meal) => (
        <MealItem key={meal.name} meal={meal} />
      ))}
    </ul>
  );
}
export default Meals;
