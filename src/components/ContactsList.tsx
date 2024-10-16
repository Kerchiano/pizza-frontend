import useToggle from "./hooks/useToggle";
import useClickOutside from "./hooks/useClickOutside";
import { MessageSquareText, Phone } from "lucide-react";

const ContactList = () => {
  const data = [
    {
      telNumber: "(093 xxx-xx-xx)",
      img: "https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/life.png",
    },
    {
      telNumber: "(067 xxx-xx-xx)",
      img: "https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/kiyvstar.png",
    },
    {
      telNumber: "(099 xxx-xx-xx)",
      img: "https://raw.githubusercontent.com/Kerchiano/storage-photos/refs/heads/main/pizza_photos/vodafon.png",
    },
  ];
  const { isToggled, toggle, setFalse } = useToggle();
  const dropListRef = useClickOutside(() => setFalse());

  return (
    <div ref={dropListRef} className="ml-3 relative mr-4 text-base sm:ml-8 lg:ml-4">
      <span onClick={toggle} className="drop-list-triangle cursor-pointer">
        <span className="duration-base-transition text-white font-medium hidden lg:block">
          Контакти
        </span>
        <Phone className="block lg:hidden" color="white" />
      </span>
      {isToggled && (
        <div style={{ padding: "20px" }} className="drop-list-content contacts">
          <div className="drop-list-content-scroll">
            <div className="text-lg text-zinc-600 font-semibold">
              Служба доставки
            </div>
            <ul>
              {data.map((item, index) => (
                <li className="mt-4 mb-4" key={index}>
                  <span
                    style={{
                      background: `url(${item.img}) left center no-repeat`,
                    }}
                    onClick={() => {
                      setFalse();
                    }}
                    className={` text-zinc-600 font-medium pointer-events-auto inline-block h-6 pl-9 whitespace-nowrap cursor-pointer`}
                  >
                    {item.telNumber}
                  </span>
                </li>
              ))}
            </ul>
            <div>
                <a href="#" className="review"><MessageSquareText className="message-icon" color="white" />Написати відгук</a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContactList;
