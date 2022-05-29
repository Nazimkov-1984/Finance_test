export enum ENUM_ARROW_COLOR {
  RED = "red",
  BLACK = "black",
  GREEN = "green",
}

interface IconArrowProps {
  color: ENUM_ARROW_COLOR;
}

const IconArrow: React.FC<IconArrowProps> = ({ color }) => {

  if (color === ENUM_ARROW_COLOR.GREEN) {
    return (
      <svg
        width="20"
        height="14"
        viewBox="0 0 23 38"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="iconArrow"
      >
        <rect width="20" height="20" />
        <path
          d="M12.0299 0.909482C11.4277 0.340664 10.4783 0.367789 9.90948 0.970066L0.640063 10.7847C0.0712453 11.387 0.0983698 12.3364 0.700647 12.9052C1.30292 13.474 2.25228 13.4469 2.8211 12.8446L11.0606 4.12046L19.7847 12.3599C20.387 12.9288 21.3364 12.9016 21.9052 12.2994C22.474 11.6971 22.4469 10.7477 21.8446 10.1789L12.0299 0.909482ZM13.4994 36.9572L12.4994 1.95716L9.50061 2.04284L10.5006 37.0428L13.4994 36.9572Z"
          fill={color}
        />
      </svg>
    );
  } else {
    return (
      <svg
        width="20"
        height="14"
        viewBox="0 0 23 53"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        data-testid="iconArrow"
      >
        <rect width="20" height="20" />
        <path
          d="M9.91834 52.0392C10.4923 52.6366 11.4419 52.6556 12.0392 52.0817L21.7742 42.7285C22.3715 42.1545 22.3905 41.205 21.8166 40.6076C21.2426 40.0102 20.2931 39.9912 19.6957 40.5652L11.0424 48.8791L2.72851 40.2258C2.15455 39.6285 1.20499 39.6095 0.607608 40.1834C0.0102254 40.7574 -0.00876582 41.7069 0.565191 42.3043L9.91834 52.0392ZM10.5003 0.970006L9.5003 50.97L12.4997 51.03L13.4997 1.02999L10.5003 0.970006Z"
          fill={color}
        />
      </svg>
    );
  }
 
};

export default IconArrow;
