import { useSelector, useDispatch } from "react-redux";
import { goToPage } from "../redux/breadcrumbSlice";
import { useNavigate } from "react-router-dom";

export default function BreadcrumbTrail() {
  const trail = useSelector((state) => state.breadcrumb.trail);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleClick = (path) => {
    dispatch(goToPage(path));
    navigate(path);
  };

  return (
    <div style={{ padding: "0.7rem", background: "#f3f4f6" }}>
      {trail.map((item, index) => (
        <span key={item.path}>
          <span
            onClick={() => handleClick(item.path)}
            style={{
              color: "#000",
              cursor: "pointer",
              marginRight: 8,
            }}
          >
            {item.name}
          </span>
          {index < trail.length - 1 && " > "}
        </span>
      ))}
    </div>
  );
}
