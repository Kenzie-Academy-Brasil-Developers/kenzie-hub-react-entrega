import { useHistory } from "react-router-dom";

export const Homepage = () => {
  const history = useHistory();

  const handleClick = (path) => {
    history.push(path);
  };

  return (
    <>
      <h1>KenzieHub</h1>
      <h4>Uma plataforma para se conectar com o mundo da programação</h4>
      <span>
        <button onClick={() => handleClick("/login")}>LOGIN</button>
        <button onClick={() => handleClick("/signup")}>CADASTRA-SE</button>
      </span>
    </>
  );
};
