export enum ENUM_ARROW_COLOR {
  RED = "red",
  BLACK = "black",
  GREEN = "green",
}

interface IconArrowProps {
  color: ENUM_ARROW_COLOR;
}

const IconArrow: React.FC<IconArrowProps> = ({ color }) => {
  return (
    <svg
      width="20"
      height="14"
      viewBox="0 0 23 38"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect width="20" height="20" />
      <path
        d="M12.0299 0.909482C11.4277 0.340664 10.4783 0.367789 9.90948 0.970066L0.640063 10.7847C0.0712453 11.387 0.0983698 12.3364 0.700647 12.9052C1.30292 13.474 2.25228 13.4469 2.8211 12.8446L11.0606 4.12046L19.7847 12.3599C20.387 12.9288 21.3364 12.9016 21.9052 12.2994C22.474 11.6971 22.4469 10.7477 21.8446 10.1789L12.0299 0.909482ZM13.4994 36.9572L12.4994 1.95716L9.50061 2.04284L10.5006 37.0428L13.4994 36.9572Z"
        fill={color}
      />
    </svg>
  );
};

export default IconArrow;
