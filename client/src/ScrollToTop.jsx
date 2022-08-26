import { useEffect } from "react";
import { useLocation } from "react-router";

const ScrollToTop = (props) => {
  const location = useLocation();
  
  useEffect(() => {
    console.log("SCROLL TOP")
    window.scrollTo(0, 0);
  }, [location]);

  console.log(props)

  return <>{props.children}</>
};

export default ScrollToTop;