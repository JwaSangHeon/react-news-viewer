import { useState } from "react";
import axios from "../node_modules/axios/index";

function App() {
  const [data, setData] = useState(null);
  const onClick = async () => {
    try {
      const response = await axios.get(
        "https://newsapi.org/v2/top-headlines?country=kr&apiKey=7b6f6d416b0f4b3e90bfa325491b4c8d"
      );
      setData(response.data);
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div className="App">
      <div>
        <button onClick={onClick}>불러오기</button>
      </div>
      {data && (
        <textarea
          rows={7}
          value={JSON.stringify(data, null, 2)}
          readOnly={true}
        />
      )}
    </div>
  );
}

export default App;
