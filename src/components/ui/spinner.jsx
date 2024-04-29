import spinner from "../../assets/spinner1.svg";

const Spinner = () => {
  return (
    <div className="w-full flex items-center justify-center">
      <img src={spinner} alt="spinner" />
    </div>
  );
};

export default Spinner;
