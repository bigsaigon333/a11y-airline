import { useReducer } from "react";

const MIN_COUNT = 0;
const MAX_COUNT = 3;

const reducer = (state, action) => {
  switch (action.type) {
    case "minus/clicked": {
      if (state.value <= MIN_COUNT) {
        return {
          value: MIN_COUNT,
          alertMessage: `성인 승객 현재${MIN_COUNT}명`,
          validationMessage: `성인 승객은 ${MIN_COUNT}명 미만이 될 수 없습니다`,
        };
      }

      const value = state.value - 1;

      return {
        value,
        alertMessage: `성인 승객 감소 현재 ${value}명`,
        validationMessage: "",
      };
    }

    case "plus/clicked": {
      if (state.value >= MAX_COUNT) {
        return {
          value: MAX_COUNT,
          alertMessage: `성인 승객 현재 ${MAX_COUNT}명`,
          validationMessage: `성인 승객은 ${MAX_COUNT}명 초과가 될 수 없습니다`,
        };
      }

      const value = state.value + 1;

      return {
        value,
        alertMessage: `성인 승객 증가 현재 ${value}명`,
        validationMessage: "",
      };
    }

    case "input/changed": {
      const value = action.payload;
      const number = Number(value);

      if (value === "" || Number.isNaN(number)) {
        return {
          ...state,
          value: "",
          validationMessage: "",
        };
      }

      if (number < MIN_COUNT || number > MAX_COUNT) {
        const alertMessage = `${MIN_COUNT} 이상 ${MAX_COUNT} 이하의 숫자를 입력하세요`;

        return {
          ...state,
          alertMessage,
          validationMessage: alertMessage,
        };
      }

      const alertMessage = `성인 승객 ${
        number > state.value ? "증가" : "감소"
      } 현재 ${number}명`;

      return { value: number, alertMessage, validationMessage: "" };
    }
    default:
      return { ...state };
  }
};

const Home = () => {
  const [state, dispatch] = useReducer(reducer, {
    value: 0,
    alertMessage: "",
    validationMessage: "",
  });

  const onMinusClick = () => dispatch({ type: "minus/clicked" });
  const onPlusClick = () => dispatch({ type: "plus/clicked" });
  const onChange = (event) =>
    dispatch({ type: "input/changed", payload: event.target.value });

  return (
    <>
      <link
        crossOrigin
        href="https://unpkg.com/tailwindcss@^2/dist/tailwind.min.css"
        rel="stylesheet"
      />
      <header>
        <h1 className="font-bold text-4xl">승객 선택</h1>
      </header>
      <main className="flex flex-col gap-y-8 mt-12">
        <div className="flex font-bold  items-center">
          <h2 className="text-2xl">
            <label htmlFor="adult-value-input">성인</label>
          </h2>
        </div>
        <section>
          <div className="flex mb-4">
            <button
              className="border border-gray-600 rounded-full text-3xl flex justify-center items-center w-12 h-12"
              onClick={onMinusClick}
              aria-label="성인 탑승자 한명 줄이기"
            >
              -
            </button>
            <input
              id="adult-value-input"
              className="text-4xl w-16 flex text-center px-4 mx-6 border-b border-black"
              type="number"
              inputMode="tel"
              value={state.value}
              onChange={onChange}
            />

            <button
              className="border border-gray-600 rounded-full text-3xl flex justify-center items-center w-12 h-12"
              onClick={onPlusClick}
              aria-label="성인 탑승자 한명 늘리기"
            >
              +
            </button>
            <p className="sr-only" role="status">
              {state.alertMessage}
            </p>
          </div>

          {state.validationMessage !== "" && (
            <p className="text-xs font-semibold text-red-500" role="status">
              {state.validationMessage}
            </p>
          )}
        </section>
      </main>
    </>
  );
};

export default Home;
