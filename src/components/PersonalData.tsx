import { useSelector } from "react-redux";
import { RootState } from "../store";
import {
  useGetUserAddressesQuery,
  useGetUserDetailsQuery,
  User,
  useRemoveAddressMutation,
} from "../authApi";
import ChangeUserDataForm from "../components/ChangeUserDataForm";
import AddressItem, { Address } from "./AddressItem";
import AddAddress from "./AddAddress";
import { useEffect, useState } from "react";

const PersonalData = () => {
  const token = useSelector((state: RootState) => state.auth.accessToken);
  const [removeAddress] = useRemoveAddressMutation()
  const { data: userDetails }: { data?: User } = useGetUserDetailsQuery(
    undefined,
    {
      skip: !token,
    }
  );
  const { data: initialAddresses } = useGetUserAddressesQuery(
    userDetails?.email || ""
  );
  const [addresses, setAddresses] = useState(initialAddresses || []);

  useEffect(() => {
    if (initialAddresses) {
      setAddresses(initialAddresses);
    }
  }, [initialAddresses]);

  const handleDeleteAddress = (id: number) => {
    removeAddress(id)
    setAddresses((prevAddresses) =>
      prevAddresses.filter((address) => address.id !== id)
    );
  };

  const handleAddAddress = (newAddress: Address ) => {
    setAddresses((prevAddresses) => [...prevAddresses, newAddress]);
  };
  return (
    <div className="data-container">
      <div className="form-title">Дані користувача:</div>
      {userDetails && <ChangeUserDataForm userDetails={userDetails} />}
      <div className="delivery-addresses">
        <div className="title">Адреси доставки:</div>
        <div className="old-address">
          {addresses?.map((address) => (
            <AddressItem
              key={address.id}
              address={address}
              onDelete={() => handleDeleteAddress(address.id)}
            />
          ))}
        </div>
        <AddAddress user={userDetails?.email || ""} onAddAddress={handleAddAddress} />
      </div>
    </div>
  );
};

export default PersonalData;
