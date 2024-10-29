export interface Address {
  id: number;
  city: string;
  street: string;
  house_number: number;
  floor: number;
  entrance: number;
  flat: number;
}

interface AddressItemProps {
  address: Address;
  onDelete: () => void;
}

const AddressItem = ({ address, onDelete }: AddressItemProps) => {
  return (
    <form action="delete" className="list-delivery-address">
      <div className="address-item">
        <div className="w-1/5 city-block">
          <div className="title">Місто</div>
          <div className="value">{address.city}</div>
        </div>
        <div className="w-2/5 street-block">
          <div className="title">Вулиця</div>
          <div className="value">{address.street}</div>
        </div>
        <div className="w-[15%] house_number-block">
          <div className="title">Будинок</div>
          <div className="value">{address.house_number}</div>
        </div>
        <div className="w-[15%] floor-block">
          <div className="title">Під'їзд</div>
          <div className="value">{address.floor}</div>
        </div>
        <div className="w-[15%] entrance-block">
          <div className="title">Этаж</div>
          <div className="value">{address.entrance}</div>
        </div>
        <div className="w-[15%] flat-block">
          <div className="title">Квартира</div>
          <div className="value">{address.flat}</div>
        </div>
        <div className="flex justify-center items-center w-10 block-remove-item">
          <button
            type="button"
            onClick={onDelete}
            className="remove-item"
          ></button>
        </div>
      </div>
    </form>
  );
};

export default AddressItem;
