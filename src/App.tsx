import React from "react";
import Comp1 from "./component/Comp1";
import Comp2 from "./component/Comp2";

import { useRecoilState } from "recoil";
import { countState, usersState } from "./store";
import WillGenerateDataWithLoop from "./component/WillGenerateDataWithLoop";

const App = () => {
  const [count, setCount] = useRecoilState(countState);
  const [users, setUsers] = useRecoilState(usersState);
  return (
    <div className="bg-gray-300">
      <h1>Hello</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>Inc</button>
      <button onClick={() => setCount(count - 1)}>Dec</button>
      <Comp1 />
      <Comp2 />
      <h1>Multiple Data</h1>
      <button onClick={() => setUsers([...users, { id: 19, name: "Ash" }])}>
        Add
      </button>
      <button>Delete</button>
      <WillGenerateDataWithLoop users={users} count={count} />
    </div>
  );
};

export default App;
