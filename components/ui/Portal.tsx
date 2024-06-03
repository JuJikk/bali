import ReactDOM from "react-dom";

const Portal = ({ children }: { children: React.ReactNode }) => {
  return ReactDOM.createPortal(children, document.body);
};

export default Portal;
